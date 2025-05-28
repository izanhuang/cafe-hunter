import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const { supabaseUrl, supabaseAnonKey } = Constants.manifest?.extra || {};

if (!supabaseAnonKey) {
  throw new Error("SUPABASE_KEY is not defined in the environment variables.");
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
