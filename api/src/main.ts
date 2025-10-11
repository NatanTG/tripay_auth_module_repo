import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { env } from "./core/env";
import {
  createSwaggerConfig,
  swaggerDocumentOptions,
  swaggerCustomOptions,
} from "./core/config/swagger.config";
import { configureHelmet, configureCors } from "./core/config/security.config";
import { ConsoleLogger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      json: true,
    }),
  });

  const swaggerConfig = createSwaggerConfig();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig, swaggerDocumentOptions);
  SwaggerModule.setup("api", app, documentFactory, swaggerCustomOptions);

  configureHelmet(app);
  configureCors(app);

  await app.listen(env.PORT);
}

void bootstrap();
