import pino from "pino";

export interface Logger extends pino.Logger {}

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

export type TMonitoringParams = {
  tenantId?: string;
  userId?: string;
  traceId?: string;
  payload?: unknown;
  op?: string;
  repo?: string;
};
