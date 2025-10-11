import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { env } from "src/core/env";
import { EstablishmentRepository } from "src/domain/repositories/establishment.repository";
import { CryptService } from "src/infra/services/crypt/crypt.service";
import { JwtService } from "src/infra/services/jwt/jwt.service";

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    @Inject("EstablishmentRepository")
    private readonly establishmentRepository: EstablishmentRepository,
    @Inject("CryptService")
    private readonly cryptService: CryptService,
    @Inject("JwtService")
    private readonly jwtService: JwtService,
  ) {}

  async execute(payload: ResetPasswordUseCase.Request): Promise<void> {
    const establichment = await this.establishmentRepository.findByEmail(
      payload.email,
    );
    if (!establichment) {
      throw new UnauthorizedException("Manager not found");
    }

    const decodedToken = this.jwtService.verify(
      payload.token,
      establichment.password + env.JWT_SECRET,
    );
    if (!decodedToken) {
      throw new UnauthorizedException("Invalid token");
    }

    const hashedPassword = await this.cryptService.hash(
      payload.newPassword,
      10,
    );
    await this.establishmentRepository.updatePassword(
      establichment.id.toValue(),
      hashedPassword,
    );

    return;
  }
}

export namespace ResetPasswordUseCase {
  export type Request = {
    token: string;
    email: string;
    newPassword: string;
  };
}
