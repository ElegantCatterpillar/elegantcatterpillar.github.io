<template>
  <div class="flex justify-center items-center p-4">
    <!-- SpotlightButton que contiene los botones de tema -->
    <SpotlightButton rounded transparent class="border border-white/10">
      <nav
        class="z-10 flex h-[50px] justify-around gap-1 p-1 transition-all duration-100 ease-in-out sm:h-[45px] sm:hover:gap-2"
      >
        <!-- Tema LIGHT -->
        <div class="flex flex-col items-center relative">
          <Button
            icon="pi pi-sun"
            class="px-4 py-2"
            :class="{
              'dark:bg-zinc-900/50 text-dark border border-black/5 shadow-2xl':
                selectedTheme === 'light',
              'hover:bg-gray-200 hover:border-black/5 hover:text-dark/75 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-white/10':
                selectedTheme !== 'light',
            }"
            @click="changeTheme('light')"
          />

          <!-- Línea simulada -->
          <div
            v-if="selectedTheme === 'light'"
            class="absolute bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
          ></div>
        </div>

        <!-- Tema AUTO -->
        <div class="flex flex-col items-center relative">
          <Button
            icon="pi pi-desktop"
            class="px-4 py-2"
            :class="{
              'dark:bg-zinc-900/50 text-white border border-black/5 shadow-2xl':
                selectedTheme === 'system',
              'hover:bg-gray-200 hover:border-black/5 hover:text-dark/75 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-white/10':
                selectedTheme !== 'system',
            }"
            @click="changeTheme('system')"
          />

          <!-- Línea simulada -->
          <div
            v-if="selectedTheme === 'system'"
            class="absolute bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
          ></div>
        </div>

        <!-- Tema DARK -->
        <div class="flex flex-col items-center relative">
          <Button
            icon="pi pi-moon"
            class="px-4 py-2"
            :class="{
              'dark:bg-zinc-900/50 text-white border border-black/5 shadow-2xl':
                selectedTheme === 'dark',
              'hover:bg-gray-200 hover:border-black/5 hover:text-dark/75 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-white/10':
                selectedTheme !== 'dark',
            }"
            @click="changeTheme('dark')"
          />

          <!-- Línea simulada -->
          <div
            v-if="selectedTheme === 'dark'"
            class="absolute bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
          ></div>
        </div>
      </nav>
    </SpotlightButton>

    <!-- Animación de cambio de tema -->
    <div
      v-if="showAnimation"
      class="fixed inset-0 flex justify-center items-center z-50"
    >
      <Vue3Lottie
        :animationData="lottieThemeChanged"
        :height="200"
        :width="200"
        :loop="false"
        :autoPlay="true"
        class="absolute"
      />
      <div
        class="absolute w-2 h-2 rounded-full bg-black dark:bg-white animate-expand"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import lottieThemeChanged from "~/assets/lotties/changeTheme.json";
import Button from "primevue/button";

const colorMode = useColorMode();
const selectedTheme = ref(colorMode.preference);
const showAnimation = ref(false);

const changeTheme = (theme) => {
  if (theme === colorMode.preference) return;

  showAnimation.value = true;

  setTimeout(() => {
    colorMode.preference = theme;
    selectedTheme.value = theme;
  }, 1000);

  setTimeout(() => {
    showAnimation.value = false;
  }, 1500);
};

// Sincronizar cambios en el tema
watch(
  () => colorMode.preference,
  (newTheme) => {
    selectedTheme.value = newTheme;
  }
);
</script>

<style>
@keyframes expand {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(200);
    opacity: 0;
  }
}

.animate-expand {
  animation: expand 1.2s ease-out forwards;
}
</style>
