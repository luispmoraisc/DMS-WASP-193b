import { Prisma } from "@prisma/client";

export const normalizePrismaError = (e: unknown) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      __normalizedPrisma: true,
      code: e.code,
      meta: e.meta,
      original: e,
    } as const;
  }

  if (
    e instanceof Prisma.PrismaClientValidationError ||
    e instanceof Prisma.PrismaClientInitializationError ||
    e instanceof Prisma.PrismaClientRustPanicError ||
    e instanceof Prisma.PrismaClientUnknownRequestError
  ) {
    return {
      __normalizedPrisma: true,
      code: "PRISMA_OTHER",
      original: e,
    } as const;
  }

  return null;
};
