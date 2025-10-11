import { Entity } from "src/core/entities/entity";
import { UniqueEntityID } from "../../core/entities/unique-entity-id";
import { randomBytes } from "crypto";

export interface EstablishmentProps {
  role?: "ADMIN" | "ESTABLISHMENT";
  cnpj: string;
  socialReason: string;
  tradingName: string;
  responsibleName: string;
  cpf: string;
  civilStatus: string;
  cnae: number;
  rg: string;
  rgUf: string;
  rgDate: Date;
  gender: string;
  dateOfBirth: Date;
  email: string;
  password?: string;
  phone: string;
  website?: string;
  instagram?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  companyStreet?: string;
  companyNumber?: string;
  companyComplement?: string;
  companyNeighborhood?: string;
  companyCity?: string;
  companyState?: string;
  companyZipCode?: string;
  stateRegistration?: string;
  foundedAt?: Date;
  cadasturExpiresAt?: Date;
  bankAccountType?: string;
  bankCode?: string;
  bankAgency?: string;
  bankAgencyDigit?: string;
  bankAccountHolder?: string;
  bankAccountNumber?: string;
  bankAccountDigit?: string;
  cardBrand?: string;
  monthlyInvoice?: number;
  identityDocument?: string;
  addressProof?: string;
  selfieWithDocument?: string;
  cadasturCertificate?: string;
  bankProof?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Establishment extends Entity<EstablishmentProps> {
  private constructor(props: EstablishmentProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: EstablishmentProps, id?: UniqueEntityID) {
    const generatedPassword = randomBytes(8).toString("hex");
    return new Establishment(
      {
        ...props,
        password: props.password ?? generatedPassword,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
        status: props.status ?? "PENDING",
        role: props.role ?? "ESTABLISHMENT",
      },
      id,
    );
  }

  update(props: Partial<EstablishmentProps>) {
    Object.assign(this.props, props);
    this.touch();
  }

  static toDomain(raw: any): Establishment {
    return Establishment.create(
      {
        role: raw.role,
        cnpj: raw.cnpj,
        socialReason: raw.socialReason,
        tradingName: raw.tradingName,
        responsibleName: raw.responsibleName,
        cpf: raw.cpf,
        civilStatus: raw.civilStatus,
        cnae: raw.cnae,
        rg: raw.rg,
        rgUf: raw.rgUf,
        rgDate: new Date(raw.rgDate),
        gender: raw.gender,
        dateOfBirth: new Date(raw.dateOfBirth),
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        website: raw.website,
        instagram: raw.instagram,
        street: raw.street,
        number: raw.number,
        complement: raw.complement,
        neighborhood: raw.neighborhood,
        city: raw.city,
        state: raw.state,
        zipCode: raw.zipCode,
        companyStreet: raw.companyStreet,
        companyNumber: raw.companyNumber,
        companyComplement: raw.companyComplement,
        companyNeighborhood: raw.companyNeighborhood,
        companyCity: raw.companyCity,
        companyState: raw.companyState,
        companyZipCode: raw.companyZipCode,
        stateRegistration: raw.stateRegistration,
        foundedAt: raw.foundedAt ? new Date(raw.foundedAt) : undefined,
        cadasturExpiresAt: raw.cadasturExpiresAt
          ? new Date(raw.cadasturExpiresAt)
          : undefined,
        bankAccountType: raw.bankAccountType,
        bankCode: raw.bankCode,
        bankAgency: raw.bankAgency,
        bankAgencyDigit: raw.bankAgencyDigit,
        bankAccountHolder: raw.bankAccountHolder,
        bankAccountNumber: raw.bankAccountNumber,
        bankAccountDigit: raw.bankAccountDigit,
        cardBrand: raw.cardBrand,
        monthlyInvoice: raw.monthlyInvoice,
        identityDocument: raw.identityDocument,
        addressProof: raw.addressProof,
        selfieWithDocument: raw.selfieWithDocument,
        cadasturCertificate: raw.cadasturCertificate,
        bankProof: raw.bankProof,
        status: raw.status,
        createdAt: raw.createdAt ? new Date(raw.createdAt) : undefined,
        updatedAt: raw.updatedAt ? new Date(raw.updatedAt) : undefined,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toEntity(domain: Establishment): any {
    return {
      id: domain.id.toString(),
      role: domain.role,
      cnpj: domain.cnpj,
      socialReason: domain.socialReason,
      tradingName: domain.tradingName,
      responsibleName: domain.responsibleName,
      cpf: domain.cpf,
      civilStatus: domain.civilStatus,
      cnae: domain.cnae,
      rg: domain.rg,
      rgUf: domain.rgUf,
      rgDate: domain.rgDate,
      gender: domain.gender,
      dateOfBirth: domain.dateOfBirth,
      email: domain.email,
      password: domain.password,
      phone: domain.phone,
      website: domain.website,
      instagram: domain.instagram,
      street: domain.street,
      number: domain.number,
      complement: domain.complement,
      neighborhood: domain.neighborhood,
      city: domain.city,
      state: domain.state,
      zipCode: domain.zipCode,
      companyStreet: domain.companyStreet,
      companyNumber: domain.companyNumber,
      companyComplement: domain.companyComplement,
      companyNeighborhood: domain.companyNeighborhood,
      companyCity: domain.companyCity,
      companyState: domain.companyState,
      companyZipCode: domain.companyZipCode,
      stateRegistration: domain.stateRegistration,
      foundedAt: domain.foundedAt,
      cadasturExpiresAt: domain.cadasturExpiresAt,
      bankAccountType: domain.bankAccountType,
      bankCode: domain.bankCode,
      bankAgency: domain.bankAgency,
      bankAgencyDigit: domain.bankAgencyDigit,
      bankAccountHolder: domain.bankAccountHolder,
      bankAccountNumber: domain.bankAccountNumber,
      bankAccountDigit: domain.bankAccountDigit,
      cardBrand: domain.cardBrand,
      monthlyInvoice: domain.monthlyInvoice,
      status: domain.status,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  get role() {
    return this.props.role!;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get socialReason() {
    return this.props.socialReason;
  }

  get tradingName() {
    return this.props.tradingName;
  }

  get responsibleName() {
    return this.props.responsibleName;
  }

  get cpf() {
    return this.props.cpf;
  }

  get civilStatus() {
    return this.props.civilStatus;
  }

  get rg() {
    return this.props.rg;
  }

  get rgUf() {
    return this.props.rgUf;
  }

  get rgDate() {
    return this.props.rgDate;
  }

  get gender() {
    return this.props.gender;
  }

  get dateOfBirth() {
    return this.props.dateOfBirth;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password!;
  }

  get phone() {
    return this.props.phone;
  }

  get website() {
    return this.props.website;
  }

  get instagram() {
    return this.props.instagram;
  }

  get street() {
    return this.props.street;
  }

  get number() {
    return this.props.number;
  }

  get complement() {
    return this.props.complement;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }

  get zipCode() {
    return this.props.zipCode;
  }

  get companyStreet() {
    return this.props.companyStreet;
  }

  get companyNumber() {
    return this.props.companyNumber;
  }

  get companyComplement() {
    return this.props.companyComplement;
  }

  get companyNeighborhood() {
    return this.props.companyNeighborhood;
  }

  get companyCity() {
    return this.props.companyCity;
  }

  get companyState() {
    return this.props.companyState;
  }

  get companyZipCode() {
    return this.props.companyZipCode;
  }

  get cnae() {
    return this.props.cnae;
  }

  get stateRegistration() {
    return this.props.stateRegistration;
  }

  get foundedAt() {
    return this.props.foundedAt;
  }

  get cadasturExpiresAt() {
    return this.props.cadasturExpiresAt;
  }

  get bankAccountType() {
    return this.props.bankAccountType;
  }

  get bankCode() {
    return this.props.bankCode;
  }

  get bankAgency() {
    return this.props.bankAgency;
  }

  get bankAgencyDigit() {
    return this.props.bankAgencyDigit;
  }

  get bankAccountHolder() {
    return this.props.bankAccountHolder;
  }

  get bankAccountNumber() {
    return this.props.bankAccountNumber;
  }

  get bankAccountDigit() {
    return this.props.bankAccountDigit;
  }

  get cardBrand() {
    return this.props.cardBrand;
  }

  get monthlyInvoice() {
    return this.props.monthlyInvoice;
  }

  get identityDocument() {
    return this.props.identityDocument;
  }

  get addressProof() {
    return this.props.addressProof;
  }

  get selfieWithDocument() {
    return this.props.selfieWithDocument;
  }

  get cadasturCertificate() {
    return this.props.cadasturCertificate;
  }

  get bankProof() {
    return this.props.bankProof;
  }

  get status() {
    return this.props.status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set password(newPassword: string) {
    this.props.password = newPassword;
    this.touch();
  }

  touch() {
    this.props.updatedAt = new Date();
  }

  updateTradingName(newName: string) {
    this.props.tradingName = newName;
    this.props.updatedAt = new Date();
  }

  updatePhone(newPhone: string) {
    this.props.phone = newPhone;
    this.props.updatedAt = new Date();
  }
}
