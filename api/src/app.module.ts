import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BullModule } from "@nestjs/bull";
import { ThrottlerModule } from "@nestjs/throttler";
import { InfraModule } from "./infra/infra.module";
import { envSchema } from "./core/env";
import { DatabaseModule } from "./core/database/database.module";
import { EstablishmentController } from "./infra/http/controllers/establishment.controller";
import { DomainModule } from "./domain/domain.module";
import { AuthController } from "./infra/http/controllers/auth.controller";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./infra/http/interceptors/logging.interceptor";

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT!, 10) || 6379,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate(config) {
        return envSchema.parse(config);
      },
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    InfraModule,
    DomainModule,
    DatabaseModule,
  ],
  controllers: [EstablishmentController, AuthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
