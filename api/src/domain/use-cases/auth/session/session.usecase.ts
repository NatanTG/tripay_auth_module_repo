import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { EstablishmentRepository } from "src/domain/repositories/establishment.repository";
import { CryptService } from "src/infra/services/crypt/crypt.service";
import { JwtService } from "src/infra/services/jwt/jwt.service";

@Injectable()
export class SessionUseCase {
  constructor(
    @Inject("EstablishmentRepository")
    private readonly establishmentRepository: EstablishmentRepository,

    @Inject("CryptService")
    private readonly cryptService: CryptService,

    @Inject("JwtService")
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    payload: SessionUseCase.Request,
  ): Promise<SessionUseCase.Response> {
    const establishment = await this.establishmentRepository.findByEmail(
      payload.email,
    );

    if (!establishment) {
      throw new BadRequestException("Invalid credentials.");
    }

    const isValidPassword = await this.cryptService.compare(
      payload.password,
      establishment.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException("Invalid credentials.");
    }

    const acessToken = this.jwtService.sign({
      id: establishment.id.toValue(),
      email: establishment.email,
      role: establishment.role,
    });

    return {
      acessToken,
    };
  }
}

export namespace SessionUseCase {
  export type Request = {
    email: string;
    password: string;
  };

  export type Response = {
    acessToken: string;
  };
}
