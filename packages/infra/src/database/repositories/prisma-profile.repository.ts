import { inject, injectable } from "tsyringe";
import { maskSensitiveData } from "@dms/shared/utils";
import type { IProfileRepository } from "@dms/domain/repositories";
import type { Logger, TMonitoringParams } from "@dms/shared/logger";
import type { TSignInUpSchema } from "@dms/domain/schemas";
import { PrismaProfileCatalog } from "../catalogs/prisma-profile.catalog";
import { PrismaErrorTranslator } from "../translator";

@injectable()
export class PrismaProfileRepository implements IProfileRepository {
  constructor(@inject("Logger") private logger: Logger) {}

  async updateProfile(data: TSignInUpSchema, ctx?: TMonitoringParams) {
    try {
      const maskedData = maskSensitiveData(data);
      this.logger.info(`Updating profile for email: ${maskedData.email}`);
    } catch (error) {
      PrismaErrorTranslator.translateAndLog({
        error,
        catalog: PrismaProfileCatalog,
        ctx: {
          ...ctx,
          repo: "ProfilePrismaRepository",
          op: "updateProfile",
          traceId: ctx?.traceId,
          payload: maskSensitiveData(ctx?.payload),
          codeLevels: {},
        },
      });
    }
  }
}
