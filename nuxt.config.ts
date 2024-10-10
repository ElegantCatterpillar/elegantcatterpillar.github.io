export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  css: [
    '~/assets/css/main.css',
  ],
  colorMode: {
    classSuffix: ''
  }
})