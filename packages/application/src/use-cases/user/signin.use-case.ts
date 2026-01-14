import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "@dms/domain/repositories";
import { logger, type TMonitoringParams } from "@dms/shared/logger";
import type { TSignInUpSchema, TSignInResponseDTO } from "@dms/domain/schemas";
import { maskSensitiveData } from "@dms/shared/utils";

@injectable()
export class SignInUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  public async execute(
    data: TSignInUpSchema,
    ctx?: TMonitoringParams
  ): Promise<TSignInResponseDTO | null> {
    try {
      const maskedData = maskSensitiveData(data);
      logger.debug(
        { ctx },
        `sign up request received for email: ${maskedData.email}`
      );
      const response = await this.userRepository.signIn(data, {
        ...ctx,
        payload: data,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
