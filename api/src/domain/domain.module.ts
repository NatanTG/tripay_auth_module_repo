import { Module } from "@nestjs/common";
import { CreateEstablishmentUseCase } from "./use-cases/establishment/create-establishment/create-establishment.usecase";
import { EstablishmentRepositoryImpl } from "src/infra/repositories/establishment.repository.impl";
import { DocumentsRepositoryImpl } from "src/infra/repositories/documents.repository.impl";
import { InfraModule } from "src/infra/infra.module";
import { SessionUseCase } from "./use-cases/auth/session/session.usecase";
import { RefreshTokenUseCase } from "./use-cases/auth/refresh-token/refresh-token.usecase";
import { UpdateOnboardingEstablishmentUseCase } from "./use-cases/establishment/update-onboarding-establishment/update-onboarding-establishment.usecase";
import { ResetPasswordUseCase } from "./use-cases/auth/reset-password/reset-password.usecase";
import { ForgotPasswordUseCase } from "./use-cases/auth/forgot-password/forgot-password.usecase";

@Module({
  imports: [InfraModule],
  providers: [
    CreateEstablishmentUseCase,
    SessionUseCase,
    RefreshTokenUseCase,
    UpdateOnboardingEstablishmentUseCase,
    ResetPasswordUseCase,
    ForgotPasswordUseCase,
    {
      provide: "EstablishmentRepository",
      useClass: EstablishmentRepositoryImpl,
    },
    {
      provide: "DocumentsRepository",
      useClass: DocumentsRepositoryImpl,
    },
  ],
  exports: [
    CreateEstablishmentUseCase,
    UpdateOnboardingEstablishmentUseCase,
    SessionUseCase,
    RefreshTokenUseCase,
    ForgotPasswordUseCase,
    ResetPasswordUseCase,
  ],
})
export class DomainModule {}
