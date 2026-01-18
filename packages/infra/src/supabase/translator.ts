import { AppError } from "@dms/shared/appError";
import {
  CatalogMap,
  CodeLevelMap,
  logger,
  pickLogLevel,
  TransformAndLogParams,
} from "@dms/shared/logger";
import { isAuthApiError } from "@supabase/supabase-js";
import { supabaseErrorsCounter } from "./metrics/supabase.metrics";

const defaultCodeLevels: CodeLevelMap = {
  P2025: "warn", // Not Found
};

const extractSupabaseCode = (error: unknown): string | undefined => {
  if (isAuthApiError(error)) {
    return error.code;
  }
  return undefined;
};

export class SupabaseErrorTranslator {
  static translate<E extends AppError>(
    error: unknown,
    catalog: CatalogMap<E>
  ): E {
    const code = extractSupabaseCode(error);
    const factory = (code && catalog[code]) || catalog.DEFAULT;
    return typeof factory === "function" ? (factory as any)() : factory;
  }

  static translateAndLog<E extends AppError>(
    props: TransformAndLogParams<E>
  ): E {
    const { error, catalog, ctx } = props;
    const supabaseCode = extractSupabaseCode(error) ?? "UNKNOWN";
    const domainErr = SupabaseErrorTranslator.translate(error, catalog);
    const domainCode = domainErr.code ?? "DOMAIN_ERROR";
    const httpStatus = String(domainErr.status ?? 500);

    supabaseErrorsCounter.inc({
      domainCode,
      supabaseCode,
      repo: ctx?.repo || "unknown",
      op: ctx?.op || "unknown",
      httpStatus,
    });

    const level = pickLogLevel({
      defaultCodeLevels,
      code: supabaseCode,
      map: ctx?.codeLevels,
      override: ctx?.levelOverride,
    });

    const logObj = {
      supabaseCode,
      domainCode,
      httpStatus,
      repo: ctx?.repo,
      op: ctx?.op,
      payload: ctx?.payload,
      traceId: ctx?.traceId,
    };

    const msg = "Supabase op failed → translated to domain error";
    level === "warn" ? logger.warn(logObj, msg) : logger.error(logObj, msg);

    return domainErr;
  }
}
