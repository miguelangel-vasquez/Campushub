import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Pega aquí los datos de TU proyecto (Project Settings > API)
const SUPABASE_URL = "https://lmtsrvssblgthuvgkdla.supabase.co";
const SUPABASE_KEY = "sb_publishable_PzyRBji3Uj8BnG9nZcKjeg_pWv3km8b"; // publishable (o anon). NUNCA la service_role / secret

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
