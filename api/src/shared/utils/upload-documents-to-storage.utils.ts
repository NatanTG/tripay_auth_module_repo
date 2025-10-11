import { StorageService } from "src/infra/services/bucket/storage.service";
import {
  DocumentFileWithMetadata,
  DocumentUploadResult,
} from "src/shared/types/onboarding-document.types";
import { generateDocumentStorageKey } from "./generate-document-storage-key.utils";

export async function uploadDocumentsToCloudStorage(
  establishmentId: string,
  documentsWithMetadata: DocumentFileWithMetadata[],
  storageService: StorageService,
): Promise<DocumentUploadResult> {
  const uploadPromises = documentsWithMetadata
    .filter(({ file }) => file)
    .map(async ({ file, field, type }) => {
      const storageKey = generateDocumentStorageKey(
        establishmentId,
        type,
        file!.originalname,
      );

      const uploadedFileUrl = await storageService.uploadFile(
        file!.buffer,
        file!.mimetype,
        storageKey,
      );

      return { field, url: uploadedFileUrl };
    });

  const uploadResults = await Promise.all(uploadPromises);

  const documentUrls: DocumentUploadResult = {};
  uploadResults.forEach(({ field, url }) => {
    documentUrls[field] = url;
  });

  return documentUrls;
}
