<script setup>
import { useMouseInElement } from "@vueuse/core";

const card = ref();
const { elementX, elementY } = useMouseInElement(card);

const spotlightConfig = {
  size: 300,
  mode: "before",
};
</script>

<template>
  <div
    ref="card"
    class="relative rounded-lg overflow-hidden transform-gpu bg-zinc-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 group"
    :style="{
      '--x': `${elementX}px`,
      '--y': `${elementY}px`,
      '--spotlight-size': `${spotlightConfig.size}px`,
    }"
  >
    <!-- Efecto principal (invertido por tema) -->
    <div
      class="absolute inset-0 pointer-events-none"
      :class="{
        'before:absolute before:inset-0 before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),rgba(0,0,0,0.75)_0%,transparent_70%)] dark:before:bg-[radial-gradient(var(--spotlight-size)_circle_at_var(--x)_var(--y),rgba(255,255,255,0.25)_0%,transparent_70%)]':
          spotlightConfig.mode === 'before',
      }"
    />

    <!-- Efecto de iluminación ambiental (invertido) -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :class="{
        'bg-[radial-gradient(200%_200%_at_var(--x)_var(--y),rgba(0,0,0,0.03)_0%,transparent_100%)]': true,
        'dark:bg-[radial-gradient(200%_200%_at_var(--x)_var(--y),rgba(255,255,255,0.03)_0%,transparent_100%)]': true,
      }"
    />

    <!-- Fondo base (sin cambios en hover) -->
    <div
      class="absolute inset-px rounded-lg bg-zinc-50/95 backdrop-blur-md dark:bg-neutral-900/80"
    />

    <!-- Contenido -->
    <div class="relative z-10 flex h-full flex-col">
      <slot />
    </div>
  </div>
</template>
