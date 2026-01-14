import { TSession } from "@dms/domain/entities";
import type { TSignInUpSchema } from "@dms/domain/schemas";

export class SupabaseUserMapper {
  static toDomain(raw: any): TSession {
    return {
      access_token: raw.access_token,
      refresh_token: raw.refresh_token,
    };
  }

  static toPersistence(domain: TSignInUpSchema) {
    return {
      email: domain.email,
      password: domain.password,
    };
  }
}
