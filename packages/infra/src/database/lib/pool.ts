import { Pool } from "pg";
import z from "zod";

const configPoolSchema = z.object({
  DATABASE_URL: z.string().nonempty("DATABASE_URL is required"),
  DATABASE_PASSWORD: z.string().optional(),
});

export const createPool = () => {
  const config = configPoolSchema.parse(process.env);
  const connectionString = config.DATABASE_URL;
  const password = config.DATABASE_PASSWORD;

  return new Pool({
    connectionString,
    password,
  });
};
