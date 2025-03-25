<script setup>
const states = [
  {
    status: "available",
    color: "bg-green-600/80 dark:bg-green-600/80",
    bgColor: "bg-green-500/80 dark:bg-green-500/80",
    textColor: "text-green-600 dark:text-green-500/80",
  },
  {
    status: "unavailable",
    color: "bg-red-500 dark:bg-red-500",
    bgColor: "bg-red-500 dark:bg-red-400",
    textColor: "text-red-600 dark:text-red-400",
  },
];

const currentAvailability = computed(() => {
  return states[0];
});

defineProps({
  background: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div
    class="flex items-center rounded-full"
    :class="{
      'border border-neutral-200 bg-white/80 px-5 py-2 backdrop-blur-3xl dark:border-white/10 dark:bg-zinc-900/80':
        background,
    }"
  >
    <span class="relative flex size-3">
      <span
        class="absolute inline-flex size-full animate-ping rounded-full opacity-75"
        :class="currentAvailability.color"
      />
      <span
        class="relative inline-flex size-3 scale-90 rounded-full"
        :class="currentAvailability.bgColor"
      />
    </span>
    <span
      class="ml-2 text-sm font-medium"
      :class="currentAvailability.textColor"
    >
      {{ $t(currentAvailability.status) }}
    </span>
  </div>
</template>
