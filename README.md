# DMS Wasp-193b

## Overview

This repository is a Turbo-powered monorepo for the DMS backend stack. It contains an API service and a set of shared packages that implement application, domain, infrastructure, and interface layers.

### Stack

- TypeScript
- Express.js
- Zod
- tsyringe
- Prisma
- Supabase
- Biome
- Turborepo
- Docker
- Prometheus
- Grafana

### Development

1. Create a database instance in Supabase and fill out `.env.example` with the appropriate values.
2. Bring up local services:

```sh
docker-compose up -d
```

3. Copy environment files into the required packages:

```sh
yarn cp
```

4. Start the development workflow:

```sh
yarn dev
```

## Repository Structure

```text
apps/
  api/                 Express API service
packages/
  application/         Use cases and application services
  domain/              Entities, value objects, schemas, errors
  infra/               Prisma, Supabase, database adapters, seed
  interfaces/          HTTP interface layer
  shared/              Logger, DI container, shared utilities
  config-typescript/   Shared TypeScript config
docker/
  grafana/             Grafana dashboards/config
  prometheus/          Prometheus config
docs/
  typescript-playground.ts
```

## Tooling

- Node.js >= 18, Yarn 1.x
- Turborepo for task orchestration
- Biome for linting
- Prisma for database schema, migrations, and client generation

## Common Scripts

- `yarn dev`: copy envs and run `turbo run dev`
- `yarn build`: build all packages/apps
- `yarn lint`: run Biome on the repo
- `yarn generate`: run Prisma generation
- `yarn db:migrate:dev`: run dev migrations
- `yarn db:seed`: seed the database

## Local Services

The Docker compose stack provides:

- Postgres (`localhost:5432`)
- Prometheus (`localhost:9090`)
- Grafana (`localhost:4000`)
- N8N (`localhost:5678`)

Start it with:

```sh
docker-compose up -d
```
