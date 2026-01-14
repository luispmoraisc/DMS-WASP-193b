import { ProfileEntity } from "@dms/domain/entities";
import type { TSignInUpSchema } from "@dms/domain/schemas";

export class PrismaProfileMapper {
  static toDomain(raw: any): ProfileEntity {
    return new ProfileEntity({
      id: raw.id,
      fullName: raw.fullName,
      email: raw.email,
      storageLimit: raw.storageLimit,
      storageUsed: raw.storageUsed,
      avatarUrl: raw.avatarUrl,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(domain: TSignInUpSchema) {
    return {
      email: domain.email,
    };
  }
}
