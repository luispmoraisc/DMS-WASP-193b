import { z } from "zod";

export const processFileSchema = z.object({
  id: z.uuid(),
  mymeType: z.string(),
  s3Key: z.string(),
  userId: z.uuid(),
});

export type TProcessFileSchema = z.infer<typeof processFileSchema>;
