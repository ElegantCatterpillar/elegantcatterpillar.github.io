<template>
  <section
    class="relative pt-8 z-20 flex flex-col items-center justify-center gap-6"
  >
    <!-- Imagen redondeada -->
    <SpotlightImage 
      :src="ProfileImage" 
      :square="false"
      :width="200"
      :height="200"
    />

    <!-- title -->
    <h1
      data-i18n
      class="mx-auto font-medium text-center text-pretty bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-3xl text-transparent lg:max-w-4xl lg:text-4xl dark:bg-gradient-to-r dark:from-gray-100 dark:to-gray-400 animate-pulse animate-once pb-2"
    >
      {{ $t("title") }}
    </h1>

    <!-- subtitle -->
    <h2
      data-i18n
      class="mx-auto max-w-2xl text-center text-lg antialiased text-gray-600/90 dark:text-gray-300/80 animate-pulse animate-once"
    >
      {{ $t("subtitle") }}
    </h2>

    <Availability />

    <Social />

    <Communication />

    <div
      class="w-[75%] h-px bg-gradient-to-r from-transparent via-black/35 dark:via-white/35 to-transparent mx-auto"
    ></div>

    <!-- <FAQ /> -->
  </section>
</template>

<script setup>
defineI18nRoute(false);
import ProfileImage from "~/public/images/me.jpg";
</script>

<style scoped>
.animate-once {
  animation-iteration-count: 1;
}
</style>
