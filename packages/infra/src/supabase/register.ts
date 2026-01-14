import { DependencyContainer } from "tsyringe";

import { IUserRepository } from "@dms/domain/repositories";
import { SupabaseUserRepository } from "./repositories/supabase-user.repository";

// Register Supabase repositories in the DI container
export const registerSupabase = (container: DependencyContainer) => {
  container.register<IUserRepository>("UserRepository", {
    useClass: SupabaseUserRepository,
  });

  return container;
};
