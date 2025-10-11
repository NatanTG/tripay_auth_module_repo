import z from "zod";

export const resetPasswordDto = z.object({
  token: z.string().min(10),
  email: z.string().email("Invalid email format"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordDto>;
