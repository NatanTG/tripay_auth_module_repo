import z from "zod";

export const createEstablishmentDto = z.object({
  cnpj: z.string(),
  socialReason: z.string(),
  tradingName: z.string(),
  responsibleName: z.string(),
  cpf: z.string(),
  civilStatus: z.string(),
  cnae: z.number(),
  rg: z.string(),
  rgUf: z.string(),
  rgDate: z.coerce.date(),
  gender: z.string(),
  dateOfBirth: z.coerce.date(),
  email: z.string(),
  phone: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

export type CreateEstablishmentDto = z.infer<typeof createEstablishmentDto>;
