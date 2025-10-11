import { describe, it, beforeEach, afterEach, vi, expect } from "vitest";
import { CreateEstablishmentUseCase } from "./create-establishment.usecase";
import { EstablishmentRepository } from "src/domain/repositories/establishment.repository";
import { MailMessageService } from "../../../../infra/services/mail/mail.service";
import { CryptService } from "src/infra/services/crypt/crypt.service";
import { ConflictException } from "@nestjs/common";
import { Establishment } from "../../../entities/establishment";
import { env } from "src/core/env";
import { preRegisterTemplate } from "src/infra/services/mail/templates/pre-register";
import { mock, MockProxy } from "vitest-mock-extended";
import { establishmentRequestMock } from "../../../../test/mocks/establishment.mock";

describe("CreateEstablishmentUseCase", () => {
  let sut: CreateEstablishmentUseCase;
  let mockEstablishmentRepository: MockProxy<EstablishmentRepository>;
  let mockMailMessageService: MockProxy<MailMessageService>;
  let mockCryptService: MockProxy<CryptService>;

  beforeEach(() => {
    mockEstablishmentRepository = mock<EstablishmentRepository>();
    mockMailMessageService = mock<MailMessageService>();
    mockCryptService = mock<CryptService>();

    sut = new CreateEstablishmentUseCase(
      mockEstablishmentRepository,
      mockMailMessageService,
      mockCryptService,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should throw ConflictException if establishment already exists", async () => {
    const fakePayload = establishmentRequestMock();

    mockEstablishmentRepository.findByCnpj.mockResolvedValueOnce(
      {} as Establishment,
    );

    const promise = sut.execute(fakePayload);

    await expect(promise).rejects.toThrow(
      new ConflictException("Establishment with this CNPJ already exists."),
    );

    expect(mockEstablishmentRepository.findByCnpj).toHaveBeenCalledWith(
      fakePayload.cnpj,
    );
    expect(mockCryptService.hash).not.toHaveBeenCalled();
    expect(mockEstablishmentRepository.save).not.toHaveBeenCalled();
    expect(mockMailMessageService.send).not.toHaveBeenCalled();
  });

  it("should create an establishment successfully", async () => {
    const fakePayload = establishmentRequestMock();
    const hashedPassword = "hashed_password";
    let capturedPlainPassword: string = "";

    mockEstablishmentRepository.findByCnpj.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByEmail.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByCpf.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByRg.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByCnae.mockResolvedValueOnce(null);

    mockCryptService.hash.mockImplementation((password) => {
      capturedPlainPassword = password.toString();
      return Promise.resolve(hashedPassword);
    });

    await sut.execute(fakePayload);

    expect(mockEstablishmentRepository.findByCnpj).toHaveBeenCalledWith(
      fakePayload.cnpj,
    );
    expect(mockEstablishmentRepository.findByEmail).toHaveBeenCalledWith(
      fakePayload.email,
    );
    expect(mockEstablishmentRepository.findByCpf).toHaveBeenCalledWith(
      fakePayload.cpf,
    );
    expect(mockEstablishmentRepository.findByRg).toHaveBeenCalledWith(
      fakePayload.rg,
    );
    expect(mockEstablishmentRepository.findByCnae).toHaveBeenCalledWith(
      fakePayload.cnae,
    );
    expect(mockCryptService.hash).toHaveBeenCalledWith(expect.any(String), 10);
    expect(mockEstablishmentRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        cnpj: fakePayload.cnpj,
        email: fakePayload.email,
        password: hashedPassword,
      }),
    );
    expect(mockMailMessageService.send).toHaveBeenCalledWith({
      from: "suporte@nexorum.shop",
      to: [fakePayload.email],
      subject: "Cadastro de Estabelecimento",
      body: preRegisterTemplate(
        env.DASHBOARD_URL,
        capturedPlainPassword,
        fakePayload.socialReason,
      ),
    });
  });

  it("should call dependencies with correct values", async () => {
    const fakePayload = establishmentRequestMock();
    const hashedPassword = "hashed_password";

    mockEstablishmentRepository.findByCnpj.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByEmail.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByCpf.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByRg.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByCnae.mockResolvedValueOnce(null);
    mockCryptService.hash.mockResolvedValueOnce(hashedPassword);

    await sut.execute(fakePayload);

    expect(mockEstablishmentRepository.findByCnpj).toHaveBeenCalledWith(
      fakePayload.cnpj,
    );
    expect(mockEstablishmentRepository.findByEmail).toHaveBeenCalledWith(
      fakePayload.email,
    );
    expect(mockEstablishmentRepository.findByCpf).toHaveBeenCalledWith(
      fakePayload.cpf,
    );
    expect(mockEstablishmentRepository.findByRg).toHaveBeenCalledWith(
      fakePayload.rg,
    );
    expect(mockEstablishmentRepository.findByCnae).toHaveBeenCalledWith(
      fakePayload.cnae,
    );
    expect(mockCryptService.hash).toHaveBeenCalledWith(expect.any(String), 10);

    const savedEstablishment =
      mockEstablishmentRepository.save.mock.calls[0][0];
    expect(savedEstablishment).toBeInstanceOf(Establishment);
    expect(savedEstablishment.password).toBe(hashedPassword);

    expect(mockMailMessageService.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: [fakePayload.email],
        subject: "Cadastro de Estabelecimento",
        body: expect.stringContaining(fakePayload.socialReason),
      }),
    );
  });

  it("should throw ConflictException if email already exists", async () => {
    const fakePayload = establishmentRequestMock();

    mockEstablishmentRepository.findByCnpj.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByEmail.mockResolvedValueOnce(
      {} as Establishment,
    );

    const promise = sut.execute(fakePayload);

    await expect(promise).rejects.toThrow(
      new ConflictException("Establishment with this email already exists."),
    );

    expect(mockEstablishmentRepository.findByCnpj).toHaveBeenCalledWith(
      fakePayload.cnpj,
    );
    expect(mockEstablishmentRepository.findByEmail).toHaveBeenCalledWith(
      fakePayload.email,
    );
    expect(mockCryptService.hash).not.toHaveBeenCalled();
    expect(mockEstablishmentRepository.save).not.toHaveBeenCalled();
    expect(mockMailMessageService.send).not.toHaveBeenCalled();
  });

  it("should throw ConflictException if CPF already exists", async () => {
    const fakePayload = establishmentRequestMock();

    mockEstablishmentRepository.findByCnpj.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByEmail.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByCpf.mockResolvedValueOnce(
      {} as Establishment,
    );

    const promise = sut.execute(fakePayload);

    await expect(promise).rejects.toThrow(
      new ConflictException("Establishment with this CPF already exists."),
    );

    expect(mockEstablishmentRepository.findByCnpj).toHaveBeenCalledWith(
      fakePayload.cnpj,
    );
    expect(mockEstablishmentRepository.findByEmail).toHaveBeenCalledWith(
      fakePayload.email,
    );
    expect(mockEstablishmentRepository.findByCpf).toHaveBeenCalledWith(
      fakePayload.cpf,
    );
    expect(mockCryptService.hash).not.toHaveBeenCalled();
    expect(mockEstablishmentRepository.save).not.toHaveBeenCalled();
    expect(mockMailMessageService.send).not.toHaveBeenCalled();
  });

  it("should throw ConflictException if RG already exists", async () => {
    const fakePayload = establishmentRequestMock();

    mockEstablishmentRepository.findByCnpj.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByEmail.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByCpf.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByRg.mockResolvedValueOnce(
      {} as Establishment,
    );

    const promise = sut.execute(fakePayload);

    await expect(promise).rejects.toThrow(
      new ConflictException("Establishment with this RG already exists."),
    );

    expect(mockEstablishmentRepository.findByCnpj).toHaveBeenCalledWith(
      fakePayload.cnpj,
    );
    expect(mockEstablishmentRepository.findByEmail).toHaveBeenCalledWith(
      fakePayload.email,
    );
    expect(mockEstablishmentRepository.findByCpf).toHaveBeenCalledWith(
      fakePayload.cpf,
    );
    expect(mockEstablishmentRepository.findByRg).toHaveBeenCalledWith(
      fakePayload.rg,
    );
    expect(mockCryptService.hash).not.toHaveBeenCalled();
    expect(mockEstablishmentRepository.save).not.toHaveBeenCalled();
    expect(mockMailMessageService.send).not.toHaveBeenCalled();
  });

  it("should throw ConflictException if CNAE already exists", async () => {
    const fakePayload = establishmentRequestMock();

    mockEstablishmentRepository.findByCnpj.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByEmail.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByCpf.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByRg.mockResolvedValueOnce(null);
    mockEstablishmentRepository.findByCnae.mockResolvedValueOnce(
      {} as Establishment,
    );

    const promise = sut.execute(fakePayload);

    await expect(promise).rejects.toThrow(
      new ConflictException("Establishment with this CNAE already exists."),
    );

    expect(mockEstablishmentRepository.findByCnpj).toHaveBeenCalledWith(
      fakePayload.cnpj,
    );
    expect(mockEstablishmentRepository.findByEmail).toHaveBeenCalledWith(
      fakePayload.email,
    );
    expect(mockEstablishmentRepository.findByCpf).toHaveBeenCalledWith(
      fakePayload.cpf,
    );
    expect(mockEstablishmentRepository.findByRg).toHaveBeenCalledWith(
      fakePayload.rg,
    );
    expect(mockEstablishmentRepository.findByCnae).toHaveBeenCalledWith(
      fakePayload.cnae,
    );
    expect(mockCryptService.hash).not.toHaveBeenCalled();
    expect(mockEstablishmentRepository.save).not.toHaveBeenCalled();
    expect(mockMailMessageService.send).not.toHaveBeenCalled();
  });
});
