<template>
  <div class="flex justify-center items-center">
    <!-- Botones de selección de tema -->
    <SpotlightButton rounded transparent class="border dark:border-white/15 border-black/15">
      <div
        class="z-10 flex h-[50px] justify-around gap-1 p-1 transition-all duration-100 ease-in-out sm:h-[45px] sm:hover:gap-2"
      >
        <!-- Tema Light -->
        <div class="flex flex-col items-center relative">
          <Button
            icon="pi pi-sun"
            @click="startThemeTransition('light')"
            class="px-4 py-2"
            :class="{
              'dark:bg-zinc-900/50 text-dark border border-black/5 shadow-2xl':
                selectedTheme === 'light',
              'hover:bg-gray-200 hover:border-black/5 hover:text-dark/75 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-white/10':
                selectedTheme !== 'light',
            }"
            v-tooltip.bottom="$t('temaLight')"
          />
          <div
            v-if="selectedTheme === 'light'"
            class="absolute bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
          ></div>
        </div>

        <!-- Tema System -->
        <div class="flex flex-col items-center relative">
          <Button
            icon="pi pi-desktop"
            @click="startThemeTransition('system')"
            class="px-4 py-2"
            :class="{
              'dark:bg-zinc-900/50 text-white border border-black/5 shadow-2xl':
                selectedTheme === 'system',
              'hover:bg-gray-200 hover:border-black/5 hover:text-dark/75 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-white/10':
                selectedTheme !== 'system',
            }"
            v-tooltip.bottom="$t('temaSistema')"
          />
          <div
            v-if="selectedTheme === 'system'"
            class="absolute bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
          ></div>
        </div>

        <!-- Tema Dark -->
        <div class="flex flex-col items-center relative">
          <Button
            icon="pi pi-moon"
            @click="startThemeTransition('dark')"
            class="px-4 py-2"
            :class="{
              'dark:bg-zinc-900/50 text-white border border-black/5 shadow-2xl':
                selectedTheme === 'dark',
              'hover:bg-gray-200 hover:border-black/5 hover:text-dark/75 dark:hover:bg-gray-800 dark:hover:text-white dark:hover:border-white/10':
                selectedTheme !== 'dark',
            }"
            v-tooltip.bottom="$t('temaOscuro')"
          />
          <div
            v-if="selectedTheme === 'dark'"
            class="absolute bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
          ></div>
        </div>
      </div>
    </SpotlightButton>

    <!-- Animación Lottie teleportada al body -->
    <teleport to="body">
      <Transition name="lottie-fade">
        <div v-if="showAnimation" class="lottie-global-container">
          <Vue3Lottie
            :animationData="lottieThemeChanged"
            :height="150"
            :width="150"
            :loop="false"
            :autoPlay="true"
            :rendererSettings="{
              preserveAspectRatio: 'xMidYMid slice',
              clearCanvas: true,
            }"
          />
        </div>
      </Transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Vue3Lottie } from "vue3-lottie";
import lottieThemeChanged from "~/public/lotties/changeTheme.json";

const colorMode = useColorMode();
const selectedTheme = ref(colorMode.preference);
const showAnimation = ref(false);

// Función para detectar el tema actual del sistema
const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const changeTheme = (theme) => {
  colorMode.preference = theme;
  selectedTheme.value = theme;
};

const startThemeTransition = async (theme) => {
  // Determinar si realmente hay un cambio de tema
  let actualThemeChange = false;

  if (theme === "system") {
    const systemTheme = getSystemTheme();
    // Si el tema actual ya coincide con el tema del sistema, no hay cambio real
    if (colorMode.value === systemTheme) {
      // Solo actualizamos la preferencia sin animación
      changeTheme(theme);
      return;
    }
    actualThemeChange = true;
  } else {
    // Para temas light/dark, solo animar si es diferente al actual
    actualThemeChange = colorMode.value !== theme;
  }

  if (!actualThemeChange) {
    changeTheme(theme);
    return;
  }

  showAnimation.value = true;

  // Esperar un frame para que Lottie se renderice
  await new Promise((resolve) => requestAnimationFrame(resolve));

  if (!document.startViewTransition) {
    changeTheme(theme);
    setTimeout(() => (showAnimation.value = false), 1200);
    return;
  }

  // Iniciar la transición visual
  document.documentElement.classList.add("theme-transition-active");

  const transition = document.startViewTransition(() => {
    changeTheme(theme);
  });

  try {
    await transition.finished;
  } finally {
    document.documentElement.classList.remove("theme-transition-active");
    showAnimation.value = false;
  }
};

watch(
  () => colorMode.preference,
  (newTheme) => {
    selectedTheme.value = newTheme;
  }
);

// También puedes agregar un listener para cambios en el tema del sistema
if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (colorMode.preference === "system") {
        // No mostrar animación para cambios automáticos del sistema
        changeTheme("system");
      }
    });
}
</script>

<style>
/* Estilo optimizado para Lottie */
.lottie-global-container {
  position: fixed;
  top: 56%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483647;
  pointer-events: none;
  width: 200px;
  height: 200px;
  background: transparent !important;
}

.lottie-global-container canvas {
  display: block;
  background: transparent !important;
  image-rendering: -webkit-optimize-contrast;
}

/* Transición suave */
.lottie-fade-enter-active,
.lottie-fade-leave-active {
  transition: opacity 0.1s ease;
}
.lottie-fade-enter-from,
.lottie-fade-leave-to {
  opacity: 1;
}

/* Transición de expansión desde el centro */
.theme-transition-active::view-transition-group(root) {
  animation-duration: 1.5s;
}

.theme-transition-active::view-transition-new(root) {
  animation-name: theme-expand;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes theme-expand {
  from {
    clip-path: circle(0% at 50% 50%);
    opacity: 1;
  }
  to {
    clip-path: circle(100% at 50% 50%);
    opacity: 1;
  }
}

/* Mejorar rendimiento */
.theme-transition-active::view-transition-old(root) {
  animation: none;
}
</style>
