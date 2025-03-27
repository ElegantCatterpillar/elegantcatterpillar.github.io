<template>
  <section
    class="relative mx-auto flex max-w-4xl flex-col pt-8 items-center justify-center gap-4"
  >
    <h1
      class="font-newsreader italic text-center text-4xl text-neutral-900 dark:text-white"
    >
      Proyectos
    </h1>
    <h2
      class="text-center text-lg font-extralight italic text-neutral-600 dark:text-neutral-400"
    >
      Descripción
    </h2>

    <div
      class="w-1/2 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"
    ></div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :project="project"
      />
    </div>
  </section>
</template>

<script setup>
defineI18nRoute(false);

const projects = [
  {
    name: "Project 1",
    image:
      "https://images.unsplash.com/photo-1741812191037-96bb5f12010a?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://github.com/ElegantCatterpillar",
    release: true,
    date: "2025",
    timeWorked: "1 Month",
  },
  {
    name: "Project 2",
    image:
      "https://images.unsplash.com/photo-1741988766604-04b6f1b3236d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://github.com/ElegantCatterpillar",
    release: false,
    date: "2025",
    timeWorked: "1 Week",
  },
];
</script>
