import type { TMonitoringParams } from "@dms/shared/logger";

export interface IProfileRepository {
  /**
   * Update upser profile
   * @param data
   * @param ctx
   */
  updateProfile(data: any, ctx?: TMonitoringParams): Promise<any>;
}
