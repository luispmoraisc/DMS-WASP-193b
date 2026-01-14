import { AppError } from "@dms/shared/appError";

export const ProfileErrors = {
  default: (details?: unknown) =>
    new AppError({
      message: "Erro interno no servidor. Tente novamente mais tarde",
      status: 500,
      code: "DEFAULT",
      details,
    }),
};
