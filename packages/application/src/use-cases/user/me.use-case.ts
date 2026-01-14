import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "@dms/domain/repositories";
import { type TMonitoringParams } from "@dms/shared/logger";
import type { TMeSchema, TSignInResponseDTO } from "@dms/domain/schemas";

@injectable()
export class MeUseCase {
  constructor(
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
