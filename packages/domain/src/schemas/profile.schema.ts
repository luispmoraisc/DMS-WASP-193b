import { z } from "zod";

export const updateProfileSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  fullName: z.string().nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
  storageUsed: z.bigint(),
  storageLimit: z.bigint(),
  createdAt: z.iso.datetime().nullable().optional(),
  updatedAt: z.iso.datetime().nullable().optional(),
});

export type TUpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export type TUpdateProfileResponseDTO = {
  id: string;
}
