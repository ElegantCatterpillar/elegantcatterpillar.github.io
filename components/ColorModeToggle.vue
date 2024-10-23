<template>
  <div class="flex items-center gap-4">
    <!-- Botón existente con estado disabled -->
    <!-- <Button
      @click="toggleColorMode"
      :disabled="isAnimating"
      label="Toggle Mode"
      class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <template #icon>
        <span v-if="colorMode.preference === 'light'">🌙</span>
        <span v-else>☀️</span>
      </template>
    </Button> -->

    <!-- Dropdown con iconos personalizados y evento para ejecutar el toggle -->
    <Select
      v-model="selectedTheme"
      :disabled="isAnimating"
      :placeholder="$t('selectTheme')"
      :options="optionsColors"
      optionValue="value"
      optionLabel="label"
      @change="selectColorMode"
      class="rounded-md bg-white text-gray-800 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <template #value="slotProps">
        <span v-if="slotProps.value === 'light'">☀️ {{ $t("light") }}</span>
        <span v-else-if="slotProps.value === 'dark'">🌙 {{ $t("dark") }}</span>
        <span v-else>🖥️ System</span>
      </template>
      <template #option="slotProps">
        <div class="flex gap-2">
          <span v-if="slotProps.option.value === 'light'">☀️</span>
          <span v-else-if="slotProps.option.value === 'dark'">🌙</span>
          <span v-else>🖥️</span>
          {{ $t(slotProps.option.value) }}
        </div>
      </template>
      <template #header>
        <div class="font-medium p-3">{{ $t("availableThemes") }}</div>
      </template>
    </Select>

    <!-- Contenedor de animaciones -->
    <div v-if="showAnimation" class="animation-container">
      <!-- Animación Lottie -->
      <client-only>
        <div v-if="showLottie" class="lottie-animation">
          <Vue3Lottie
            :animationData="lottieThemeChanged"
            :height="200"
            :width="200"
            :loop="false"
            :autoPlay="true"
            :speed="1"
          />
        </div>
      </client-only>
      <!-- Efecto splash -->
      <div class="paint-splash" :class="{ dark: isDarkMode }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import lottieThemeChanged from "~/assets/lotties/changeTheme.json";

const colorMode = useColorMode();
const selectedTheme = ref(colorMode.preference);
const isAnimating = ref(false);
const showLottie = ref(false);

const optionsColors = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

const showAnimation = ref(false);
const isDarkMode = ref(colorMode.value === "dark");

const toggleColorMode = () => {
  const theme = colorMode.preference === "light" ? "dark" : "light";
  changeTheme(theme);
};

const selectColorMode = ({ originalEvent, value }) => {
  originalEvent.preventDefault();

  // Cambia el tema basado en la selección
  changeTheme(value);
};

const changeTheme = (theme) => {
  if (isAnimating.value || !theme || theme === colorMode.preference) return;

  isAnimating.value = true;
  showAnimation.value = true;
  showLottie.value = true;

  // Ocultar Lottie antes del splash
  setTimeout(() => {
    showLottie.value = false;
  }, 1000);

  // Cambio de tema cerca del final de la animación
  setTimeout(() => {
    colorMode.preference = theme;
    isDarkMode.value = theme === "dark";
  }, 1300);

  // Ocultar animaciones
  setTimeout(() => {
    showAnimation.value = false;
    isAnimating.value = false;
  }, 1500);
};
</script>

<style>
body {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.animation-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  z-index: 9999;
}

.lottie-animation {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 53%;
  opacity: 1;
  transition: opacity 0.3s ease-out;
  z-index: 10000;
}

.paint-splash {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  background-color: #1a202c;
  border-radius: 50%;
  opacity: 0;
  animation: splash 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.35s forwards;
  will-change: transform, opacity;
}

.paint-splash.dark {
  background-color: #f7fafc;
}

@keyframes splash {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  85% {
    opacity: 0.6;
  }

  100% {
    transform: translate(-50%, -50%) scale(300);
    opacity: 0;
  }
}
</style>
