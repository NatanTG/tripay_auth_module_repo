<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="public/logo.png" width="190" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">Um novo jeito rápido e prático de vender passagens.</p>
<p align="center">
<br/>
Caso seja novo acesse o <a href="/ONBOARDING.md">Onboarding</a>.
</p>

<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/MADE_WITH-LOVE-032F5B?style=for-the-badge" />
</p>

## Requisitos/Ferramentas

- NodeJS
- Pnpm
- Docker
- Docker Compose
## Comandos

### Desenvolvimento

-   `pnpm run build`: Compila a aplicação para o diretório `dist`.
-   `pnpm run start`: Inicia a aplicação.
-   `pnpm run start:dev`: Inicia a aplicação em modo de observação (watch mode).
-   `pnpm run start:debug`: Inicia a aplicação em modo de depuração e observação.
-   `pnpm run start:prod`: Inicia a aplicação em modo de produção a partir do build em `dist/main`.

### Lint e Formatação

-   `pnpm run format`: Formata os arquivos `.ts` no projeto com o Prettier.
-   `pnpm run lint`: Executa o ESLint para analisar e corrigir problemas no código.

### Prisma

-   `pnpm run prisma:studio`: Abre o Prisma Studio para visualizar e editar os dados.
-   `pnpm run prisma:generate`: Gera o Prisma Client com base no seu schema.
-   `pnpm run migrate:dev`: Cria e aplica migrações no ambiente de desenvolvimento.
-   `pnpm run migrate:deploy`: Aplica as migrações pendentes em um ambiente de produção.

### Testes

-   `pnpm run test`: Executa os testes com o Vitest.
-   `pnpm run test:watch`: Executa os testes em modo de observação.
-   `pnpm run test:cov`: Executa os testes e gera um relatório de cobertura.

## Variáveis de ambiente

| Variável       | Descrição                                       |
| -------------- | ----------------------------------------------- |
| `DATABASE_URL` | URL de conexão com o banco de dados PostgreSQL. |
| `PORT`         | A porta em que a aplicação será executada.      |
| `RESEND_KEY`   | Chave da API para o serviço de e-mail Resend.   |

## Descubra mais

- [Vitest](https://vitest.dev/guide/)
- [NestJs](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [Prisma](https://www.prisma.io/)



