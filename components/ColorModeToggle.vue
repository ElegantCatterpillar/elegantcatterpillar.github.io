<template>
  <button @click="toggleColorMode" class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700">
    <span v-if="colorMode.preference === 'light'">🌙 Dark Mode</span>
    <span v-else>☀️ Light Mode</span>
  </button>
  <div class="mt-4">
    <h1 class="text-lg font-semibold">Color mode: {{ $colorMode.value }}</h1>
    <select v-model="$colorMode.preference" class="px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </div>
</template>

<script setup>
const colorMode = useColorMode()
console.log(colorMode.preference)

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
  console.log(colorMode.preference)
}
</script>

<style scoped>
/* No es necesario agregar estilos adicionales aquí, ya que Tailwind CSS maneja todo */
</style>