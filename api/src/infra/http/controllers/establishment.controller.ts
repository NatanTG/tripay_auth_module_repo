import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Request,
  Post,
  UsePipes,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { CreateEstablishmentUseCase } from "src/domain/use-cases/establishment/create-establishment/create-establishment.usecase";
import { ZodValidationPipe } from "src/infra/http/pipes/zod.pipe";
import { AuthGuard } from "../guards/jwt-auth-guard";
import {
  CreateEstablishmentDto,
  createEstablishmentDto,
} from "../dtos/create-establishment.dto";
import {
  updateOnboardingEstablishmentDto,
  type UpdateOnboardingEstablishmentDto,
} from "../dtos/update-onboarding-establishment.dto";
import { UpdateOnboardingEstablishmentUseCase } from "src/domain/use-cases/establishment/update-onboarding-establishment/update-onboarding-establishment.usecase";
import { ValidatedMultipartInterceptor } from "src/infra/http/interceptors/validated-multipart.interceptor";

@Controller("establishment")
export class EstablishmentController {
  constructor(
    private readonly createEstablishmentUseCase: CreateEstablishmentUseCase,
    private readonly updateOnboardingEstablishmentUseCase: UpdateOnboardingEstablishmentUseCase,
  ) {}

  @Post("/")
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createEstablishmentDto))
  async save(@Body() payload: CreateEstablishmentDto): Promise<void> {
    await this.createEstablishmentUseCase.execute(payload);
  }

  @Patch("/onboarding")
  @HttpCode(201)
  @UseGuards(AuthGuard)
  @UseInterceptors(
    new ValidatedMultipartInterceptor(updateOnboardingEstablishmentDto, [
      { name: "identityDocument", maxCount: 1 },
      { name: "addressProof", maxCount: 1 },
      { name: "selfieWithDocument", maxCount: 1 },
      { name: "cadasturCertificate", maxCount: 1 },
      { name: "bankProof", maxCount: 1 },
    ]),
  )
  async onboarding(
    @Body() payload: UpdateOnboardingEstablishmentDto,
    @UploadedFiles() files: { [key: string]: Express.Multer.File[] },
    @Request() req: any,
  ): Promise<void> {
    const id = req.user.id;

    const request: UpdateOnboardingEstablishmentUseCase.Request = {
      ...payload,
      identityDocumentFile: files.identityDocument?.[0],
      addressProofFile: files.addressProof?.[0],
      selfieWithDocumentFile: files.selfieWithDocument?.[0],
      cadasturCertificateFile: files.cadasturCertificate?.[0],
      bankProofFile: files.bankProof?.[0],
    };

    await this.updateOnboardingEstablishmentUseCase.execute(id, request);
  }
}
