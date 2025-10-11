import { CreateEstablishmentUseCase } from "../../domain/use-cases/establishment/create-establishment/create-establishment.usecase";
import { Establishment } from "../../domain/entities/establishment";
import { faker } from "@faker-js/faker";

export const establishmentRequestMock =
  (): CreateEstablishmentUseCase.Request => ({
    cnpj: faker.string.numeric(14),
    socialReason: faker.company.name(),
    tradingName: faker.company.name(),
    responsibleName: faker.person.fullName(),
    cpf: faker.string.numeric(11),
    civilStatus: faker.helpers.arrayElement([
      "Single",
      "Married",
      "Divorced",
      "Widowed",
    ]),
    cnae: faker.number.int({ min: 1000000, max: 9999999 }),
    rg: faker.string.numeric(9),
    rgUf: faker.location.state({ abbreviated: true }),
    rgDate: faker.date.past(),
    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: "age" }),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    street: faker.location.streetAddress(),
    number: faker.location.buildingNumber(),
    neighborhood: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.string.numeric(8),
  });

export const establishmentMock = (): Establishment => {
  const requestData = establishmentRequestMock();
  return Establishment.create(requestData);
};
