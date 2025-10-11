import { describe, expect, it, beforeEach } from "vitest";
import { Establishment } from "./establishment";
import { establishmentRequestMock } from "../../test/mocks/establishment.mock";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";

describe("Establishment", () => {
  let establishmentData: ReturnType<typeof establishmentRequestMock>;

  beforeEach(() => {
    establishmentData = establishmentRequestMock();
  });

  describe("create", () => {
    it("should be able to create establishment correctly", () => {
      const newEstablishment = Establishment.create(establishmentData);

      expect(newEstablishment).toBeInstanceOf(Establishment);
      expect(newEstablishment.id).toBeDefined();
      expect(newEstablishment.cnpj).toBe(establishmentData.cnpj);
      expect(newEstablishment.socialReason).toBe(
        establishmentData.socialReason,
      );
      expect(newEstablishment.email).toBe(establishmentData.email);
      expect(newEstablishment.createdAt).toBeInstanceOf(Date);
      expect(newEstablishment.updatedAt).toBeInstanceOf(Date);
    });

    it("should create establishment with default values", () => {
      const newEstablishment = Establishment.create(establishmentData);

      expect(newEstablishment.status).toBe("PENDING");
      expect(newEstablishment.role).toBe("ESTABLISHMENT");
      expect(newEstablishment.password).toBeDefined();
      expect(newEstablishment.password.length).toBe(16);
    });

    it("should create establishment with provided password", () => {
      const customPassword = "customPassword123";
      const newEstablishment = Establishment.create({
        ...establishmentData,
        password: customPassword,
      });

      expect(newEstablishment.password).toBe(customPassword);
    });

    it("should create establishment with custom ID", () => {
      const customId = new UniqueEntityID("custom-id-123");
      const newEstablishment = Establishment.create(
        establishmentData,
        customId,
      );

      expect(newEstablishment.id.toString()).toBe("custom-id-123");
    });

    it("should create establishment with custom status and role", () => {
      const newEstablishment = Establishment.create({
        ...establishmentData,
        status: "ACTIVE",
        role: "ADMIN",
      });

      expect(newEstablishment.status).toBe("ACTIVE");
      expect(newEstablishment.role).toBe("ADMIN");
    });

    it("should create establishment with custom dates", () => {
      const customCreatedAt = new Date("2023-01-01");
      const customUpdatedAt = new Date("2023-01-02");

      const newEstablishment = Establishment.create({
        ...establishmentData,
        createdAt: customCreatedAt,
        updatedAt: customUpdatedAt,
      });

      expect(newEstablishment.createdAt).toEqual(customCreatedAt);
      expect(newEstablishment.updatedAt).toEqual(customUpdatedAt);
    });
  });

  describe("update", () => {
    it("should update establishment properties", async () => {
      const establishment = Establishment.create(establishmentData);
      const originalUpdatedAt = establishment.updatedAt;

      await new Promise((resolve) => setTimeout(resolve, 1));

      const updateData = {
        socialReason: "New Company Name",
        tradingName: "New Trading Name",
        phone: "11987654321",
      };

      establishment.update(updateData);

      expect(establishment.socialReason).toBe("New Company Name");
      expect(establishment.tradingName).toBe("New Trading Name");
      expect(establishment.phone).toBe("11987654321");
      expect(establishment?.updatedAt?.getTime()).toBeGreaterThan(
        originalUpdatedAt!.getTime(),
      );
    });

    it("should update onboarding data", () => {
      const establishment = Establishment.create(establishmentData);

      const onboardingData = {
        companyStreet: "New Company Street",
        companyNumber: "456",
        stateRegistration: "SP987654321",
        bankAccountType: "checking",
        bankCode: "001",
        monthlyInvoice: 50000,
      };

      establishment.update(onboardingData);

      expect(establishment.companyStreet).toBe("New Company Street");
      expect(establishment.companyNumber).toBe("456");
      expect(establishment.stateRegistration).toBe("SP987654321");
      expect(establishment.bankAccountType).toBe("checking");
      expect(establishment.bankCode).toBe("001");
      expect(establishment.monthlyInvoice).toBe(50000);
    });

    it("should update document URLs", () => {
      const establishment = Establishment.create(establishmentData);

      const documentData = {
        identityDocument: "https://storage.com/identity.pdf",
        addressProof: "https://storage.com/address.pdf",
        selfieWithDocument: "https://storage.com/selfie.pdf",
        cadasturCertificate: "https://storage.com/cadastur.pdf",
        bankProof: "https://storage.com/bank.pdf",
      };

      establishment.update(documentData);

      expect(establishment.identityDocument).toBe(
        "https://storage.com/identity.pdf",
      );
      expect(establishment.addressProof).toBe(
        "https://storage.com/address.pdf",
      );
      expect(establishment.selfieWithDocument).toBe(
        "https://storage.com/selfie.pdf",
      );
      expect(establishment.cadasturCertificate).toBe(
        "https://storage.com/cadastur.pdf",
      );
      expect(establishment.bankProof).toBe("https://storage.com/bank.pdf");
    });
  });

  describe("password setter", () => {
    it("should update password and touch updatedAt", async () => {
      const establishment = Establishment.create(establishmentData);
      const originalUpdatedAt = establishment.updatedAt;

      await new Promise((resolve) => setTimeout(resolve, 1));

      const newPassword = "newSecurePassword123";
      establishment.password = newPassword;

      expect(establishment.password).toBe(newPassword);
      expect(establishment?.updatedAt?.getTime()).toBeGreaterThan(
        originalUpdatedAt!.getTime(),
      );
    });
  });

  describe("utility methods", () => {
    it("should update trading name", async () => {
      const establishment = Establishment.create(establishmentData);
      const originalUpdatedAt = establishment.updatedAt;

      await new Promise((resolve) => setTimeout(resolve, 1));

      const newTradingName = "New Trading Name Ltd";
      establishment.updateTradingName(newTradingName);

      expect(establishment.tradingName).toBe(newTradingName);
      expect(establishment.updatedAt?.getTime()).toBeGreaterThan(
        originalUpdatedAt!.getTime(),
      );
    });

    it("should update phone", async () => {
      const establishment = Establishment.create(establishmentData);
      const originalUpdatedAt = establishment.updatedAt;

      await new Promise((resolve) => setTimeout(resolve, 1));

      const newPhone = "11999888777";
      establishment.updatePhone(newPhone);

      expect(establishment.phone).toBe(newPhone);
      expect(establishment.updatedAt?.getTime()).toBeGreaterThan(
        originalUpdatedAt!.getTime(),
      );
    });

    it("should touch updatedAt", async () => {
      const establishment = Establishment.create(establishmentData);
      const originalUpdatedAt = establishment.updatedAt;

      await new Promise((resolve) => setTimeout(resolve, 1));

      establishment.touch();

      expect(establishment.updatedAt?.getTime()).toBeGreaterThan(
        originalUpdatedAt!.getTime(),
      );
    });
  });

  describe("static methods", () => {
    describe("toDomain", () => {
      it("should convert raw data to domain entity", () => {
        const rawData = {
          id: "test-id-123",
          ...establishmentData,
          rgDate: establishmentData.rgDate.toISOString(),
          dateOfBirth: establishmentData.dateOfBirth.toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          foundedAt: new Date("2020-01-01").toISOString(),
          cadasturExpiresAt: new Date("2025-12-31").toISOString(),
        };

        const establishment = Establishment.toDomain(rawData);

        expect(establishment).toBeInstanceOf(Establishment);
        expect(establishment.id.toString()).toBe("test-id-123");
        expect(establishment.cnpj).toBe(rawData.cnpj);
        expect(establishment.socialReason).toBe(rawData.socialReason);
        expect(establishment.rgDate).toBeInstanceOf(Date);
        expect(establishment.dateOfBirth).toBeInstanceOf(Date);
      });

      it("should handle optional date fields", () => {
        const rawData = {
          id: "test-id-123",
          ...establishmentData,
          rgDate: establishmentData.rgDate.toISOString(),
          dateOfBirth: establishmentData.dateOfBirth.toISOString(),
          foundedAt: null,
          cadasturExpiresAt: undefined,
        };

        delete (rawData as any).createdAt;
        delete (rawData as any).updatedAt;

        const establishment = Establishment.toDomain(rawData);

        expect(establishment.foundedAt).toBeUndefined();
        expect(establishment.cadasturExpiresAt).toBeUndefined();
        expect(establishment.createdAt).toBeInstanceOf(Date);
        expect(establishment.updatedAt).toBeInstanceOf(Date);
      });
    });

    describe("toEntity", () => {
      it("should convert domain entity to plain object", () => {
        const establishment = Establishment.create({
          ...establishmentData,
          companyStreet: "Company Street",
          stateRegistration: "SP123456789",
          monthlyInvoice: 25000,
        });

        const plainObject = Establishment.toEntity(establishment);

        expect(plainObject).toEqual({
          id: establishment.id.toString(),
          role: establishment.role,
          cnpj: establishment.cnpj,
          socialReason: establishment.socialReason,
          tradingName: establishment.tradingName,
          responsibleName: establishment.responsibleName,
          cpf: establishment.cpf,
          civilStatus: establishment.civilStatus,
          cnae: establishment.cnae,
          rg: establishment.rg,
          rgUf: establishment.rgUf,
          rgDate: establishment.rgDate,
          gender: establishment.gender,
          dateOfBirth: establishment.dateOfBirth,
          email: establishment.email,
          password: establishment.password,
          phone: establishment.phone,
          website: establishment.website,
          instagram: establishment.instagram,
          street: establishment.street,
          number: establishment.number,
          complement: establishment.complement,
          neighborhood: establishment.neighborhood,
          city: establishment.city,
          state: establishment.state,
          zipCode: establishment.zipCode,
          companyStreet: establishment.companyStreet,
          companyNumber: establishment.companyNumber,
          companyComplement: establishment.companyComplement,
          companyNeighborhood: establishment.companyNeighborhood,
          companyCity: establishment.companyCity,
          companyState: establishment.companyState,
          companyZipCode: establishment.companyZipCode,
          stateRegistration: establishment.stateRegistration,
          foundedAt: establishment.foundedAt,
          cadasturExpiresAt: establishment.cadasturExpiresAt,
          bankAccountType: establishment.bankAccountType,
          bankCode: establishment.bankCode,
          bankAgency: establishment.bankAgency,
          bankAgencyDigit: establishment.bankAgencyDigit,
          bankAccountHolder: establishment.bankAccountHolder,
          bankAccountNumber: establishment.bankAccountNumber,
          bankAccountDigit: establishment.bankAccountDigit,
          cardBrand: establishment.cardBrand,
          monthlyInvoice: establishment.monthlyInvoice,
          status: establishment.status,
          createdAt: establishment.createdAt,
          updatedAt: establishment.updatedAt,
        });
      });
    });
  });

  describe("getters", () => {
    it("should have all required getters working", () => {
      const establishment = Establishment.create({
        ...establishmentData,
        website: "https://company.com",
        instagram: "@company",
        complement: "Sala 101",
        companyStreet: "Company Street",
        companyNumber: "456",
        companyComplement: "Floor 2",
        companyNeighborhood: "Business District",
        companyCity: "Business City",
        companyState: "BS",
        companyZipCode: "87654321",
        stateRegistration: "SP123456789",
        foundedAt: new Date("2020-01-01"),
        cadasturExpiresAt: new Date("2025-12-31"),
        bankAccountType: "checking",
        bankCode: "001",
        bankAgency: "1234",
        bankAgencyDigit: "5",
        bankAccountHolder: "Company Name",
        bankAccountNumber: "123456",
        bankAccountDigit: "7",
        cardBrand: "visa",
        monthlyInvoice: 50000,
      });

      expect(establishment.role).toBe("ESTABLISHMENT");
      expect(establishment.cnpj).toBe(establishmentData.cnpj);
      expect(establishment.socialReason).toBe(establishmentData.socialReason);
      expect(establishment.tradingName).toBe(establishmentData.tradingName);
      expect(establishment.responsibleName).toBe(
        establishmentData.responsibleName,
      );
      expect(establishment.cpf).toBe(establishmentData.cpf);
      expect(establishment.civilStatus).toBe(establishmentData.civilStatus);
      expect(establishment.cnae).toBe(establishmentData.cnae);
      expect(establishment.rg).toBe(establishmentData.rg);
      expect(establishment.rgUf).toBe(establishmentData.rgUf);
      expect(establishment.rgDate).toBe(establishmentData.rgDate);
      expect(establishment.gender).toBe(establishmentData.gender);
      expect(establishment.dateOfBirth).toBe(establishmentData.dateOfBirth);
      expect(establishment.email).toBe(establishmentData.email);
      expect(establishment.phone).toBe(establishmentData.phone);
      expect(establishment.website).toBe("https://company.com");
      expect(establishment.instagram).toBe("@company");
      expect(establishment.street).toBe(establishmentData.street);
      expect(establishment.number).toBe(establishmentData.number);
      expect(establishment.complement).toBe("Sala 101");
      expect(establishment.neighborhood).toBe(establishmentData.neighborhood);
      expect(establishment.city).toBe(establishmentData.city);
      expect(establishment.state).toBe(establishmentData.state);
      expect(establishment.zipCode).toBe(establishmentData.zipCode);
      expect(establishment.companyStreet).toBe("Company Street");
      expect(establishment.companyNumber).toBe("456");
      expect(establishment.companyComplement).toBe("Floor 2");
      expect(establishment.companyNeighborhood).toBe("Business District");
      expect(establishment.companyCity).toBe("Business City");
      expect(establishment.companyState).toBe("BS");
      expect(establishment.companyZipCode).toBe("87654321");
      expect(establishment.stateRegistration).toBe("SP123456789");
      expect(establishment.foundedAt).toEqual(new Date("2020-01-01"));
      expect(establishment.cadasturExpiresAt).toEqual(new Date("2025-12-31"));
      expect(establishment.bankAccountType).toBe("checking");
      expect(establishment.bankCode).toBe("001");
      expect(establishment.bankAgency).toBe("1234");
      expect(establishment.bankAgencyDigit).toBe("5");
      expect(establishment.bankAccountHolder).toBe("Company Name");
      expect(establishment.bankAccountNumber).toBe("123456");
      expect(establishment.bankAccountDigit).toBe("7");
      expect(establishment.cardBrand).toBe("visa");
      expect(establishment.monthlyInvoice).toBe(50000);
      expect(establishment.status).toBe("PENDING");
    });
  });
});
