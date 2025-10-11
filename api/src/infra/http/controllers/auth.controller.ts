import {
  Body,
  Controller,
  HttpCode,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { RefreshTokenUseCase } from "src/domain/use-cases/auth/refresh-token/refresh-token.usecase";
import { SessionUseCase } from "src/domain/use-cases/auth/session/session.usecase";
import { ZodValidationPipe } from "src/infra/http/pipes/zod.pipe";
import {
  sessionEstablishmentDto,
  SessionEstablishmentDto,
} from "../dtos/session-establishment.dto";
import { RefreshTokenDto, refreshTokenDto } from "../dtos/refresh-token.dto";
import { ResetPasswordUseCase } from "src/domain/use-cases/auth/reset-password/reset-password.usecase";
import { ForgotPasswordUseCase } from "src/domain/use-cases/auth/forgot-password/forgot-password.usecase";
import { ResetPasswordDto, resetPasswordDto } from "../dtos/reset-password.dto";
import { ForgotPasswordDto } from "../dtos/forgot-password.dto";
@Controller("auth")
export class AuthController {
  constructor(
    private readonly sessionUseCase: SessionUseCase,
    private readonly refreshTokenUsecase: RefreshTokenUseCase,
    private readonly resetPasswordUsecase: ResetPasswordUseCase,
    private readonly forgotPasswordUsecase: ForgotPasswordUseCase,
  ) {}

  @Post("/session")
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(sessionEstablishmentDto))
  async login(
    @Body() payload: SessionEstablishmentDto,
  ): Promise<{ acessToken: string }> {
    return await this.sessionUseCase.execute(payload);
  }

  @Post("/refresh")
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(refreshTokenDto))
  async refreshToken(@Body() payload: RefreshTokenDto) {
    return this.refreshTokenUsecase.execute(payload);
  }

  @Put("/password")
  @HttpCode(204)
  @UsePipes(new ZodValidationPipe(resetPasswordDto))
  async resetPassword(@Body() body: ResetPasswordDto): Promise<void> {
    await this.resetPasswordUsecase.execute(body);
  }

  @Post("/password")
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(ForgotPasswordDto))
  async forgotPassword(@Body() body: ForgotPasswordDto): Promise<void> {
    await this.forgotPasswordUsecase.execute(body);
  }
}
