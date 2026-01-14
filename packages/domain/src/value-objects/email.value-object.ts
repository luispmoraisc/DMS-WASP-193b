import { AppError } from "@dms/shared/appError";

export class Email {
  constructor(public readonly value: string) {
    if (!this.value.includes("@")) {
      throw new AppError({
        message: "Invalid email address",
        code: "INVALID_EMAIL",
        status: 400,
      });
    }
  }
}
