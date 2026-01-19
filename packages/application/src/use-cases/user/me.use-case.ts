import type { IUserRepository } from "@dms/domain/repositories";
import type { TMeSchema, TSignInResponseDTO } from "@dms/domain/schemas";
import { type Logger, type TMonitoringParams } from "@dms/shared/logger";
import { inject, injectable } from "tsyringe";

@injectable()
export class MeUseCase {
  constructor(
    @inject("Logger") private logger: Logger,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  public async execute(
    data: TMeSchema,
    ctx?: TMonitoringParams
  ): Promise<TSignInResponseDTO | null> {
    try {
      const response = await this.userRepository.me(data, {
        ...ctx,
        payload: data,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
