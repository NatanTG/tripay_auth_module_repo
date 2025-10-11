import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { env } from "src/core/env";
import { EstablishmentRepository } from "src/domain/repositories/establishment.repository";
import { JwtService } from "src/infra/services/jwt/jwt.service";
import { MailMessageService } from "src/infra/services/mail/mail.service";

@Injectable()
export class ForgotPasswordUseCase {
  constructor(
    @Inject("EstablishmentRepository")
    private readonly establishmentRepository: EstablishmentRepository,
    @Inject("JwtService")
    private readonly jwtService: JwtService,
    @Inject("MailMessageService")
    private readonly mailMessageService: MailMessageService,
  ) {}

  async execute(payload: ForgotPasswordUseCase.Request): Promise<void> {
    const establishment = await this.establishmentRepository.findByEmail(
      payload.email,
    );
    if (!establishment) {
      throw new NotFoundException("establishment not found");
    }
    const token = this.jwtService.sign(
      { email: establishment.email },
      establishment.password + env.JWT_SECRET,
    );
    const resetLink = `${env.DASHBOARD_URL}/reset-password?token=${token}&email=${encodeURIComponent(establishment.email)}`;

    // await this.mailMessageService.send({
    //   from: 'teste@nexorum.shop', // ? validar dominio coreto
    //   to: [payload.email],
    //   subject: 'Cadastro de Estabelecimento',
    //   body: passwordResetTemplate(resetLink),
    // });
  }
}

export namespace ForgotPasswordUseCase {
  export type Request = {
    email: string;
  };
}
