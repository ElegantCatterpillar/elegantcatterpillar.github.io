<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

defineProps({
  as: {
    type: String,
    default: "button",
  },
  rounded: {
    type: Boolean,
    default: false,
  },
  animate: {
    type: Boolean,
    default: true,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  cover: {
    type: Boolean,
    default: false,
  },
  noRoundContent: {
    type: Boolean,
    default: false
  }
});

const buttonRef = ref(null);
</script>

<template>
  <component
    :is="as"
    ref="buttonRef"
    :class="`group relative inline-flex items-center overflow-hidden transition ${
      rounded && !noRoundContent ? 'rounded-full' : noRoundContent ? 'rounded-none' : 'rounded-md px-8'
    } ${transparent ? '' : 'bg-zinc-100 dark:bg-zinc-800'} ${
      cover ? 'p-0' : ''
    }`"
  >
    <!-- Animación del gradiente -->
    <div
      v-if="animate"
      class="absolute inset-0 flex items-center [container-type:inline-size]"
    >
      <!-- Modo claro -->
      <div
        class="absolute size-[100cqw] animate-spin opacity-0 transition duration-100 group-hover:opacity-100 bg-[conic-gradient(from_0_at_50%_50%,rgba(0,0,0,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(0,0,0,0.5)_360deg)] dark:hidden"
        :style="{
          animationDuration: '2s',
        }"
      />
      <!-- Modo oscuro -->
      <div
        class="absolute size-[100cqw] animate-spin opacity-0 transition duration-100 group-hover:opacity-100 bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] hidden dark:block"
        :style="{
          animationDuration: '2s',
        }"
      />
    </div>

    <!-- Capa intermedia -->
    <div
      class="absolute inset-0.5 bg-zinc-50 sm:bg-zinc-50/80 sm:backdrop-blur-md dark:bg-zinc-900 dark:sm:bg-zinc-900/80"
      :class="`${transparent ? '' : 'bg-zinc-100 dark:bg-zinc-800'} ${
        rounded ? 'rounded-full' : 'rounded-md'
      }`"
    />

    <!-- Sombra/reflejo -->
    <div
      class="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 bg-black/10 opacity-50 blur-md transition-all duration-100 group-hover:h-2/3 group-hover:opacity-100 dark:bg-white/10"
      :class="rounded ? 'rounded-full' : 'rounded-md'"
    />

    <!-- Contenido -->
    <div
      class="relative z-10 text-black dark:text-white transition-colors duration-100 group-hover:text-black dark:group-hover:text-white w-full h-full"
      :class="cover ? 'flex items-center justify-center' : 'px-2'"
    >
      <slot />
    </div>
  </component>
</template>
