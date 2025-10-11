import { OnboardingDocumentType } from "src/infra/http/dtos/update-onboarding-establishment.dto";

export function generateDocumentStorageKey(
  establishmentId: string,
  documentType: OnboardingDocumentType,
  originalFileName: string,
): string {
  const currentDate = new Date().toISOString().slice(0, 10);
  const fileExtension = originalFileName.split(".").pop();

  return `establishments/${establishmentId}/onboarding/${documentType}-${currentDate}.${fileExtension}`;
}
