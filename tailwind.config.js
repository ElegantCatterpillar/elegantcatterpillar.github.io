/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#60a5fa",
          dark: "#1d4ed8",
        },
        background: {
          light: "#ffffff",
          dark: "#121212",
        },
        text: {
          light: "#000000",
          dark: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
