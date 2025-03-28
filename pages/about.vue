<template>
  <section
    class="relative pt-8 z-20 mx-auto flex max-w-4xl flex-col items-center justify-center gap-4"
  >
    <h1
      data-i18n
      class="font-newsreader italic text-center text-4xl text-neutral-900 dark:text-white"
    >
      {{ $t("about") }}
    </h1>
    <h2
      data-i18n
      class="text-center text-lg font-extralight italic text-neutral-600 dark:text-neutral-400"
    >
      {{ $t("aboutDescription") }}
    </h2>
    <div
      class="w-[75%] h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"
    ></div>

    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
    >
      <div class="flex flex-col items-center gap-4">
        <!-- Imagen -->
        <SpotlightImage
          class="mt-8"
          :src="ProfileImage"
          :square="true"
          :width="200"
          :height="200"
        />
        <Signature class="w-32 md:w-40" />
      </div>

      <!-- Contenedor de texto con firma -->
      <div class="items-center flex flex-col gap-4 sm:ml-4">
        <!-- Añadido pb-10 para espacio -->
        <h3 data-i18n class="text-lg">{{ $t("intro") }}</h3>
        <div data-i18n class="flex flex-col gap-4 text-primary">
          {{ $t("meDescription") }}
        </div>
      </div>
    </div>

    <!-- Separador (sin cambios) -->
    <div
      class="w-[75%] h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"
    ></div>

    <Experiences class="w-full" :experiences="experiences || []" />

    <div
      class="w-[75%] h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"
    ></div>

    <Stacks class="w-full" :stacks="stacks || []" />
    
  </section>
</template>

<script setup>
defineI18nRoute(false);
import ProfileImage from "~/public/images/me.jpg";

const { t } = useI18n();

const experiences = [
  {
    title: "Frontend Developer",
    company: "Ogm",
    date: "2022 - Present",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi.",
  },
  {
    title: "Frontend Developer",
    company: "Ogm",
    date: "2022 - Present",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Nulla facilisi. Nulla facilisi.",
  },
];

const stacks = [
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: '/images/stack/netcore.svg'
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: '/images/stack/photoshop.svg'
  },
];
</script>
