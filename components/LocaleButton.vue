<template>
  <SpotlightButton rounded transparent class="border border-white/10 h-[46px]">
    <div class="z-10 flex h-full items-center justify-center gap-2 p-1">
      <div
        v-for="locale in locales"
        :key="locale.code"
        class="relative flex flex-col items-center"
      >
        <button
          @click="changeLanguageWithTransition(locale.code)"
          class="flex h-9 w-9 items-center justify-center rounded-full transition-all"
          :class="{
            'bg-white/10': locale.code === selectedLocale.code,
            'hover:bg-white/5': locale.code !== selectedLocale.code,
          }"
          v-tooltip.bottom="$t('changeLanguage') + ' ' + $t(locale.code)"
        >
          <img
            :src="getFlagFromAPI(locale.flag)"
            :alt="locale.name"
            class="h-5 w-5 object-cover"
          />
        </button>

        <div
          v-if="locale.code === selectedLocale.code"
          class="absolute bottom-[2px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
        />
      </div>
    </div>
  </SpotlightButton>
</template>

<script setup>
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale, locales, setLocale } = useI18n();
const selectedLocale = computed(() =>
  locales.value.find((l) => l.code === locale.value)
);
const isTransitioning = ref(false);

const changeLanguageWithTransition = async (newLocale) => {
  if (locale.value === newLocale || isTransitioning.value) return;

  isTransitioning.value = true;

  // 1. Fade out (1 segundo)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.style.transition = "opacity 1s ease";
    el.style.opacity = "0";
  });

  // 2. Esperar 1s (fade out) + 0.2s (pausa)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 3. Cambiar el idioma
  setLocale(newLocale);

  // **Disparar evento global para actualizar tooltips**
  window.dispatchEvent(new CustomEvent("languageChanged"));

  // 4. Fade in (0.8 segundos)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.style.transition = "opacity 0.8s ease";
    el.style.opacity = "1";

    // Resetear después de completar
    setTimeout(() => {
      el.style.transition = "";
    }, 800);
  });

  isTransitioning.value = false;
};

const getFlagFromAPI = (countryCode) =>
  `https://flagsapi.com/${countryCode}/shiny/24.png`;
</script>

<style>
/* Estilo base para elementos traducidos */
[data-i18n] {
  opacity: 1;
  display: inline-block; /* Para mantener el layout */
}
</style>
