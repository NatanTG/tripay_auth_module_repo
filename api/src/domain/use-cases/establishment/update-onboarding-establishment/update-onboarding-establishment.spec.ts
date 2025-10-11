import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import { UnauthorizedException } from "@nestjs/common";
import { UpdateOnboardingEstablishmentUseCase } from "./update-onboarding-establishment.usecase";
import { EstablishmentRepository } from "../../../repositories/establishment.repository";
import { DocumentsRepository } from "../../../repositories/documents.repository";
import { MailMessageService } from "../../../../infra/services/mail/mail.service";
import { StorageService } from "../../../../infra/services/bucket/storage.service";
import { establishmentMock } from "../../../../test/mocks/establishment.mock";
import { onboardingEstablishmentMock } from "../../../../test/mocks/onboarding-establishment.mock";
import { multerFileMock } from "../../../../test/mocks/multer-file.mock";
import { mock, MockProxy } from "vitest-mock-extended";

const makeFakePayload = (): UpdateOnboardingEstablishmentUseCase.Request => ({
  ...onboardingEstablishmentMock(),
  identityDocumentFile: multerFileMock("identity.pdf"),
  addressProofFile: multerFileMock("address.pdf"),
  selfieWithDocumentFile: multerFileMock("selfie.pdf"),
  cadasturCertificateFile: multerFileMock("cadastur.pdf"),
  bankProofFile: multerFileMock("bank.pdf"),
});

