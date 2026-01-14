import { AppError } from "@dms/shared/appError";
import { CatalogMap } from "@dms/shared/logger";
import { ProfileErrors } from "@dms/domain/errors";

export const PrismaProfileCatalog: CatalogMap<AppError> = {
  DEFAULT: ProfileErrors.default,
};
