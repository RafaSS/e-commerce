// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/supabase",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "shadcn-nuxt",
  ],

  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },

  shadcn: {
    /**
     * Prefix for component name
     */
    prefix: "",
    /**
     * Directory that the components are located in
     */
    componentDir: "./components/ui",
    /**
     * Whether to generate types for the components
     */
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
    },
  },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/auth/login",
      callback: "/auth/confirm",
      exclude: ["/", "/products/*", "/cart"],
    },
  },

  app: {
    head: {
      title: "ShopEase - Your Modern E-Commerce Solution",
      meta: [
        {
          name: "description",
          content: "A sleek and modern e-commerce application",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  compatibilityDate: "2025-03-27",
});
