<template>
  <Select
    v-model="selectedLocale"
    @change="selectLanguage"
    :options="locales"
    :placeholder="$t('selectLanguage')"
    class="rounded-md bg-white text-gray-800 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <template #header>
      <div class="font-medium p-3">{{ $t("availableLocales") }}</div>
    </template>
    <template #value="slotProps">
      <div class="flex">
        <img
          :alt="`${slotProps.value.code}-${slotProps.value.language}`"
          :src="getFlagFromAPI(slotProps.value.language)"
        />
        <span class="ml-2">{{ slotProps.value.name }}</span>
      </div>
    </template>
    <template #option="slotProps">
      <img
        :alt="`${slotProps.option.code}-${slotProps.option.language}`"
        :src="getFlagFromAPI(slotProps.option.language)"
      />
      <span class="ml-2">{{ slotProps.option.name }}</span>
    </template>
  </Select>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();
const currentLocale = ref(
  locales.value.filter((l) => l.code === locale.value)[0]
);

const selectedLocale = ref(currentLocale);

const getFlagFromAPI = (countryCode) => {
  return `https://flagsapi.com/${countryCode}/shiny/24.png`;
};

const selectLanguage = ({ originalEvent, value }) => {
  originalEvent.preventDefault();

  // Cambia el tema basado en la selección
  changeLanguage(value.code);
};

const changeLanguage = (value) => {
  if (locale.value === value) return;
  setLocale(value);
};
</script>
