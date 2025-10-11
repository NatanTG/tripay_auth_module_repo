import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { EstablishmentRepository } from "../../../repositories/establishment.repository";
import { DocumentsRepository } from "../../../repositories/documents.repository";
import { MailMessageService } from "../../../../infra/services/mail/mail.service";
import { env } from "src/core/env";
import { registerConfirmTemplate } from "src/infra/services/mail/templates/register.confirm";
import { StorageService } from "../../../../infra/services/bucket/storage.service";
import {
  uploadDocumentsToCloudStorage,
  extractDocumentFilesFromPayload,
  prepareDocumentsForDatabaseSave,
} from "src/shared/utils";

@Injectable()
export class UpdateOnboardingEstablishmentUseCase {
  constructor(
    @Inject("EstablishmentRepository")
    private readonly repository: EstablishmentRepository,

    @Inject("DocumentsRepository")
    private readonly documentsRepository: DocumentsRepository,

    @Inject("MailMessageService")
    private readonly mailMessageService: MailMessageService,

    @Inject("BucketService")
    private readonly storageService: StorageService,
  ) {}

  async execute(
    id: string,
    payload: UpdateOnboardingEstablishmentUseCase.Request,
  ): Promise<UpdateOnboardingEstablishmentUseCase.Response> {
    const establishment = await this.repository.findById(id);

    if (!establishment) {
      throw new UnauthorizedException(
        "Establishment not found or not authenticated.",
      );
    }

    const documentFiles = extractDocumentFilesFromPayload(payload);
    const documentUrls = await uploadDocumentsToCloudStorage(
      id,
      documentFiles,
      this.storageService,
    );

    const updateData = payload;
    establishment.update(updateData);

    const documentsToSave = prepareDocumentsForDatabaseSave(documentUrls);
    const documentSavePromises = documentsToSave.map((doc) =>
      this.documentsRepository.save(id, doc.name, doc.path),
    );

    await Promise.all([
      this.repository.saveOnboarding(establishment),
      ...documentSavePromises,
      this.mailMessageService.send({
        from: "suporte@nexorum.shop",
        to: [establishment.email],
        subject: "Onboarding Concluído - Tripay",
        body: registerConfirmTemplate(env.DASHBOARD_URL),
      }),
    ]);
    return;
  }
}

export namespace UpdateOnboardingEstablishmentUseCase {
  export type Request = {
    companyStreet: string;
    companyNumber: string;
    companyComplement?: string;
    companyNeighborhood: string;
    companyCity: string;
    companyState: string;
    companyZipCode: string;
    stateRegistration: string;
    foundedAt: Date;
    cadasturExpiresAt: Date;
    bankAccountType: string;
    bankCode: string;
    bankAgency: string;
    bankAgencyDigit: string;
    bankAccountHolder: string;
    bankAccountNumber: string;
    bankAccountDigit: string;
    cardBrand: string;
    monthlyInvoice: number;
    identityDocumentFile?: Express.Multer.File;
    addressProofFile?: Express.Multer.File;
    selfieWithDocumentFile?: Express.Multer.File;
    cadasturCertificateFile?: Express.Multer.File;
    bankProofFile?: Express.Multer.File;
  };

  export type Response = void;
}
