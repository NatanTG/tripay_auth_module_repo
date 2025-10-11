import "dotenv/config";
import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().describe("database url"),
  PORT: z.string().default("3000"),
  RESEND_KEY: z.string().describe("resend api key"),
  JWT_SECRET: z.string().describe("jwt secret key"),
  DASHBOARD_URL: z.string().describe("dashboard url"),
  CLOUDFLARE_R2_URL: z.string().url(),
  CLOUDFLARE_R2_ACCESS_KEY_ID: z
    .string()
    .describe("Cloudflare R2 Access Key ID"),
  CLOUDFLARE_R2_BUCKET_NAME: z.string().describe("Cloudflare R2 Bucket Name"),
  CLOUDFLARE_R2_SECRET_KEY: z.string().describe("Cloudflare R2 Secret Key"),
  CLOUDFLARE_R2_TOKEN: z.string().describe("Cloudflare R2 Token"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .describe("node environment"),
  CORS_ORIGINS: z.string().describe("cors origins for development/test"),
  PRODUCTION_CORS_ORIGINS: z.string().describe("cors originss"),
  LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error", "fatal", "trace", "verbose"])
    .default("info"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("⚠️ Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
