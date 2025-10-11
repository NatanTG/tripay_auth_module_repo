import z from "zod";

export const sessionEstablishmentDto = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SessionEstablishmentDto = z.infer<typeof sessionEstablishmentDto>;
