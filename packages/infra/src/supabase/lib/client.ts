import { createClient } from "@supabase/supabase-js";
import "dotenv/config";
import z from "zod";

const supabaseConfigSchema = z.object({
  SUPABASE_URL: z.string().nonempty("SUPABASE_URL is required"),
  SUPABASE_ANON_KEY: z.string().nonempty("SUPABASE_ANON_KEY is required"),
});

const client = () => {
  const config = supabaseConfigSchema.parse(process.env);

  return createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: {
      storage: undefined,
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export const supabaseClient = client();
