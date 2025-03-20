<template>
  <img
    :src="logoPath"
    alt="Logo"
    class="w-auto h-128"
  />
</template>

<script setup>
import FirmaCompletaWhite from "~/assets/images/FirmaCompletaWhite.svg";
import FirmaCompletaBlack from "~/assets/images/FirmaCompletaBlack.svg";

// Usamos useColorMode para detectar el tema actual
const colorMode = useColorMode();

// Calculamos la ruta del logo según el tema
const logoPath = computed(() => {
  return colorMode.value === "dark" ? FirmaCompletaWhite : FirmaCompletaBlack;
});
</script>
