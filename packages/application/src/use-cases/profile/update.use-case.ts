import { inject, injectable } from "tsyringe";
import type { IProfileRepository } from "@dms/domain/repositories";
import { logger, type TMonitoringParams } from "@dms/shared/logger";
import type {
  TUpdateProfileSchema,
  TUpdateProfileResponseDTO,
} from "@dms/domain/schemas";

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject("ProfileRepository") private profileRepository: IProfileRepository
  ) {}

  public async execute(
    data: TUpdateProfileSchema,
    ctx?: TMonitoringParams
  ): Promise<TUpdateProfileResponseDTO> {
    try {
      logger.info(
        { ctx },
        `change profile request received for user id: ${data.id}`
      );
      const response = await this.profileRepository.updateProfile(data, {
        ...ctx,
        payload: data,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
