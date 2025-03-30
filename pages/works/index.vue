<template>
  <section
    class="relative mx-auto flex max-w-4xl flex-col pt-8 items-center justify-center gap-4 px-4 sm:px-0"
  >
    <h1
      data-i18n
      class="font-newsreader italic text-center text-4xl text-neutral-900 dark:text-white px-2 sm:px-0"
    >
      {{ $t("works") }}
    </h1>
    <h2
      data-i18n
      class="text-center text-lg font-extralight italic text-neutral-600 dark:text-neutral-400 px-2 sm:px-0"
    >
      {{ $t("worksDescription") }}
    </h2>

    <div
      class="w-full sm:w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"
    ></div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 w-full px-2 sm:px-0">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
        class="w-full"
      />
    </div>
  </section>
</template>

<script setup>
defineI18nRoute(false);
import { projects } from '~/data/projects';
</script>
