<template>
  <SpotlightButton rounded transparent class="border border-white/10">
    <div
      class="z-10 flex h-[50px] justify-around gap-1 p-1 transition-all duration-100 ease-in-out sm:h-[45px] sm:hover:gap-2"
    >
      <button
        v-for="locale in locales"
        :key="locale.code"
        :aria-label="`Cambiar idioma a ${locale.name}`"
        :class="[
          locale.code === selectedLocale.code
            ? 'border border-black/5 dark:border-white/5 dark:bg-zinc-900/50 dark:text-white/75 text-dark/75 shadow-2xl shadow-black/50 dark:shadow-white/50 backdrop-blur-3xl text-shadow-sm'
            : 'text-muted',
        ]"
        @click="changeLanguage(locale.code)"
        class="flex items-center justify-center gap-1 rounded-full border border-transparent px-4 py-1 transition-all duration-100 ease-in-out dark:hover:border-white/5 dark:hover:bg-zinc-900/50 hover:border-black/5 hover:backdrop-blur-3xl sm:px-6"
      >
        <div class="flex flex-col items-center relative">
          <!-- Bandera -->
          <img
            :src="getFlagFromAPI(locale.flag)"
            :alt="locale.name"
            class="w-6 h-6 rounded-full"
          />

          <!-- Línea simulada -->
          <div
            v-if="locale.code === selectedLocale.code"
            class="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
          ></div>
        </div>
      </button>
    </div>
  </SpotlightButton>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale, locales, setLocale } = useI18n();

const selectedLocale = computed(() =>
  locales.value.find((l) => l.code === locale.value)
);

const changeLanguage = (newLocale) => {
  if (locale.value !== newLocale) {
    setLocale(newLocale);
  }
};

const getFlagFromAPI = (countryCode) =>
  `https://flagsapi.com/${countryCode}/shiny/24.png`;
</script>
