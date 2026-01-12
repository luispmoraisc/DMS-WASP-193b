import { Pool } from "pg";
import z from "zod";

const configPoolSchema = z.object({
  connectionString: z.string().nonempty("DATABASE_URL is required"),
  password: z.string().optional(),
});

export const createPool = () => {
  const config = configPoolSchema.parse(process.env);
  const connectionString = config.connectionString;
  const password = config.password;

  return new Pool({
    connectionString,
    password,
  });
};
