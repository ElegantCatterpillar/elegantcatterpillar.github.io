<template>
  <div class="flex flex-col h-screen">
    <!-- NavBar -->
    <NavBar />

    <!-- Contenido principal (ocupa el espacio restante) -->
    <div class="flex-1 overflow-y-auto">
      <slot />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "~/components/NavBar.vue";
import Footer from "~/components/Footer.vue";
</script>