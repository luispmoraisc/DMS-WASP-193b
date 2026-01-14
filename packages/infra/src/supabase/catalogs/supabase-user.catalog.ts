import { AppError } from "@dms/shared/appError";
import { CatalogMap } from "@dms/shared/logger";
import { UserErrors } from "@dms/domain/errors";

export const SupabaseUserCatalog: CatalogMap<AppError> = {
  DEFAULT: UserErrors.default,
};
