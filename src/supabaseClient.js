// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ilshgtinlmwjznhaymry.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlsc2hndGlubG13anpuaGF5bXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NTU0OTcsImV4cCI6MjA3NzMzMTQ5N30.jyCPmXQclROfHZ_Zj_E5aU3KIFQ8xgdseQmma2umSe0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
