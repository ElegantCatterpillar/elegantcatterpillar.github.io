<template>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">Bienvenido a Nuxt con Tailwind y Color Mode</h1>
      <ColorModeToggle />
      <h1 class="text-3xl font-bold mb-4">Internalización con i18n</h1>
      <p>{{ $t('welcome') }}</p>
      <LocaleToggle />
    </div>
  </template>
  
  <script setup>
  import ColorModeToggle from '~/components/ColorModeToggle.vue'
  import LocaleToggle from '~/components/LocaleToggle.vue'
  </script>