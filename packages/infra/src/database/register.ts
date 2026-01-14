import { DependencyContainer } from "tsyringe";

import { IProfileRepository } from "@dms/domain/repositories";
import { PrismaProfileRepository } from "./repositories/prisma-profile.repository";

// Register Prisma repositories in the DI container
export const registerPrisma = (container: DependencyContainer) => {
  container.register<IProfileRepository>("ProfileRepository", {
    useClass: PrismaProfileRepository,
  });

  return container;
};
