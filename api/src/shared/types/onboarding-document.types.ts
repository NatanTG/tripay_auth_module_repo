import { OnboardingDocumentType } from "src/infra/http/dtos/update-onboarding-establishment.dto";

export interface DocumentUploadResult {
  identityDocument?: string;
  addressProof?: string;
  selfieWithDocument?: string;
  cadasturCertificate?: string;
  bankProof?: string;
}

export interface DocumentFileWithMetadata {
  file?: Express.Multer.File;
  field: keyof DocumentUploadResult;
  type: OnboardingDocumentType;
}

export interface PayloadWithDocumentFiles {
  identityDocumentFile?: Express.Multer.File;
  addressProofFile?: Express.Multer.File;
  selfieWithDocumentFile?: Express.Multer.File;
  cadasturCertificateFile?: Express.Multer.File;
  bankProofFile?: Express.Multer.File;
}

export interface DocumentForDatabaseSave {
  name: string;
  path: string;
}
