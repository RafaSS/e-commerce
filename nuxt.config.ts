// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
  ],
  shadcn: {
    /**
     * Prefix for all the imported components
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    supabaseKey: process.env.SUPABASE_KEY,
    // Keys within public are also exposed client-side
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
    },
  },
  i18n: {
    locales: [
      { code: "pt", iso: "pt-BR", file: "pt.json", name: "Português" },
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
    ],
    defaultLocale: "pt",
    strategy: "prefix_except_default",
    lazy: true,
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: false,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
});
