<script setup lang="ts">
const isScrolling = ref(false);

onMounted(() => {
  window.addEventListener("scroll", () => {
    isScrolling.value = window.scrollY > 0;
  });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <div class="fixed bottom-10 right-6 z-50 sm:bottom-8 sm:right-8">
    <SpotlightButton
      aria-label="scroll to top button"
      class="flex items-center justify-center p-2 text-muted transition-all duration-200"
      rounded
      :class="{ 'opacity-100': isScrolling, 'opacity-0': !isScrolling }"
      @click="scrollToTop"
    >
      <i
        class="pi pi-arrow-up p-2 text-xl text-muted transition-all duration-300 hover:text-neutral-400"
        alt="ScrollTop"
      />
    </SpotlightButton>
  </div>
</template>
