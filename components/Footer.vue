<template>
  <div class="mt-6 pb-20 relative">
    <footer
      class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 italic"
    >
      <DividerLayout />

      <Logo />

      <!-- Texto del footer -->
      <span data-i18n class="text-center text-md text-muted">
        © {{ new Date().getFullYear() }},
        <NuxtLink
          to="https://github.com/ElegantCatterpillar"
          target="_blank"
          rel="noopener"
          class="inline-block hover:underline font-semibold text-muted transition-all duration-300 hover:text-neutral-400 transform hover:scale-105"
        >
          OscarOGM
        </NuxtLink>
        - {{ $t("copyright") }}.
      </span>
    </footer>
  </div>
</template>
