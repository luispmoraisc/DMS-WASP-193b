import { Counter, register } from "prom-client";

export const supabaseErrorsCounter = new Counter({
  name: "app_supabase_errors_total",
  help: "Total number of Supabase errors translated to domain errors",
  labelNames: [
    "domainCode",
    "supabaseCode",
    "repo",
    "op",
    "httpStatus",
  ] as const,
  registers: [register],
});

export const supabaseSignUpsCounter = new Counter({
  name: "app_supabase_sign_ups_total",
  help: "Total number of sign up attempts made to Supabase",
  labelNames: ["status", "repo"] as const,
  registers: [register],
});

export const supabaseSignInsCounter = new Counter({
  name: "app_supabase_sign_ins_total",
  help: "Total number of sign in attempts made to Supabase",
  labelNames: ["status", "repo"] as const,
  registers: [register],
});
