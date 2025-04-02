<script setup>
defineI18nRoute(false);
const route = useRoute();
const { slug } = route.params;
import { projects } from '~/data/projects';

// Encontrar el proyecto actual
const project = computed(() => projects.find((p) => p.slug === slug));

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
  });
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <div
      class="mb-6 flex items-center text-sm text-zinc-500 dark:text-zinc-400"
    >
      <NuxtLink
        to="/works"
        class="hover:text-zinc-700 dark:hover:text-zinc-300"
      >
        Projects
      </NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-zinc-700 dark:text-zinc-300">{{ project.name }}</span>
    </div>

    <!-- Header del proyecto -->
    <div
      class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <h1 class="text-3xl font-bold text-zinc-900 dark:text-white">
          {{ project.name }}
        </h1>
        <p class="text-zinc-600 dark:text-zinc-400">
          {{ project.date }} • {{ project.category }}
        </p>
      </div>

      <div class="flex gap-3">
        <!-- Botón de documentación (ahora interno) -->
        <button
          class="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <i class="pi pi-book text-sm" />
          Documentation
        </button>

        <!-- Botón externo -->
        <NuxtLink
          :to="project.link"
          target="_blank"
          class="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <i class="pi pi-arrow-right text-sm" />
          Visit Project
        </NuxtLink>
      </div>
    </div>

    <!-- Imagen principal -->
    <div
      class="mb-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
    >
      <NuxtImg
        :src="project.image"
        :alt="project.name"
        class="w-full object-cover"
        width="1200"
        height="630"
      />
    </div>

    <!-- Contenido del proyecto -->
    <div class="prose dark:prose-invert max-w-none">
      <h2>About this project</h2>
      <p>{{ project.description }}</p>

      <!-- Puedes añadir más secciones según necesites -->
      <h2>Features</h2>
      <ul>
        <li v-for="feature in project.features" :key="feature">
          {{ feature }}
        </li>
      </ul>
    </div>
  </div>
</template>
