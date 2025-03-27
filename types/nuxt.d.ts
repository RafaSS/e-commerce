// Global type declarations for Nuxt auto-imports
import { Store } from "pinia";

// Declare Vue & Nuxt auto-imported composables
declare global {
  const ref: typeof import("vue")["ref"];
  const computed: typeof import("vue")["computed"];
  const onMounted: typeof import("vue")["onMounted"];
  const useRoute: typeof import("vue-router")["useRoute"];
  const useRouter: typeof import("vue-router")["useRouter"];
  const useToast: () => {
    add: (config: {
      title?: string;
      description: string;
      type?: string;
      duration?: number;
    }) => void;
  };
  const useSupabaseUser: () => any;
  const useSupabaseClient: () => any;
  const navigateTo: (
    to: string | { path?: string; query?: Record<string, string> }
  ) => Promise<void>;
}

// Declare module augmentations
declare module "#app" {
  interface NuxtApp {
    $toast: ReturnType<typeof useToast>;
  }
}

export {};
