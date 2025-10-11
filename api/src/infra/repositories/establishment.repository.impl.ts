import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { Establishment } from "src/domain/entities/establishment";
import { EstablishmentRepository } from "src/domain/repositories/establishment.repository";

@Injectable()
export class EstablishmentRepositoryImpl implements EstablishmentRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async saveOnboarding(establishment: Establishment): Promise<void> {
    const data = Establishment.toEntity(establishment);

    await this.prisma.establishment.update({
      where: { cnpj: establishment.cnpj },
      data,
    });
  }

  async findByEmail(email: string): Promise<Establishment | null> {
    const estabilishmentFound = await this.prisma.establishment.findUnique({
      where: {
        email,
      },
    });
    if (!estabilishmentFound) {
      return null;
    }
    const establishment = Establishment.toDomain(estabilishmentFound);
    return establishment;
  }

  async save(establishment: Establishment): Promise<void> {
    const data = Establishment.toEntity(establishment);

    await this.prisma.establishment.create({ data });
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.prisma.establishment.update({
      where: { id },
      data: { password },
    });
  }

  async findByCnpj(cnpj: string): Promise<Establishment | null> {
    const estabilishmentAlreadyExist =
      await this.prisma.establishment.findUnique({
        where: { cnpj },
      });

    if (!estabilishmentAlreadyExist) {
      return null;
    }

    const estabilishment = Establishment.toDomain(estabilishmentAlreadyExist);
    estabilishment;

    return estabilishment;
  }

  async findById(id: string): Promise<Establishment | null> {
    const estabilishmentFound = await this.prisma.establishment.findUnique({
      where: {
        id,
      },
    });
    if (!estabilishmentFound) {
      return null;
    }
    const establishment = Establishment.toDomain(estabilishmentFound);
    return establishment;
  }

  async findByCpf(cpf: string): Promise<Establishment | null> {
    const establishmentFound = await this.prisma.establishment.findUnique({
      where: { cpf },
    });
    if (!establishmentFound) {
      return null;
    }
    return Establishment.toDomain(establishmentFound);
  }

  async findByRg(rg: string): Promise<Establishment | null> {
    const establishmentFound = await this.prisma.establishment.findUnique({
      where: { rg },
    });
    if (!establishmentFound) {
      return null;
    }
    return Establishment.toDomain(establishmentFound);
  }

  async findByCnae(cnae: number): Promise<Establishment | null> {
    const establishmentFound = await this.prisma.establishment.findUnique({
      where: { cnae },
    });
    if (!establishmentFound) {
      return null;
    }
    return Establishment.toDomain(establishmentFound);
  }
}
