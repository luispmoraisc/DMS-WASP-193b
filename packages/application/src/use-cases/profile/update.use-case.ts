import type { IProfileRepository } from "@dms/domain/repositories";
import type {
  TUpdateProfileResponseDTO,
  TUpdateProfileSchema,
} from "@dms/domain/schemas";
import { type Logger, type TMonitoringParams } from "@dms/shared/logger";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateProfileUseCase {
  constructor(
    @inject("Logger") private logger: Logger,
    @inject("ProfileRepository") private profileRepository: IProfileRepository
  ) {}

  public async execute(
    data: TUpdateProfileSchema,
    ctx?: TMonitoringParams
  ): Promise<TUpdateProfileResponseDTO> {
    try {
      this.logger.info(
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
