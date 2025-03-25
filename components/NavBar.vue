<script setup>
// Estado para manejar el tamaño de la pantalla
const isSmallScreen = ref(false);

// Función para actualizar el estado del tamaño de la pantalla
function updateScreenSize() {
  isSmallScreen.value = window.innerWidth < 640; // 640px es el breakpoint "sm" de Tailwind
}

// Escuchar cambios en el tamaño de la pantalla
onMounted(() => {
  updateScreenSize(); // Actualizar al montar el componente
  window.addEventListener("resize", updateScreenSize); // Escuchar cambios de tamaño
});

// Limpiar el listener al desmontar el componente
onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});
</script>

<template>
  <div
    class="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl"
  >
    <div class="mx-auto my-4 w-full">
      <!-- Diseño para pantallas grandes -->
      <div
        v-if="!isSmallScreen"
        class="flex flex-row items-center justify-center gap-4"
      >
        <ColorModeButton />
        <Nav />
        <LocaleButton />
      </div>

      <!-- Diseño para pantallas pequeñas -->
      <div
        v-if="isSmallScreen"
        class="flex flex-col items-center justify-center gap-4"
      >
        <Nav />
        <div class="flex flex-row gap-4">
          <ColorModeButton />
          <LocaleButton />
        </div>
      </div>
    </div>
  </div>
</template>
