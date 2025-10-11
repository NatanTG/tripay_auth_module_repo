import {
  PayloadWithDocumentFiles,
  DocumentFileWithMetadata,
} from "src/shared/types/onboarding-document.types";

export function extractDocumentFilesFromPayload(
  payload: PayloadWithDocumentFiles,
): DocumentFileWithMetadata[] {
  return [
    {
      file: payload.identityDocumentFile,
      field: "identityDocument",
      type: "identityDocument",
    },
    {
      file: payload.addressProofFile,
      field: "addressProof",
      type: "addressProof",
    },
    {
      file: payload.selfieWithDocumentFile,
      field: "selfieWithDocument",
      type: "selfieWithDocument",
    },
    {
      file: payload.cadasturCertificateFile,
      field: "cadasturCertificate",
      type: "cadasturCertificate",
    },
    {
      file: payload.bankProofFile,
      field: "bankProof",
      type: "bankProof",
    },
  ];
}
