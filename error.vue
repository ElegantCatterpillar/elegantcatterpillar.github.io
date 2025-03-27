<script setup>
const title = "OswaldoDEV";
const description = "Your page description";
const image = "/images/me.jpg";
const url = "https://oswaldogm.com";

useHead({
  titleTemplate: "%s | Portafolio",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "charset", content: "utf-8" },
    { name: "color-scheme", content: "light dark" },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "canonical", href: url },
  ],
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogUrl: url,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
});

defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const handleError = () => {
  clearError({ redirect: "/" });
};

// Referencia y lógica para el NavBar (igual que en tu layout)
const navbar = ref(null);
const navbarHeight = ref(0);

onMounted(() => {
  if (navbar.value) {
    navbarHeight.value = navbar.value.$el.offsetHeight;
  }
});
</script>

<template>
  <div class="flex flex-col h-screen mx-auto">
    <ScrollToTop />
    <CustomCursor />

    <!-- NavBar -->
    <NavBar ref="navbar" class="fixed z-50 w-full top-0" />

    <!-- Contenido principal (con padding para el NavBar) -->
    <div
      :style="{ paddingTop: navbarHeight + 'px' }"
      class="flex-1 mt-14 sm:mt-0 flex flex-col"
    >
      <main
        class="flex flex-col items-center justify-center flex-1 w-full bg-white dark:bg-neutral-900 px-6 py-12 transition-colors duration-300"
      >
        <div class="text-center max-w-2xl mx-auto space-y-8">
          <!-- Código de error -->
          <p
            class="text-8xl md:text-9xl font-bold text-neutral-800 dark:text-neutral-200"
          >
            {{ error.statusCode === 404 ? "404" : "500" }}
          </p>

          <!-- Mensaje de error -->
          <h1
            class="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-white"
          >
            {{
              error.statusCode === 404
                ? $t("pageNotFound")
                : $t("somethingWentWrong")
            }}
          </h1>

          <!-- Botón -->
          <div class="pt-4">
            <SpotlightButton>
              <button
                @click="handleError"
                class="flex items-center justify-center gap-2 px-6 py-3 text-lg text-neutral-900 dark:text-white font-medium"
              >
                <i class="pi pi-home"></i>
                {{ $t("goHome") }}
              </button>
            </SpotlightButton>
          </div>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>
