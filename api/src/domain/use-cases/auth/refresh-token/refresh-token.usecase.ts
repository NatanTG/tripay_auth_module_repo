import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "src/infra/services/jwt/jwt.service";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject("JwtService")
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    payload: RefreshTokenUseCase.Request,
  ): Promise<RefreshTokenUseCase.Response> {
    const refreshToken = this.jwtService.refresh(payload.acessToken, {
      expiresIn: "6h",
    });

    return {
      accessToken: refreshToken,
    };
  }
}

export namespace RefreshTokenUseCase {
  export type Request = {
    acessToken: string;
  };

  export type Response = {
    accessToken: string;
  };
}
