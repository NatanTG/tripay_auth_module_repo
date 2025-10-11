import {
  DocumentUploadResult,
  DocumentForDatabaseSave,
} from "src/shared/types/onboarding-document.types";

export function prepareDocumentsForDatabaseSave(
  uploadedDocumentUrls: DocumentUploadResult,
): DocumentForDatabaseSave[] {
  const documentsReadyForSave: DocumentForDatabaseSave[] = [];

  if (uploadedDocumentUrls.identityDocument) {
    documentsReadyForSave.push({
      name: "identityDocument",
      path: uploadedDocumentUrls.identityDocument,
    });
  }

  if (uploadedDocumentUrls.addressProof) {
    documentsReadyForSave.push({
      name: "addressProof",
      path: uploadedDocumentUrls.addressProof,
    });
  }

  if (uploadedDocumentUrls.selfieWithDocument) {
    documentsReadyForSave.push({
      name: "selfieWithDocument",
      path: uploadedDocumentUrls.selfieWithDocument,
    });
  }

  if (uploadedDocumentUrls.cadasturCertificate) {
    documentsReadyForSave.push({
      name: "cadasturCertificate",
      path: uploadedDocumentUrls.cadasturCertificate,
    });
  }

  if (uploadedDocumentUrls.bankProof) {
    documentsReadyForSave.push({
      name: "bankProof",
      path: uploadedDocumentUrls.bankProof,
    });
  }

  return documentsReadyForSave;
}
