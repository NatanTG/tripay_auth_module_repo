import { BucketServiceImpl } from "./bucket.service.impl";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2 } from "src/shared/r2-bucket/bucket";
import { env } from "src/core/env";
import { vi, beforeEach, describe, it, expect } from "vitest";

vi.mock("@aws-sdk/s3-request-presigner");

const mockSend = vi.fn();
r2.send = mockSend;

const mockGetSignedUrl = getSignedUrl as unknown as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("BucketServiceImpl", () => {
  const service = new BucketServiceImpl();
  it("deve deletar o arquivo corretamente", async () => {
    mockSend.mockResolvedValueOnce({});
    await expect(service.deleteFile("file-key")).resolves.toBeUndefined();
    expect(mockSend).toHaveBeenCalledWith(expect.any(DeleteObjectCommand));
  });

  it("deve usar o bucket correto da variável de ambiente", async () => {
    mockSend.mockResolvedValueOnce({});
    await service.deleteFile("test-file.jpg");
    const deleteCommand = mockSend.mock.calls[0][0];
    expect(deleteCommand.input.Bucket).toBe(env.CLOUDFLARE_R2_BUCKET_NAME);
    expect(deleteCommand.input.Key).toBe("test-file.jpg");
  });

  it("deve propagar erro ao deletar", async () => {
    mockSend.mockRejectedValueOnce(new Error("delete error"));
    await expect(service.deleteFile("file-key")).rejects.toThrow(
      "delete error",
    );
  });
  it("deve retornar url assinada", async () => {
    mockGetSignedUrl.mockResolvedValueOnce("signed-url");
    const url = await service.getFileUrl("file-key");
    expect(url).toBe("signed-url");
    expect(mockGetSignedUrl).toHaveBeenCalledWith(
      r2,
      expect.any(GetObjectCommand),
      { expiresIn: 600 },
    );
  });

  it("deve usar o bucket correto da variável de ambiente", async () => {
    mockGetSignedUrl.mockResolvedValueOnce(
      "https://tripay-assets.com/file.jpg",
    );
    await service.getFileUrl("documents/file.jpg");
    const getCommand = mockGetSignedUrl.mock.calls[0][1];
    expect(getCommand.input.Bucket).toBe(env.CLOUDFLARE_R2_BUCKET_NAME);
    expect(getCommand.input.Key).toBe("documents/file.jpg");
  });

  it("deve propagar erro ao gerar url", async () => {
    mockGetSignedUrl.mockRejectedValueOnce(new Error("url error"));
    await expect(service.getFileUrl("file-key")).rejects.toThrow("url error");
  });
  it("deve fazer upload e retornar url", async () => {
    mockSend.mockResolvedValueOnce({});
    mockGetSignedUrl.mockResolvedValueOnce("signed-url");
    const url = await service.uploadFile(
      Buffer.from("data"),
      "image/png",
      "file-key",
    );
    expect(mockSend).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    expect(url).toBe("signed-url");
  });

  it("deve usar bucket correto e configurar corretamente o comando", async () => {
    mockSend.mockResolvedValueOnce({});
    mockGetSignedUrl.mockResolvedValueOnce("signed-url");
    const buffer = Buffer.from("test image data");
    await service.uploadFile(buffer, "image/jpeg", "photos/vacation.jpg");

    const putCommand = mockSend.mock.calls[0][0];
    expect(putCommand.input.Bucket).toBe(env.CLOUDFLARE_R2_BUCKET_NAME);
    expect(putCommand.input.Key).toBe("photos/vacation.jpg");
    expect(putCommand.input.Body).toBe(buffer);
    expect(putCommand.input.ContentType).toBe("image/jpeg");
  });

  it("deve propagar erro ao fazer upload", async () => {
    mockSend.mockRejectedValueOnce(new Error("upload error"));
    await expect(
      service.uploadFile(Buffer.from("data"), "image/png", "file-key"),
    ).rejects.toThrow("upload error");
  });
});
