<script setup>
const isSmallScreen = ref(false);

// Usar useWindowSize de @vueuse/core si es posible para mejor manejo
const updateScreenSize = () => {
  isSmallScreen.value = process.client && window.innerWidth < 800;
};

onMounted(() => {
  if (process.client) {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener("resize", updateScreenSize);
  }
});
</script>

<template>
  <div class="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-7xl">
    <div class="mx-auto my-4 w-full">
      <!-- Pantallas grandes -->
      <div v-if="!isSmallScreen" class="flex flex-row items-center justify-center gap-4">
        <ClientOnly>
          <ColorModeButton />
          <Nav />
          <LocaleButton />
        </ClientOnly>
      </div>

      <!-- Pantallas pequeñas -->
      <div v-else class="flex flex-col items-center justify-center gap-4">
        <Nav />
        <div class="flex flex-row gap-4">
          <ClientOnly>
            <ColorModeButton />
            <LocaleButton />
          </ClientOnly>
        </div>
      </div>
    </div>
  </div>
</template>