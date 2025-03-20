<template>
  <div class="mt-6 pb-20 relative">
    <footer
      class="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6"
    >
      <!-- Línea simulada -->
      <div
        class="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-black/75 dark:via-white/75 to-transparent"
      ></div>

      <Logo />

      <!-- Texto del footer -->
      <span class="text-center text-sm text-muted">
        © {{ new Date().getFullYear() }},
        <NuxtLink
          to="https://github.com/ElegantCatterpillar"
          class="text-primary hover:text-primary/75 transition-colors duration-200"
        >
          OscarOGM
        </NuxtLink>
        - {{ $t("Todos los derechos reservados") }}.
      </span>
    </footer>
  </div>
</template>
