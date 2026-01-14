import { Prisma } from "@prisma/client";
import {
  logger,
  CodeLevelMap,
  pickLogLevel,
  TransformAndLogParams,
  CatalogMap,
} from "@dms/shared/logger";
import { dbErrorsCounter } from "./metrics/prisma.metrics";
import { AppError } from "@dms/shared/appError";

type NormalizedPrismaError = {
  __normalizedPrisma: true;
  code?: string; // ex: "P2002"
  meta?: any;
  original?: unknown;
};

const isNormalized = (e: unknown): e is NormalizedPrismaError => {
  return !!(e && typeof e === "object" && (e as any).__normalizedPrisma);
};

const extractKnown = (
  e: unknown
): Prisma.PrismaClientKnownRequestError | undefined => {
  return e instanceof Prisma.PrismaClientKnownRequestError ? e : undefined;
};

const extractPrismaCode = (error: unknown): string | undefined => {
  if (isNormalized(error)) return error.code;
  const known = extractKnown(error);
  if (known) return known.code;
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    typeof (error as any).code === "string"
  ) {
    const code = (error as any).code as string;
    if (/^P\d{4}$/.test(code)) return code;
  }
  return undefined;
};

const defaultCodeLevels: CodeLevelMap = {
  P2025: "warn", // Not Found
};

export class PrismaErrorTranslator {
  static translate<E extends AppError>(
    error: unknown,
    catalog: CatalogMap<E>
  ): E {
    const code = extractPrismaCode(error);
    const factory = (code && catalog[code]) || catalog.DEFAULT;
    return typeof factory === "function" ? (factory as any)() : factory;
  }

  static translateAndLog<E extends AppError>(
    props: TransformAndLogParams<E>
  ): E {
    const { error, catalog, ctx } = props;
    const prismaCode = extractPrismaCode(error) ?? "UNKNOWN";
    const domainErr = PrismaErrorTranslator.translate(error, catalog);
    const domainCode = domainErr.code ?? "DOMAIN_ERROR";
    const httpStatus = String(domainErr.status ?? 500);

    dbErrorsCounter.inc({
      domainCode,
      prismaCode,
      repo: ctx?.repo || "unknown",
      op: ctx?.op || "unknown",
      httpStatus,
    });

    const level = pickLogLevel({
      defaultCodeLevels,
      code: prismaCode,
      map: ctx?.codeLevels,
      override: ctx?.levelOverride,
    });

    const logObj = {
      prismaCode,
      domainCode,
      httpStatus,
      repo: ctx?.repo,
      op: ctx?.op,
      payload: ctx?.payload,
      traceId: ctx?.traceId,
    };

    const msg = "DB op failed → translated to domain error";
    level === "warn" ? logger.warn(logObj, msg) : logger.error(logObj, msg);

    return domainErr;
  }
}
