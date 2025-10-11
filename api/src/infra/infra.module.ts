import { Module } from "@nestjs/common";
import { MailModule } from "./services/mail/mail.module";
import { CryptModule } from "./services/crypt/crypt.module";
import { JwtModule } from "./services/jwt/jwt.module";
import { BucketModule } from "./services/bucket/storage.module";

@Module({
  imports: [MailModule, CryptModule, JwtModule, BucketModule],
  exports: [MailModule, CryptModule, JwtModule, BucketModule],
})
export class InfraModule {}