describe("UpdateOnboardingEstablishmentUseCase", () => {
  let sut: UpdateOnboardingEstablishmentUseCase;
  let mockEstablishmentRepository: MockProxy<EstablishmentRepository>;
  let mockDocumentsRepository: MockProxy<DocumentsRepository>;
  let mockMailMessageService: MockProxy<MailMessageService>;
  let mockStorageService: MockProxy<StorageService>;

  beforeEach(() => {
    mockEstablishmentRepository = mock<EstablishmentRepository>();
    mockDocumentsRepository = mock<DocumentsRepository>();
    mockMailMessageService = mock<MailMessageService>();
    mockStorageService = mock<StorageService>();

    sut = new UpdateOnboardingEstablishmentUseCase(
      mockEstablishmentRepository,
      mockDocumentsRepository,
      mockMailMessageService,
      mockStorageService,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should throw UnauthorizedException if establishment is not found", async () => {
    const establishmentId = "12345678000195";
    const payload = makeFakePayload();

    mockEstablishmentRepository.findById.mockResolvedValueOnce(null);

    await expect(sut.execute(establishmentId, payload)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(mockEstablishmentRepository.findById).toHaveBeenCalledWith(
      establishmentId,
    );
    expect(mockEstablishmentRepository.saveOnboarding).not.toHaveBeenCalled();
    expect(mockMailMessageService.send).not.toHaveBeenCalled();
  });

  it("should update establishment onboarding successfully", async () => {
    const establishmentId = "12345678000195";
    const payload = makeFakePayload();
    const fakeEstablishment = establishmentMock();
    const mockDocumentUrls = {
      identityDocument: "https://r2.com/establishments/123/identity.pdf",
      addressProof: "https://r2.com/establishments/123/address.pdf",
      selfieWithDocument: "https://r2.com/establishments/123/selfie.pdf",
      cadasturCertificate: "https://r2.com/establishments/123/cadastur.pdf",
      bankProof: "https://r2.com/establishments/123/bank.pdf",
    };

    mockEstablishmentRepository.findById.mockResolvedValueOnce(
      fakeEstablishment,
    );
    mockStorageService.uploadFile
      .mockResolvedValueOnce(mockDocumentUrls.identityDocument)
      .mockResolvedValueOnce(mockDocumentUrls.addressProof)
      .mockResolvedValueOnce(mockDocumentUrls.selfieWithDocument)
      .mockResolvedValueOnce(mockDocumentUrls.cadasturCertificate)
      .mockResolvedValueOnce(mockDocumentUrls.bankProof);
    mockEstablishmentRepository.saveOnboarding.mockResolvedValueOnce(undefined);
    mockMailMessageService.send.mockResolvedValueOnce(undefined);

    await sut.execute(establishmentId, payload);

    expect(mockEstablishmentRepository.findById).toHaveBeenCalledWith(
      establishmentId,
    );
    expect(mockStorageService.uploadFile).toHaveBeenCalledTimes(5);
    expect(mockDocumentsRepository.save).toHaveBeenCalledTimes(5);
    expect(mockEstablishmentRepository.saveOnboarding).toHaveBeenCalledWith(
      fakeEstablishment,
    );
    expect(mockMailMessageService.send).toHaveBeenCalledWith({
      from: "suporte@nexorum.shop",
      to: [fakeEstablishment.email],
      subject: "Onboarding Concluído - Tripay",
      body: expect.any(String),
    });
  });

  it("should call dependencies with correct values", async () => {
    const establishmentId = "12345678000195";
    const payload = makeFakePayload();
    const fakeEstablishment = establishmentMock();

    mockEstablishmentRepository.findById.mockResolvedValueOnce(
      fakeEstablishment,
    );
    mockEstablishmentRepository.saveOnboarding.mockResolvedValueOnce(undefined);
    mockMailMessageService.send.mockResolvedValueOnce(undefined);

    await sut.execute(establishmentId, payload);

    expect(mockEstablishmentRepository.saveOnboarding).toHaveBeenCalledWith(
      fakeEstablishment,
    );
    expect(mockMailMessageService.send).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "suporte@nexorum.shop",
        to: [fakeEstablishment.email],
        subject: "Onboarding Concluído - Tripay",
      }),
    );
  });

  it("should update establishment with all provided onboarding data", async () => {
    const establishmentId = "12345678000195";
    const payload = makeFakePayload();
    const fakeEstablishment = establishmentMock();
    const mockDocumentUrls = {
      identityDocument: "https://r2.com/establishments/123/identity.pdf",
      addressProof: "https://r2.com/establishments/123/address.pdf",
      selfieWithDocument: "https://r2.com/establishments/123/selfie.pdf",
      cadasturCertificate: "https://r2.com/establishments/123/cadastur.pdf",
      bankProof: "https://r2.com/establishments/123/bank.pdf",
    };

    mockEstablishmentRepository.findById.mockResolvedValueOnce(
      fakeEstablishment,
    );
    mockStorageService.uploadFile
      .mockResolvedValueOnce(mockDocumentUrls.identityDocument)
      .mockResolvedValueOnce(mockDocumentUrls.addressProof)
      .mockResolvedValueOnce(mockDocumentUrls.selfieWithDocument)
      .mockResolvedValueOnce(mockDocumentUrls.cadasturCertificate)
      .mockResolvedValueOnce(mockDocumentUrls.bankProof);
    mockEstablishmentRepository.saveOnboarding.mockResolvedValueOnce(undefined);
    mockMailMessageService.send.mockResolvedValueOnce(undefined);

    await sut.execute(establishmentId, payload);
  });

  describe("Document upload functionality", () => {
    it("should upload files and use generated URLs when files are provided", async () => {
      const establishmentId = "12345678000195";
      const fakeEstablishment = establishmentMock();
      const mockFile = multerFileMock("identity.pdf");
      const payloadWithFiles: UpdateOnboardingEstablishmentUseCase.Request = {
        ...onboardingEstablishmentMock(),
        identityDocumentFile: mockFile,
        addressProofFile: multerFileMock("address.pdf"),
      };

      const mockUrls = {
        identityDocument: "https://r2.com/establishments/123/identity.pdf",
        addressProof: "https://r2.com/establishments/123/address.pdf",
      };

      mockEstablishmentRepository.findById.mockResolvedValueOnce(
        fakeEstablishment,
      );
      mockStorageService.uploadFile
        .mockResolvedValueOnce(mockUrls.identityDocument)
        .mockResolvedValueOnce(mockUrls.addressProof);
      mockEstablishmentRepository.saveOnboarding.mockResolvedValueOnce(
        undefined,
      );
      mockMailMessageService.send.mockResolvedValueOnce(undefined);

      await sut.execute(establishmentId, payloadWithFiles);

      expect(mockStorageService.uploadFile).toHaveBeenCalledTimes(2);
      expect(mockStorageService.uploadFile).toHaveBeenCalledWith(
        mockFile.buffer,
        mockFile.mimetype,
        expect.stringMatching(
          /^establishments\/.*\/onboarding\/identityDocument-.*\.pdf$/,
        ),
      );

      expect(mockDocumentsRepository.save).toHaveBeenCalledTimes(2);
      expect(mockDocumentsRepository.save).toHaveBeenCalledWith(
        establishmentId,
        "identityDocument",
        mockUrls.identityDocument,
      );
      expect(mockDocumentsRepository.save).toHaveBeenCalledWith(
        establishmentId,
        "addressProof",
        mockUrls.addressProof,
      );
    });

    it("should handle payload with some files missing", async () => {
      const establishmentId = "12345678000195";
      const fakeEstablishment = establishmentMock();
      const payloadWithPartialFiles: UpdateOnboardingEstablishmentUseCase.Request =
        {
          ...onboardingEstablishmentMock(),
          identityDocumentFile: multerFileMock("identity.pdf"),
          addressProofFile: undefined,
          selfieWithDocumentFile: undefined,
          cadasturCertificateFile: multerFileMock("cadastur.pdf"),
          bankProofFile: undefined,
        };

      const mockUrls = {
        identityDocument: "https://r2.com/establishments/123/identity.pdf",
        cadasturCertificate: "https://r2.com/establishments/123/cadastur.pdf",
      };

      mockEstablishmentRepository.findById.mockResolvedValueOnce(
        fakeEstablishment,
      );
      mockStorageService.uploadFile
        .mockResolvedValueOnce(mockUrls.identityDocument)
        .mockResolvedValueOnce(mockUrls.cadasturCertificate);
      mockEstablishmentRepository.saveOnboarding.mockResolvedValueOnce(
        undefined,
      );
      mockMailMessageService.send.mockResolvedValueOnce(undefined);

      await sut.execute(establishmentId, payloadWithPartialFiles);

      expect(mockStorageService.uploadFile).toHaveBeenCalledTimes(2);
      expect(mockDocumentsRepository.save).toHaveBeenCalledTimes(2);
      expect(mockDocumentsRepository.save).toHaveBeenCalledWith(
        establishmentId,
        "identityDocument",
        mockUrls.identityDocument,
      );
      expect(mockDocumentsRepository.save).toHaveBeenCalledWith(
        establishmentId,
        "cadasturCertificate",
        mockUrls.cadasturCertificate,
      );
    });

    it("should generate correct document keys", async () => {
      const establishmentId = "12345678000195";
      const fakeEstablishment = establishmentMock();
      const mockFile = multerFileMock("identity.pdf");
      const payloadWithFile: UpdateOnboardingEstablishmentUseCase.Request = {
        ...onboardingEstablishmentMock(),
        identityDocumentFile: mockFile,
      };

      mockEstablishmentRepository.findById.mockResolvedValueOnce(
        fakeEstablishment,
      );
      mockStorageService.uploadFile.mockResolvedValueOnce("mock-url");
      mockEstablishmentRepository.saveOnboarding.mockResolvedValueOnce(
        undefined,
      );
      mockMailMessageService.send.mockResolvedValueOnce(undefined);

      await sut.execute(establishmentId, payloadWithFile);

      expect(mockStorageService.uploadFile).toHaveBeenCalledTimes(1);
      expect(mockStorageService.uploadFile).toHaveBeenCalledWith(
        mockFile.buffer,
        mockFile.mimetype,
        expect.stringMatching(
          new RegExp(
            `^establishments/${establishmentId}/onboarding/identityDocument-\\d{4}-\\d{2}-\\d{2}\\.pdf$`,
          ),
        ),
      );
    });

    it("should handle upload errors by propagating them", async () => {
      const establishmentId = "12345678000195";
      const fakeEstablishment = establishmentMock();
      const mockFile = multerFileMock("identity.pdf");
      const payloadWithFile: UpdateOnboardingEstablishmentUseCase.Request = {
        ...onboardingEstablishmentMock(),
        identityDocumentFile: mockFile,
      };

      mockEstablishmentRepository.findById.mockResolvedValueOnce(
        fakeEstablishment,
      );
      mockStorageService.uploadFile.mockRejectedValueOnce(
        new Error("Upload failed"),
      );

      await expect(
        sut.execute(establishmentId, payloadWithFile),
      ).rejects.toThrow("Upload failed");

      expect(mockEstablishmentRepository.saveOnboarding).not.toHaveBeenCalled();
      expect(mockMailMessageService.send).not.toHaveBeenCalled();
    });
  });
});
