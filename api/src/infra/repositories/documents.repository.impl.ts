import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/core/database/database.service";
import { DocumentsRepository } from "src/domain/repositories/documents.repository";

@Injectable()
export class DocumentsRepositoryImpl implements DocumentsRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async save(
    establishmentId: string,
    name: string,
    path: string,
  ): Promise<void> {
    await this.prisma.documents.create({
      data: {
        name,
        path,
        establishment_id: establishmentId,
      },
    });
  }

  async findByEstablishmentId(
    establishmentId: string,
  ): Promise<Array<{ id: string; name: string; path: string; addedAt: Date }>> {
    const documents = await this.prisma.documents.findMany({
      where: {
        establishment_id: establishmentId,
      },
    });

    return documents.map((doc) => ({
      id: doc.id,
      name: doc.name,
      path: doc.path,
      addedAt: doc.addedAt,
    }));
  }

  async deleteByEstablishmentId(establishmentId: string): Promise<void> {
    await this.prisma.documents.deleteMany({
      where: {
        establishment_id: establishmentId,
      },
    });
  }
}
