import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from "@nestjs/swagger";

export function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle("API - Tripay")
    .setDescription("Descrição detalhada da minha API")
    .setVersion("1.0")
    .addTag("users", "Operações relacionadas aos usuários")
    .addTag("auth", "Autenticação e autorização")
    .addBearerAuth()
    .build();
}

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  autoTagControllers: true,
};

export const swaggerCustomOptions: SwaggerCustomOptions = {
  customSiteTitle: "Minha API - Documentação",
  customfavIcon: "/favicon.ico",
  customCss: `
    .swagger-ui .topbar { 
      background-color: #2c3e50; 
    }
  `,
  swaggerOptions: {
    persistAuthorization: true,
  },
  explorer: true,
  jsonDocumentUrl: "swagger/json",
  yamlDocumentUrl: "swagger/yaml",
};
