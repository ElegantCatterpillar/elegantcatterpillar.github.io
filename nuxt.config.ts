import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@primevue/nuxt-module",
    "@nuxtjs/i18n"
  ],

  plugins: ["~/plugins/Vue3Lottie.client.ts"],

  css: [
    "~/assets/css/main.css",
  ],

  colorMode: {
    classSuffix: "",
    storage: "cookie",
    storageKey: "user-theme",
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".dark", // Usar la clase 'dark' de Tailwind CSS
          cssLayer: {
            name: "primevue",
            order: "primevue, tailwind-utilities, tailwind-base",
          },
        },
      },
      ripple: true,
    },
    autoImport: true,
  },

  i18n: {
    defaultLocale: "es", // Idioma predeterminado
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "user_language",
      cookieSecure: process.env.NODE_ENV === "production",
      cookieCrossOrigin: true
    },
    lazy: true,
    bundle: {
      optimizeTranslationDirective: false
    },
    langDir: "locales",
    locales: [
      {
        code: "en",
        name: "English",
        dir: "auto",
        language: "en-US",
        flag: "US",
        file: "en.json",
      },
      {
        code: "es",
        name: "Español",
        dir: "auto",
        language: "es-MX",
        flag: "MX",
        file: "es.json",
      },
    ]
  },

  compatibilityDate: "2024-10-21",
});