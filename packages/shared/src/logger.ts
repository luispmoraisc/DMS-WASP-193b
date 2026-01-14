import pino from "pino";
import { AppError } from "./appError";

export interface Logger extends pino.Logger {}

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

// Monitoring context parameters
export type TMonitoringParams = {
  tenantId?: string;
  userId?: string;
  traceId?: string;
  payload?: unknown;
  op?: string;
  repo?: string;
};

// Log level picking utility
export type CodeLevelMap = Partial<Record<string, "warn" | "error">>;

// Example: { "P2025": "warn", "P2002": "error" }
export type PickLogLevelParams = {
  defaultCodeLevels?: CodeLevelMap;
  code?: string;
  map?: CodeLevelMap;
  override?: "warn" | "error";
};

/**
 * pickLogLevel utility
 * @param param {PickLogLevelParams}
 * @returns log level
 */
export const pickLogLevel = ({
  defaultCodeLevels,
  code,
  map,
  override,
}: PickLogLevelParams): "warn" | "error" => {
  if (override) return override;
  const merged = { ...defaultCodeLevels, ...(map || {}) };
  return (code && merged[code]) || "error";
};

type FactoryError<E extends AppError> = E | ((ctx: { error: unknown }) => E);

/**
 * Catalog mapping type
 * e.g.: {
 *  "SOME_CODE": (ctx) => new AppError({ message: "Specific error", status: 400 }),
 *  DEFAULT: () => new AppError({ message: "Unknown error", status: 500 }),
 * }
 */
export type CatalogMap<E extends AppError> = {
  DEFAULT: FactoryError<E>;
} & Partial<Record<string, FactoryError<E>>>;

// Parameters for translateAndLog method
export type TransformAndLogParams<E extends AppError> = {
  error: unknown;
  catalog: CatalogMap<E>;
  ctx?: {
    repo?: string;
    op?: string;
    payload?: unknown;
    traceId?: string;
    codeLevels?: CodeLevelMap;
    levelOverride?: "warn" | "error";
  };
};
