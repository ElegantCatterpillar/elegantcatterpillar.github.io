<script setup>
defineProps({
  stacks: {
    type: Array, // Cambiado de Object a Array
    required: true,
    default: () => [], // Valor por defecto como array vacío
  },
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <h3 data-i18n class="text-white-shadow font-newsreader italic text-2xl">
      {{ $t("stacks") }}
    </h3>
    <p
      data-i18n
      class="text-md font-extralight italic text-neutral-600 dark:text-neutral-400"
    >
      {{ $t("stacksDescription") }}
    </p>
    <div class="flex flex-wrap gap-4">
      <SpotlightCard v-for="stack in stacks" :key="stack.name" white>
        <NuxtLink
          :to="stack.link"
          target="_blank"
          :aria-label="stack.name + ' link'"
          class="flex gap-2 p-4"
        >
          <div class="w-16 h-16">
            <img :src="stack.image" alt="Icono" />
          </div>
        </NuxtLink>
      </SpotlightCard>
    </div>
  </div>
</template>
