import { Establishment } from "../entities/establishment";

export interface EstablishmentRepository {
  save: (estabilishment: Establishment) => Promise<void>;
  findByCnpj: (cnpj: string) => Promise<Establishment | null>;
  findByEmail: (email: string) => Promise<Establishment | null>;
  findByCpf: (cpf: string) => Promise<Establishment | null>;
  findByRg: (rg: string) => Promise<Establishment | null>;
  findByCnae: (cnae: number) => Promise<Establishment | null>;
  saveOnboarding: (establishment: Establishment) => Promise<void>;
  findById: (id: string) => Promise<Establishment | null>;
  updatePassword: (id: string, password: string) => Promise<void>;
}
