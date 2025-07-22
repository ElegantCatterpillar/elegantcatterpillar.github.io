<template>
  <ClientOnly>
    <img
      :src="logoPath"
      alt="Logo"
      aria-label="Logo"
      class="w-auto h-32"
    />
  </ClientOnly>
</template>

<script setup>
import FirmaCompletaWhite from "~/public/images/FirmaProWhite.svg";
import FirmaCompletaBlack from "~/public/images/FirmaProBlack.svg";

// Usamos useColorMode para detectar el tema actual
const colorMode = useColorMode();

// Calculamos la ruta del logo según el tema
const logoPath = computed(() => {
  
  return colorMode.value === "dark" ? FirmaCompletaWhite : FirmaCompletaBlack;
});
</script>
