import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://jqfulgnmwspsvbooutjq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxZnVsZ25td3Nwc3Zib291dGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NTIxODYsImV4cCI6MjA2OTAyODE4Nn0.yrPahhl0BfVyOoTVUfm8SZH6Hh7I2ERUCAlSWRretqI';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
