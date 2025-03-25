<script setup>
import { ref } from "vue";

const activeTab = ref(0);

const tabs = [
  { label: "Servicios", key: "services" },
  { label: "Precios", key: "pricing" },
  { label: "Personal", key: "team" },
];

// Datos de ejemplo para los accordions
const servicesItems = ref([
  {
    question: "¿Qué servicios ofrecen?",
    answer: "Ofrecemos desarrollo web, diseño UX/UI y consultoría tecnológica.",
  },
  {
    question: "¿Tienen soporte 24/7?",
    answer: "Sí, nuestro equipo de soporte está disponible en todo momento.",
  },
]);

const pricingItems = ref([
  {
    question: "¿Cuál es su estructura de precios?",
    answer: "Trabajamos con precios fijos por proyecto o por hora.",
  },
  {
    question: "¿Ofrecen descuentos?",
    answer: "Sí, para proyectos a largo plazo ofrecemos descuentos especiales.",
  },
]);

const teamItems = ref([
  {
    question: "¿Quiénes son sus desarrolladores?",
    answer: "Contamos con un equipo de 10 desarrolladores senior.",
  },
  {
    question: "¿Dónde están ubicados?",
    answer: "Tenemos equipos en Latinoamérica y Europa.",
  },
]);
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <!-- Contenedor de los tabs -->
    <div class="flex justify-center w-full mb-4">
      <div class="flex space-x-2 p-1 rounded-full shadow-inner">
        <Button
          v-for="(tab, index) in tabs"
          :key="tab.key"
          @click="activeTab = index"
          class="sm:px-20 md:px-30 py-2 text-sm font-medium rounded-full transition-all duration-300 border-white/10 border-2"
          :class="{
            'bg-white text-primary shadow-md dark:bg-gray-700 dark:text-primary-300':
              activeTab === index,
            'text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700':
              activeTab !== index,
          }"
        >
          {{ tab.label }}
        </Button>
      </div>
    </div>

    <!-- Contenido de los tabs -->
    <div class="w-full max-w-3xl px-4">
      <!-- Servicios -->
      <div v-show="activeTab === 0" class="animate-fadein">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Nuestros Servicios
        </h2>
        <Accordion>
          <AccordionTab
            v-for="(item, index) in servicesItems"
            :key="`service-${index}`"
          >
            <template #header>
              <span class="font-medium text-gray-700 dark:text-gray-300">{{
                item.question
              }}</span>
            </template>
            <p class="text-gray-600 dark:text-gray-400">{{ item.answer }}</p>
          </AccordionTab>
        </Accordion>
      </div>

      <!-- Precios -->
      <div v-show="activeTab === 1" class="animate-fadein">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Planes y Precios
        </h2>
        <Accordion>
          <AccordionTab
            v-for="(item, index) in pricingItems"
            :key="`price-${index}`"
          >
            <template #header>
              <span class="font-medium text-gray-700 dark:text-gray-300">{{
                item.question
              }}</span>
            </template>
            <p class="text-gray-600 dark:text-gray-400">{{ item.answer }}</p>
          </AccordionTab>
        </Accordion>
      </div>

      <!-- Personal -->
      <div v-show="activeTab === 2" class="animate-fadein">
        <h2 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Nuestro Equipo
        </h2>
        <Accordion>
          <AccordionTab
            v-for="(item, index) in teamItems"
            :key="`team-${index}`"
          >
            <template #header>
              <span class="font-medium text-gray-700 dark:text-gray-300">{{
                item.question
              }}</span>
            </template>
            <p class="text-gray-600 dark:text-gray-400">{{ item.answer }}</p>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
  </div>
</template>

<style>
/* Animación para el cambio de tabs */
.animate-fadein {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Estilos personalizados para PrimeVue Accordion */
.p-accordion .p-accordion-header .p-accordion-header-link {
  border: none !important;
  background: transparent !important;
  padding: 1rem !important;
}

.p-accordion .p-accordion-content {
  padding: 0 1rem 1rem !important;
  border: none !important;
  background: transparent !important;
}

/* Modo oscuro para el accordion */
.dark .p-accordion .p-accordion-header .p-accordion-header-link {
  color: #e5e7eb !important;
}

.dark .p-accordion .p-accordion-content {
  color: #9ca3af !important;
}
</style>
