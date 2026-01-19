import type { TProcessFileSchema } from "@dms/domain/schemas";
import { type Logger, type TMonitoringParams } from "@dms/shared/logger";
import { inject, injectable } from "tsyringe";

@injectable()
export class ProcessFileUseCase {
  constructor(@inject("Logger") private logger: Logger) {}

  public async execute(
    data: TProcessFileSchema,
    ctx?: TMonitoringParams
  ): Promise<void> {
    try {
      this.logger.info(
        { ctx },
        `process file request received for user id: ${data.id}`
      );
    } catch (error) {
      throw error;
    }
  }
}
