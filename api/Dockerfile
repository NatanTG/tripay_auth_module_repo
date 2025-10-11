FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run db:generate
RUN npm run build

FROM node:20-alpine as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/generated ./generated
COPY --from=build /usr/src/app/prisma ./prisma
COPY --from=build /usr/src/app/package*.json ./

EXPOSE 3000
CMD ["node", "dist/main"]