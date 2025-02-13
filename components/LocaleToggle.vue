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
          :alt="`${slotProps.value.code}`"
          :src="getFlagFromAPI(slotProps.value.flag)"
        />
        <span class="ml-2">{{ slotProps.value.name }}</span>
      </div>
    </template>
    <template #option="slotProps">
      <img
        :alt="`${slotProps.option.code}`"
        :src="getFlagFromAPI(slotProps.option.flag)"
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
  const url = `https://flagsapi.com/${countryCode}/shiny/24.png`;
  console.log(url); // Verifica la URL generada
  return url;
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
