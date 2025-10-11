export { generateDocumentStorageKey } from "./generate-document-storage-key.utils";
export { extractDocumentFilesFromPayload } from "./extract-files-from-payload.utils";
export { uploadDocumentsToCloudStorage } from "./upload-documents-to-storage.utils";
export { prepareDocumentsForDatabaseSave } from "./prepare-documents-for-database.utils";

export type {
  DocumentUploadResult,
  DocumentFileWithMetadata,
  PayloadWithDocumentFiles,
  DocumentForDatabaseSave,
} from "../types/onboarding-document.types";
