import "reflect-metadata";
import type { DependencyContainer } from "tsyringe";
import type { Logger } from "./logger.js";

import { registerSupabase } from "@dms/infra/supabase";
import { registerPrisma } from "@dms/infra/database";
import { registerUseCases } from "@dms/application/register";

export const configureContainer = (
  container: DependencyContainer,
  logger: Logger
) => {
  container.register<Logger>("Logger", {
    useValue: logger,
  });

  // infra registrations
  registerSupabase(container);
  registerPrisma(container);

  // application registrations
  registerUseCases(container);
  return container;
};
