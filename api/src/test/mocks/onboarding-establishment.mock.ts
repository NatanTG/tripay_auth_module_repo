import { UpdateOnboardingEstablishmentUseCase } from "../../domain/use-cases/establishment/update-onboarding-establishment/update-onboarding-establishment.usecase";
import { faker } from "@faker-js/faker";

export const onboardingEstablishmentMock = (): Omit<
  UpdateOnboardingEstablishmentUseCase.Request,
  | "identityDocumentFile"
  | "addressProofFile"
  | "selfieWithDocumentFile"
  | "cadasturCertificateFile"
  | "bankProofFile"
> => ({
  companyStreet: faker.location.streetAddress(),
  companyNumber: faker.location.buildingNumber(),
  companyComplement: faker.helpers.maybe(
    () => faker.location.secondaryAddress(),
    { probability: 0.5 },
  ),
  companyNeighborhood: faker.location.secondaryAddress(),
  companyCity: faker.location.city(),
  companyState: faker.location.state({ abbreviated: true }),
  companyZipCode: faker.string.numeric(8),
  stateRegistration: faker.string.alphanumeric(12).toUpperCase(),
  foundedAt: faker.date.past({ years: 10 }),
  cadasturExpiresAt: faker.date.future({ years: 2 }),
  bankAccountType: faker.helpers.arrayElement(["checking", "savings"]),
  bankCode: faker.helpers.arrayElement(["001", "033", "104", "237", "341"]),
  bankAgency: faker.string.numeric(4),
  bankAgencyDigit: faker.string.numeric(1),
  bankAccountHolder: faker.company.name(),
  bankAccountNumber: faker.string.numeric(6),
  bankAccountDigit: faker.string.numeric(1),
  cardBrand: faker.helpers.arrayElement(["visa", "mastercard", "elo", "amex"]),
  monthlyInvoice: faker.number.int({ min: 10000, max: 1000000 }),
});
