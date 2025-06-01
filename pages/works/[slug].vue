<script setup>
defineI18nRoute(false);
const route = useRoute();
const { slug } = route.params;
import { projects } from "~/data/projects";

// 1. Encontrar el proyecto base
const baseProject = projects.find((p) => p.slug === slug);

if (!baseProject) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project not found",
  });
}

// 2. Obtener contenido del markdown
const { data: markdownContent } = await useAsyncData(
  `project-${slug}`,
  () =>
    queryContent(`projects/${slug}`)
      .findOne()
      .catch(() => null) // Manejar errores devolviendo null
);

// 3. Combinar los datos de forma segura
const project = computed(() => ({
  ...baseProject,
  ...(markdownContent.value || {}), // Spread solo si existe
  // Prioridad: imagen del markdown > imagen del proyecto base
  image: markdownContent.value?.image || baseProject.image,
  // Si hay body en el markdown, usamos ese como descripción
  description: markdownContent.value?.body ? null : baseProject.description,
}));

// 4. Debug (opcional)
console.log("Project data:", {
  base: baseProject,
  markdown: markdownContent.value,
  merged: project.value,
});
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
        {{ $t("works") }}
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
        <NuxtLink
          to="/works"
          class="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <i class="pi pi-arrow-left text-sm" />
          Volver atrás
        </NuxtLink>

        <NuxtLink
          v-if="project.link"
          :to="project.link"
          target="_blank"
          class="flex items-center gap-2 rounded-lg bg-zinc-100 px-4 py-2 text-sm text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          <i class="pi pi-arrow-right text-sm" />
          Visit Project
        </NuxtLink>
      </div>
    </div>

    <!-- Imagen principal -->
    <div
      v-if="project.image"
      class="mb-8 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
    >
      <NuxtImg
        :src="project.image"
        :alt="project.name"
        class="w-full object-cover"
        width="800"
        height="450"
      />
    </div>

    <!-- Contenido del proyecto -->
    <div class="prose dark:prose-invert max-w-none">
      <template v-if="markdownContent?.body">
        <ContentRenderer :value="markdownContent" />
      </template>

      <template v-else>
        <h2>About this project</h2>
        <p>{{ project.description }}</p>
      </template>
    </div>
  </div>
</template>
