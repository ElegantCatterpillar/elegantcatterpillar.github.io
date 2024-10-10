import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@primevue/nuxt-module",
  ],
  css: ["~/assets/css/main.css"],
  colorMode: {
    classSuffix: "",
  },
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: ".dark", // Usar la clase 'dark' de Tailwind CSS
          cssLayer: {
              name: 'primevue',
              order: 'tailwind-base, primevue, tailwind-utilities'
          }
        },
      },
      ripple: true,
    },
    autoImport: true,
  },
});
