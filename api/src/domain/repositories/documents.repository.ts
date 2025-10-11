export interface DocumentsRepository {
  save(establishmentId: string, name: string, path: string): Promise<void>;
  findByEstablishmentId(
    establishmentId: string,
  ): Promise<Array<{ id: string; name: string; path: string; addedAt: Date }>>;
  deleteByEstablishmentId(establishmentId: string): Promise<void>;
}
