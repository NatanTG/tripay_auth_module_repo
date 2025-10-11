import z from "zod";

export const onboardingDocumentTypeEnum = z.enum([
  "identityDocument",
  "addressProof",
  "selfieWithDocument",
  "cadasturCertificate",
  "bankProof",
]);

export type OnboardingDocumentType = z.infer<typeof onboardingDocumentTypeEnum>;

export const updateOnboardingEstablishmentDto = z.object({
  website: z.string().optional(),
  instagram: z.string().optional(),
  companyStreet: z.string(),
  companyNumber: z.string(),
  companyComplement: z.string().optional(),
  companyNeighborhood: z.string(),
  companyCity: z.string(),
  companyState: z.string(),
  companyZipCode: z.string(),
  stateRegistration: z.string(),
  foundedAt: z.coerce.date(),
  cadasturExpiresAt: z.coerce.date(),
  bankAccountType: z.string(),
  bankCode: z.string(),
  bankAgency: z.string(),
  bankAgencyDigit: z.string(),
  bankAccountHolder: z.string(),
  bankAccountNumber: z.string(),
  bankAccountDigit: z.string(),
  cardBrand: z.string(),
  monthlyInvoice: z.coerce.number(),
  status: z.string().optional(),
});

export type UpdateOnboardingEstablishmentDto = z.infer<
  typeof updateOnboardingEstablishmentDto
>;
