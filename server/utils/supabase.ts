import { createClient } from "@supabase/supabase-js";
import { defineNuxtPlugin } from "nuxt/app";

// These will be replaced with actual values from your Supabase project
const supabaseUrl =
  process.env.SUPABASE_URL || "https://efaxlllzdvorfkjquobt.supabase.co";
const supabaseKey =
  process.env.SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmYXhsbGx6ZHZvcmZranF1b2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwODMxMDcsImV4cCI6MjA1NzY1OTEwN30.ohi-uEVG_F1Cj9KN3hEKU13OhUItpP24aQ2PFTYjw7s";

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      supabase: supabaseClient,
    },
  };
});
