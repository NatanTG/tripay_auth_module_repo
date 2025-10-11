import { S3Client } from "@aws-sdk/client-s3";
import { env } from "src/core/env";

export const r2 = new S3Client({
  region: "auto",
  endpoint: env.CLOUDFLARE_R2_URL,
  credentials: {
    accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_R2_SECRET_KEY,
  },
  forcePathStyle: true,
  tls: true,
  requestHandler: {
    connectionTimeout: 10000,
    socketTimeout: 30000,
  },
  maxAttempts: 3,
});
