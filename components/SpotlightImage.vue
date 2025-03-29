<!-- components/SpotlightImage.vue -->
<template>
  <div class="flex justify-center">
    <SpotlightButton
      :rounded="!square"
      :cover="!cover"
      :transparent="transparent"
      :noRoundContent="square"
      class="relative"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
      }"
    >
      <div
        class="relative w-full h-full flex items-center justify-center"
        :class="{
          'overflow-hidden rounded-none': square,
          'rounded-full': !square,
        }"
      >
        <img
          :src="src"
          :alt="alt"
          class="w-full h-full scale-90 group-hover:scale-95 transition-transform duration-300 pointer-events-none"
          :class="{
            'rounded-none': square,
            'rounded-full': !square,
            'object-cover': !cover,
          }"
        />
      </div>
    </SpotlightButton>
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "Imagen",
  },
  square: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String],
    default: 48,
  },
  height: {
    type: [Number, String],
    default: 48,
  },
  cover: {
    type: Boolean,
    default: false,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
});
</script>
