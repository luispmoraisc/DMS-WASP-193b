FROM node:24-alpine

WORKDIR /app

COPY package.json yarn.lock turbo.json ./
COPY .env ./.env
COPY apps/api/package.json apps/api/package.json
COPY packages/application/package.json packages/application/package.json
COPY packages/config-typescript/package.json packages/config-typescript/package.json
COPY packages/domain/package.json packages/domain/package.json
COPY packages/infra/package.json packages/infra/package.json
COPY packages/interfaces/package.json packages/interfaces/package.json
COPY packages/shared/package.json packages/shared/package.json

RUN yarn install --frozen-lockfile

COPY apps apps
COPY packages packages

RUN yarn cp && \
  yarn workspace @dms/infra generate

EXPOSE 3000

CMD ["yarn", "start"]
