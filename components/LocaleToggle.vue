<template>
  <Button @click="updateLocale" :label="locale === 'en' ? 'Español' : 'English'" class="px-4 py-2 rounded-md bg-green-500 hover:bg-green-600 mr-4" />
  <button @click="updateLocale"
    class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700">
    <span v-if="locale === 'en'">Español</span>
    <span v-else>English</span>
  </button>
  <div class="mt-4">
    <h1 class="text-lg font-semibold">Locale: {{ locale }}</h1>
    <select
      v-model="selectedLocale"
      class="px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 mr-4">
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>

    <Select v-model="selectedLocale" :options="localeOptions" option-label="label" placeholder="Select your locale" option-value="value"
      class="px-4 rounded-md bg-white text-gray-800 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600">
    </Select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const { locale, setLocale } = useI18n()

const selectedLocale = ref(locale.value)

const localeOptions = [
  { label: 'English', value: 'en' },
  { label: 'Español', value: 'es' }
]

const updateLocale = () => {
  const newLocale = locale.value === 'en' ? 'es' : 'en'
  console.log(newLocale)
  toggleLocale(newLocale)
}

watch(selectedLocale, (value) => {
  if (value === locale.value) return

  toggleLocale(value)
})

const toggleLocale = (value) => {
  setLocale(value)
}
</script>