<template>
  <section
    class="relative pt-8 z-20 mx-auto max-w-4xl flex flex-col items-center justify-center gap-4"
  >
    <h1
      data-i18n
      class="font-newsreader italic text-center text-4xl text-neutral-900 dark:text-white"
    >
      {{ $t("contact") }}
    </h1>
    <h2
      data-i18n
      class="text-center text-lg font-extralight italic text-neutral-600 dark:text-neutral-400"
    >
      {{ $t("contactDescription") }}
    </h2>
    <div
      class="w-[75%] h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"
    ></div>

    <ContactForm />

    <div
      class="w-[75%] h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent"
    ></div>
    <div
      class="flex w-full flex-col items-center justify-around gap-4 sm:flex-row px-4 sm:px-6 lg:px-8 mx-auto"
    >
      <div class="grid gap-1">
        <dd
          class="grid grid-cols-[auto_1fr] items-center gap-3 text-neutral-400"
        >
          <i class="pi pi-phone size-6 mt-2" aria-hidden="true" />
          <span>+52 (662) 228 32 22</span>
        </dd>
        <dd
          class="grid grid-cols-[auto_1fr] items-center gap-3 text-neutral-400"
        >
          <i class="pi pi-envelope size-6 mt-2" aria-hidden="true" />
          <NuxtLink
            :to="`mailto:oswaldo.ogarcia95@gmail.com`"
            class="cursor-pointer transition-colors duration-300"
          >
            oswaldo.ogarcia95@gmail.com
          </NuxtLink>
        </dd>
      </div>
      <div>
        <SpotlightButton>
          <NuxtLink
            data-i18n
            class="relative p-2 flex items-center justify-center gap-2 text-md font-medium text-neutral-900 dark:text-white transition-all duration-200 hover:text-neutral-600 dark:hover:text-neutral-300"
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
    </div>
  </section>
</template>

<script setup>
defineI18nRoute(false);
</script>
