<script setup>
defineProps({
  experiences: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3 data-i18n class="text-white-shadow font-newsreader italic text-2xl">
      {{ $t("experiences") }}
    </h3>
    <p
      data-i18n
      class="text-md font-extralight italic text-neutral-600 dark:text-neutral-400"
    >
      {{ $t("experiencesDescription") }}
    </p>
    <div class="flex flex-col gap-4">
      <div v-for="experience in experiences" :key="experience.title">
        <h4 data-i18n class="font-semibold">
          {{ $t(experience.title) }}
        </h4>
        <div class="flex gap-1">
          <p data-i18n>
            {{ $t(experience.date) }}
          </p>
          <span data-i18n class="mx-1"> / </span>
          <p data-i18n>
            {{ $t(experience.company) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
