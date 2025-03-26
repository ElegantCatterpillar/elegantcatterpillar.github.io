import NuxtRenderHTMLContext from 'nuxt/app';
<template>
  <div
    class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-2"
  >
    <SpotlightButton>
      <NuxtLink
        data-i18n
        class="relative p-1 flex items-center justify-center gap-2 text-md font-medium text-neutral-900 dark:text-white transition-all duration-200 hover:text-neutral-600 dark:hover:text-neutral-300"
        to="/contact"
      >
        {{ $t("worktogether") }}
        <i class="pi pi-envelope" />
      </NuxtLink>
    </SpotlightButton>
    <SpotlightButton>
      <NuxtLink
        data-i18n
        class="relative p-1 flex items-center justify-center gap-2 text-md font-medium text-neutral-900 dark:text-white transition-all duration-200 hover:text-neutral-600 dark:hover:text-neutral-300"
        to="https://cal.com/oswaldo-ogm/30min?user=oswaldo-ogm"
        target="_blank"
        rel="noopener"
      >
        {{ $t("schedulemeet") }}
        <i
          class="pi pi-calendar transition-all duration-300 hover:text-neutral-400"
          alt="ScrollTop"
        />
      </NuxtLink>
    </SpotlightButton>
  </div>
</template>
