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
      <div v-for="(stack, index) in stacks" :key="index">
        <SpotlightImage
          :src="stack.image"
          transparent
          :width="75"
          :height="75"
          square
          cover
        >
          <img :src="stack.image" alt="Icono" />
        </SpotlightImage>
      </div>
    </div>
  </div>
</template>
