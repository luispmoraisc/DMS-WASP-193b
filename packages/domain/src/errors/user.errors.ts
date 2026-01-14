import { AppError } from "@dms/shared/appError";

export const UserErrors = {
  default: (details?: unknown) =>
    new AppError({
      message: "Internal server error. Please try again later.",
      status: 500,
      code: "DEFAULT",
      details,
    }),
};
