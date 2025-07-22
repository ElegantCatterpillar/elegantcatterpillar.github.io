  <template>
    <div class="flex flex-col h-screen mx-auto">
      <ScrollToTop />

      <!-- NavBar -->
      <NavBar ref="navbar" class="fixed z-50 w-full top-0" />

      <!-- Contenido principal (ocupa el espacio restante) -->
      <div
        :style="{ paddingTop: navbarHeight + 'px' }"
        class="flex-1 mt-14 sm:mt-0"
      >
        <slot />
      </div>

      <!-- Footer -->
      <Footer />
    </div>
  </template>

  <script setup>
  // Referencia para el NavBar
  const navbar = ref(null);

  // Estado para almacenar la altura del NavBar
  const navbarHeight = ref(0);

  // Calcular la altura del NavBar al montar el componente
  onMounted(() => {
    if (navbar.value) {
      navbarHeight.value = navbar.value.$el.offsetHeight;
    }
  });
  </script>
