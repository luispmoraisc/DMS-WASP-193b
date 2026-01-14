import { z } from "zod";

export const signInUpSchema = z.object({
  fullName: z.string().min(2).max(100).optional(),
  email: z.email(),
  password: z.string().min(8).max(128),
});

export type TSignInUpSchema = z.infer<typeof signInUpSchema>;

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});

export type TSignInSchema = z.infer<typeof signInSchema>;

export type TSignInResponseDTO = {
  access_token: string;
  refresh_token: string;
};

export const meSchema = z.object({
  access_token: z.string(),
});

export type TMeSchema = z.infer<typeof meSchema>;
