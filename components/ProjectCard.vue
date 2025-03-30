<template>
  <div
    class="group relative flex flex-col gap-1 overflow-hidden rounded-lg transition-all duration-300"
  >
    <!-- Efecto Spotlight -->
    <div
      class="absolute inset-0 flex items-center [container-type:inline-size]"
    >
      <div
        class="absolute size-[100cqw] animate-spin opacity-0 transition duration-300 group-hover:opacity-30 bg-[conic-gradient(from_0_at_50%_50%,rgba(0,0,0,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(0,0,0,0.5)_360deg)] dark:hidden"
        :style="{ animationDuration: '4s' }"
      />
      <div
        class="absolute size-[100cqw] animate-spin opacity-0 transition duration-300 group-hover:opacity-30 bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] hidden dark:block"
        :style="{ animationDuration: '4s' }"
      />
    </div>

    <!-- Capa base -->
    <div
      class="absolute inset-0 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700"
    />

    <!-- Capa intermedia -->
    <div
      class="absolute inset-0.5 bg-zinc-50/80 backdrop-blur-md dark:bg-zinc-900/80 rounded-[7px]"
    />

    <!-- Contenido principal -->
    <div class="relative z-10 flex flex-col gap-1 p-1">
      <!-- Puntos de control -->
      <div class="flex gap-1 px-1 py-[2px]">
        <div
          class="size-2 rounded-full bg-red-500/90 transition-all duration-300 group-hover:bg-red-500"
        />
        <div
          class="size-2 rounded-full bg-yellow-500/90 transition-all duration-300 group-hover:bg-yellow-500"
        />
        <div
          class="size-2 rounded-full bg-green-500/90 transition-all duration-300 group-hover:bg-green-500"
        />
      </div>

      <!-- Imagen del proyecto -->
      <NuxtLink
        :aria-label="project.name + ' details'"
        :to="`/works/${project.slug}`"
        class="flex h-56 justify-center overflow-hidden rounded-lg"
      >
        <NuxtImg
          :placeholder="img(`${project.image}`)"
          width="1200"
          :alt="project.name + ' project image'"
          class="h-full rounded-lg object-cover transition-all duration-500 group-hover:scale-105"
          :src="project.image"
        />
      </NuxtLink>

      <!-- Pie de tarjeta -->
      <div
        class="absolute bottom-0 left-1/2 w-[calc(100%-16px)] -translate-x-1/2 transform"
      >
        <div
          class="rounded-t-lg border-x border-t border-zinc-200/70 dark:border-zinc-600/50 bg-white/70 dark:bg-zinc-800/70 px-4 py-2 shadow-sm backdrop-blur-md transition-all duration-300 group-hover:bg-white/90 dark:group-hover:bg-zinc-800/90 sm:w-2/3 mx-auto"
        >
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span
                class="whitespace-nowrap text-sm font-semibold text-zinc-800 dark:text-white/90"
              >
                {{ project.name }}
              </span>
              <span
                data-i18n
                class="whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400"
              >
                {{ project.release ? project.date : `${$t("soon")}...` }}
              </span>
            </div>

            <!-- Contenedor de iconos -->
            <div class="flex gap-1">
              <!-- Icono de libro (misma ruta que la imagen) -->
              <NuxtLink
                :aria-label="project.name + ' documentation'"
                :to="`/works/${project.slug}`"
                class="flex size-6 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-700/80 shadow-sm transition-all duration-300 hover:bg-white dark:hover:bg-zinc-600"
              >
                <i
                  class="pi pi-book text-[10px] text-zinc-700 dark:text-white"
                />
              </NuxtLink>

              <!-- Icono de flecha (URL externa) -->
              <NuxtLink
                :aria-label="project.name + ' external link'"
                :to="project.link"
                target="_blank"
                class="flex size-6 items-center justify-center rounded-full bg-white/80 dark:bg-zinc-700/80 shadow-sm transition-all duration-300 hover:-rotate-45 hover:bg-white dark:hover:bg-zinc-600"
              >
                <i
                  class="pi pi-arrow-right text-[10px] text-zinc-700 dark:text-white"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sombra/reflejo inferior -->
    <div
      class="absolute bottom-0 left-1/2 h-1/4 w-4/5 -translate-x-1/2 rounded-lg bg-black/10 opacity-40 blur-md transition-all duration-300 group-hover:h-1/3 group-hover:opacity-50 dark:bg-white/10"
    />
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
    validator: (p) => {
      return [
        "name",
        "image",
        "link",
        "slug", // Nuevo campo requerido para las rutas internas
        "release",
        "date",
      ].every((key) => key in p);
    },
  },
});

const img = useImage();
</script>
