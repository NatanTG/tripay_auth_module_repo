import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { StorageService } from "../storage.service";
import { r2 } from "src/shared/r2-bucket/bucket";
import { env } from "src/core/env";
import { Injectable, Logger } from "@nestjs/common";
import { BucketErrorHandler } from "../../../../core/exceptions/bucket/bucket-error-handler";
export type BucketFileFolders = "documentos" | "foto_perfil" | "anexos";

@Injectable()
export class BucketServiceImpl implements StorageService {
  private readonly logger = new Logger(BucketServiceImpl.name);

  async deleteFile(objectKey: string): Promise<void> {
    try {
      await r2.send(
        new DeleteObjectCommand({
          Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: objectKey,
        }),
      );
      this.logger.log(`File deleted successfully: ${objectKey}`);
      return;
    } catch (error) {
      BucketErrorHandler.handle(error, "delete file", this.logger);
    }
  }
  async getFileUrl(key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: key,
      });
      const url = await getSignedUrl(r2, command, {
        expiresIn: 600,
      });
      this.logger.log(`Signed URL generated for file: ${key}`);
      return url;
    } catch (error) {
      BucketErrorHandler.handle(error, "generate signed URL", this.logger);
    }
  }

  async uploadFile(file: Buffer, mimeType: string, key: string) {
    try {
      await r2.send(
        new PutObjectCommand({
          Bucket: env.CLOUDFLARE_R2_BUCKET_NAME,
          Key: key,
          Body: file,
          ContentType: mimeType,
        }),
      );

      this.logger.log(`File uploaded successfully: ${key}`);
      return this.getFileUrl(key);
    } catch (error) {
      BucketErrorHandler.handle(error, "upload file", this.logger);
    }
  }
}
