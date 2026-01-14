import { inject, injectable } from "tsyringe";
import { maskSensitiveData } from "@dms/shared/utils";
import type { IUserRepository } from "@dms/domain/repositories";
import type { Logger, TMonitoringParams } from "@dms/shared/logger";
import type {
  TMeSchema,
  TSignInSchema,
  TSignInUpSchema,
} from "@dms/domain/schemas";

import { SupabaseUserCatalog } from "../catalogs/supabase-user.catalog";
import { SupabaseUserMapper } from "../mappers/supabase-user.mapper";
import { SupabaseErrorTranslator } from "../translator";
import { supabaseClient } from "../lib/client";
import {
  supabaseSignUpsCounter,
  supabaseSignInsCounter,
} from "../metrics/supabase.metrics";

@injectable()
export class SupabaseUserRepository implements IUserRepository {
  constructor(@inject("Logger") private logger: Logger) {}

  async signUp(payload: TSignInUpSchema, ctx?: TMonitoringParams) {
    try {
      const maskedData = maskSensitiveData(payload);
      this.logger.info(`Sign up user for email: ${maskedData.email}`);
      const { data, error } = await supabaseClient.auth.signUp({
        email: payload.email,
        password: payload.password,
        options: {
          emailRedirectTo: "http://localhost:3001/dashboard",
          data: {
            full_name: payload.fullName,
          },
        },
      });

      if (error || !data.user) {
        throw error;
      }

      supabaseSignUpsCounter.inc({
        status: "success",
        repo: "SupabaseUserRepository",
      });

      return;
    } catch (error) {
      throw SupabaseErrorTranslator.translateAndLog({
        error,
        catalog: SupabaseUserCatalog,
        ctx: {
          ...ctx,
          repo: "SupabaseUserRepository",
          op: "signUp",
          traceId: ctx?.traceId,
          payload: maskSensitiveData(ctx?.payload),
          codeLevels: {},
        },
      });
    }
  }

  async signIn(payload: TSignInSchema, ctx?: TMonitoringParams) {
    try {
      const maskedData = maskSensitiveData(payload);
      this.logger.info(`Sign in user for email: ${maskedData.email}`);
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: payload.email,
        password: payload.password,
      });

      if (error || !data.session) {
        throw SupabaseErrorTranslator.translateAndLog({
          error,
          catalog: SupabaseUserCatalog,
          ctx: {
            ...ctx,
            repo: "SupabaseUserRepository",
            op: "signIn",
            traceId: ctx?.traceId,
            payload: maskSensitiveData(ctx?.payload),
            codeLevels: {},
          },
        });
      }

      supabaseSignInsCounter.inc({
        status: "success",
        repo: "SupabaseUserRepository",
      });

      return SupabaseUserMapper.toDomain(data.session);
    } catch (error) {
      throw SupabaseErrorTranslator.translateAndLog({
        error,
        catalog: SupabaseUserCatalog,
        ctx: {
          ...ctx,
          repo: "SupabaseUserRepository",
          op: "signUp",
          traceId: ctx?.traceId,
          payload: maskSensitiveData(ctx?.payload),
          codeLevels: {},
        },
      });
    }
  }

  async me(data: TMeSchema, ctx?: TMonitoringParams) {
    try {
      this.logger.debug("Fetching current user session");
      const { data: userData, error } = await supabaseClient.auth.getUser(
        data.access_token
      );

      if (error) {
        throw error;
      }

      if (userData.user) {
        return SupabaseUserMapper.toDomain(userData);
      }
      return null;
    } catch (error) {
      throw SupabaseErrorTranslator.translateAndLog({
        error,
        catalog: SupabaseUserCatalog,
        ctx: {
          ...ctx,
          repo: "SupabaseUserRepository",
          op: "me",
          traceId: ctx?.traceId,
          payload: maskSensitiveData(ctx?.payload),
          codeLevels: {},
        },
      });
    }
  }
}
