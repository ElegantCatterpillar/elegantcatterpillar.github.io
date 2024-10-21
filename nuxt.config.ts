import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@primevue/nuxt-module",
    "@nuxtjs/i18n",
  ],

  css: ["~/assets/css/main.css"],

  colorMode: {
    classSuffix: "",
    storage: "cookie",
    storageKey: "user-theme"
  },

  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".dark", // Usar la clase 'dark' de Tailwind CSS
          cssLayer: {
              name: 'primevue',
              order: 'primevue, tailwind-utilities, tailwind-base'
          }
        },
      },
      ripple: true,
    },
    autoImport: true,
  },

  i18n: {
    vueI18n: './locales/i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'user_language',
      redirectOn: 'root',
      cookieSecure: true
    }
  },

  compatibilityDate: "2024-10-21"
});