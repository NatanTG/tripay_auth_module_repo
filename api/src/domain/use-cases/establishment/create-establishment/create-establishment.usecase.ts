import { Establishment } from "../../../entities/establishment";
import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { MailMessageService } from "../../../../infra/services/mail/mail.service";
import { EstablishmentRepository } from "src/domain/repositories/establishment.repository";
import { CryptService } from "src/infra/services/crypt/crypt.service";
import { preRegisterTemplate } from "src/infra/services/mail/templates/pre-register";
import { env } from "src/core/env";

@Injectable()
export class CreateEstablishmentUseCase {
  constructor(
    @Inject("EstablishmentRepository")
    private readonly repository: EstablishmentRepository,

    @Inject("MailMessageService")
    private readonly mailMessageService: MailMessageService,

    @Inject("CryptService")
    private readonly cryptService: CryptService,
  ) {}

  async execute(
    payload: CreateEstablishmentUseCase.Request,
  ): Promise<CreateEstablishmentUseCase.Response> {
    const [
      existingByCnpj,
      existingByEmail,
      existingByCpf,
      existingByRg,
      existingByCnae,
    ] = await Promise.all([
      this.repository.findByCnpj(payload.cnpj),
      this.repository.findByEmail(payload.email),
      this.repository.findByCpf(payload.cpf),
      this.repository.findByRg(payload.rg),
      this.repository.findByCnae(payload.cnae),
    ]);

    if (existingByCnpj) {
      throw new ConflictException(
        "Establishment with this CNPJ already exists.",
      );
    }

    if (existingByEmail) {
      throw new ConflictException(
        "Establishment with this email already exists.",
      );
    }

    if (existingByCpf) {
      throw new ConflictException(
        "Establishment with this CPF already exists.",
      );
    }

    if (existingByRg) {
      throw new ConflictException("Establishment with this RG already exists.");
    }

    if (existingByCnae) {
      throw new ConflictException(
        "Establishment with this CNAE already exists.",
      );
    }

    const establishment = Establishment.create(payload);

    const plainPassword = establishment.password;

    const hasPassword = await this.cryptService.hash(
      establishment.password,
      10,
    );

    establishment.password = hasPassword;

    await Promise.all([
      await this.repository.save(establishment),
      await this.mailMessageService.send({
        from: "suporte@nexorum.shop",
        to: [establishment.email],
        subject: "Cadastro de Estabelecimento",
        body: preRegisterTemplate(
          env.DASHBOARD_URL,
          plainPassword,
          establishment.socialReason,
        ),
      }),
    ]);

    return;
  }
}

export namespace CreateEstablishmentUseCase {
  export type Request = {
    cnpj: string;
    socialReason: string;
    tradingName: string;
    responsibleName: string;
    cpf: string;
    civilStatus: string;
    cnae: number;
    rg: string;
    rgUf: string;
    rgDate: Date;
    gender: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };

  export type Response = void;
}
