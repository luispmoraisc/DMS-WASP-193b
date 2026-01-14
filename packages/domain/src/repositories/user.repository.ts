import type { TMonitoringParams } from "@dms/shared/logger";
import { TSession } from "../entities";
import { TMeSchema, TSignInSchema, TSignInUpSchema } from "../schemas";

export interface IUserRepository {
  /**
   * SignUp user
   * @param data {TSignInUpSchema}
   * @param ctx {any}
   * @returns
   */
  signUp: (data: TSignInUpSchema, ctx?: TMonitoringParams) => Promise<void>;

  /**
   * SignIn user
   * @param data {TSignInUpSchema}
   * @param ctx {any}
   * @returns
   */
  signIn: (
    data: TSignInSchema,
    ctx?: TMonitoringParams
  ) => Promise<TSession | null>;

  /**
   * Me - get current user session
   * @param ctx {any}
   * @returns
   */
  me: (data: TMeSchema, ctx?: TMonitoringParams) => Promise<TSession | null>;
}
