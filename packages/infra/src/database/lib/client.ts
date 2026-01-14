import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { type Prisma, PrismaClient } from "@prisma/client";
import { normalizePrismaError } from "./normalizeErrors";
import { createPool } from "./pool";

const adapter = new PrismaPg(createPool());

const raw = new PrismaClient({
  adapter,
  log: [
    { level: "warn", emit: "event" },
    { level: "error", emit: "event" },
  ],
});

export const prisma = raw.$extends({
  query: {
    $allModels: {
      $allOperations<Args, Result>({
        query,
        args,
      }: {
        query: (args: Args) => Prisma.PrismaPromise<Result>;
        args: Args;
      }): Promise<Result> {
        return query(args).catch((e: unknown) => {
          const normalized = normalizePrismaError(e);
          if (normalized) throw normalized;
          throw e;
        });
      },
    },
  },
});
