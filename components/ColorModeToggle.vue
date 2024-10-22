<template>
  <div>
    <!-- Botón existente -->
    <button @click="toggleColorMode"
      class="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-gray-800 dark:hover:bg-gray-700">
      <span v-if="colorMode.preference === 'light'">🌙 Dark Mode</span>
      <span v-else>☀️ Light Mode</span>
    </button>

    <!-- Animación del bote de pintura -->
    <div v-if="showAnimation" class="paint-can-container">
      <div class="paint-can" :class="{ 'dark': isDarkMode }"></div>
      <div class="paint-splash" :class="{ 'dark': isDarkMode }"></div>
    </div>

    <!-- Select para cambiar el modo -->
    <div class="mt-4">
      <h1 class="text-lg font-semibold">Color mode: {{ $colorMode.value }}</h1>
      <select v-model="$colorMode.preference"
        class="px-4 py-2 rounded-md bg-white text-gray-800 border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600 mr-4">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const colorMode = useColorMode()

const optionsColors = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
]

const showAnimation = ref(false)
const isDarkMode = ref(colorMode.value === 'dark')

const toggleColorMode = () => {
  showAnimation.value = true
  setTimeout(() => {
    colorMode.preference = colorMode.value === 'light' ? 'dark' : 'light'
    isDarkMode.value = !isDarkMode.value
  }, 500)

  setTimeout(() => {
    showAnimation.value = false
  }, 2000)
}
</script>

<style>
body {
  transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
}

.paint-can-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.paint-can {
  width: 60px;
  height: 80px;
  background-color: #ccc;
  border: 4px solid #999;
  border-radius: 0 0 10px 10px;
  position: relative;
  animation: shake 0.5s ease-in-out, tilt 0.5s ease-in-out 0.5s forwards;
}

.paint-can::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 70px;
  height: 15px;
  background-color: #999;
  border-radius: 5px 5px 0 0;
}

.paint-can.dark {
  background-color: #333;
  border-color: #666;
}

.paint-can.dark::before {
  background-color: #666;
}

.paint-splash {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 10px;
  height: 10px;
  background-color: #1a202c;
  border-radius: 50%;
  opacity: 0;
  animation: splash 1s ease-out 0.7s forwards;
}

.paint-splash.dark {
  background-color: #f7fafc;
}

@keyframes shake {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

@keyframes tilt {
  100% { transform: rotate(90deg); }
}

@keyframes splash {
  0% {
    transform: translate(-50%, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, 0) scale(150);
    opacity: 0;
  }
}
</style>
