import { Counter, collectDefaultMetrics, Registry } from "prom-client";

export const register = new Registry();
collectDefaultMetrics({ register });

export const dbErrorsCounter = new Counter({
  name: "app_db_errors_total",
  help: "Total number of database errors translated to domain errors",
  labelNames: ["domainCode", "prismaCode", "repo", "op", "httpStatus"] as const,
  registers: [register],
});
