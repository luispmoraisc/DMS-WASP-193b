import type { IUserRepository } from "@dms/domain/repositories";
import type { TSignInUpSchema } from "@dms/domain/schemas";
import { type Logger, type TMonitoringParams } from "@dms/shared/logger";
import { maskSensitiveData } from "@dms/shared/utils";
import { inject, injectable } from "tsyringe";

@injectable()
export class SignUpUseCase {
  constructor(
    @inject("Logger") private logger: Logger,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  public async execute(
    data: TSignInUpSchema,
    ctx?: TMonitoringParams
  ): Promise<void> {
    try {
      const maskedData = maskSensitiveData(data);
      this.logger.debug(
        { ctx },
        `sign up request received for email: ${maskedData.email}`
      );
      const response = await this.userRepository.signUp(data, {
        ...ctx,
        payload: data,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
