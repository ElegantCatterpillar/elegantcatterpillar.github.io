<script setup>
import { ref } from "vue";

const activeTab = ref(0);
const activePanelsServices = ref([]);
const activePanelsPrices = ref([]);
const activePanelsPersonal = ref([]);

const tabs = [
  { label: "Servicios", key: "services" },
  { label: "Precios", key: "pricing" },
  { label: "Personal", key: "team" },
];

// Datos de ejemplo para los accordions
const servicesItems = ref([
  {
    id: 1,
    question: "¿Qué servicios ofrecen?",
    answer: "Ofrecemos desarrollo web, diseño UX/UI y consultoría tecnológica.",
  },
  {
    id: 2,
    question: "¿Tienen soporte 24/7?",
    answer: "Sí, nuestro equipo de soporte está disponible en todo momento.",
  },
]);

const pricingItems = ref([
  {
    id: 1,
    question: "¿Cuál es su estructura de precios?",
    answer: "Trabajamos con precios fijos por proyecto o por hora.",
  },
  {
    id: 2,
    question: "¿Ofrecen descuentos?",
    answer: "Sí, para proyectos a largo plazo ofrecemos descuentos especiales.",
  },
]);

const teamItems = ref([
  {
    id: 1,
    question: "¿Quiénes son sus desarrolladores?",
    answer: "Contamos con un equipo de 10 desarrolladores senior.",
  },
  {
    id: 2,
    question: "¿Dónde están ubicados?",
    answer: "Tenemos equipos en Latinoamérica y Europa.",
  },
]);

const handleServicePanelChange = (newValue) => {
  activePanelsServices.value = newValue;
};

const handlePricesPanelChange = (newValue) => {
  activePanelsPrices.value = newValue;
};

const handlePersonalPanelChange = (newValue) => {
  activePanelsPersonal.value = newValue;
};
</script>

<template>
  <div class="flex flex-col items-center w-full gap-2">
    <div class="flex flex-col items-center justify-center gap-2">
      <h3 data-i18n class="text-white-shadow font-newsreader italic text-2xl">
        {{ $t("experiences") }}
      </h3>
      <p
        data-i18n
        class="text-md font-extralight italic text-neutral-600 dark:text-neutral-400"
      >
        {{ $t("experiencesDescription") }}
      </p>
    </div>
    <!-- Contenedor de los tabs -->
    <div class="flex justify-center w-full mb-4">
      <div class="flex space-x-2 p-1 rounded-full">
        <Button
          v-for="(tab, index) in tabs"
          :key="tab.key"
          @click="activeTab = index"
          class="sm:px-20 md:px-30 py-2 text-sm font-medium rounded-full border transition duration-300 border-black/10 bg-black/5 hover:bg-black/[0.075] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.075]"
          :class="{
            'text-primary shadow-md dark:text-primary-100': activeTab === index,
            'text-gray-700 hover:text-gray-900 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-900':
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
        <Accordion
          :value="activePanelsServices"
          multiple
          expandIcon="null"
          @update:value="handleServicePanelChange"
          collapseIcon="null"
          class="flex flex-col gap-3"
        >
          <AccordionPanel
            v-for="item in servicesItems"
            :key="item.id"
            :value="item.id"
            class="flex flex-col group rounded-xl border transition duration-300 border-black/10 bg-black/5 hover:bg-black/[0.075] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.075]"
          >
            <AccordionHeader class="px-2 py-1">
              <div class="flex justify-between items-center w-full px-4 py-3">
                <div class="flex flex-col gap-1 w-3/4">
                  <h4 class="font-medium text-gray-700 dark:text-gray-300">
                    {{ item.question }}
                  </h4>
                </div>
                <div
                  class="flex items-center justify-end w-1/4 italic font-semibold transition-colors duration-300 group-hover:text-primary"
                >
                  {{
                    activePanelsServices.includes(item.id)
                      ? "Ver menos"
                      : "Ver más"
                  }}
                  <i
                    class="ml-2 pi pi-plus text-md transition-all duration-300 ease-in-out"
                    :class="{
                      'transform rotate-pro': activePanelsServices.includes(
                        item.id
                      ),
                    }"
                  ></i>
                </div>
              </div>
            </AccordionHeader>

            <AccordionContent>
              <div class="flex flex-row px-4 pt-3">
                <p class="text-justify text-gray-600 dark:text-gray-400">
                  {{ item.answer }}
                </p>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>

      <!-- Precios -->
      <div v-show="activeTab === 1" class="animate-fadein">
        <Accordion
          :value="activePanelsPrices"
          multiple
          expandIcon="null"
          @update:value="handlePricesPanelChange"
          collapseIcon="null"
          class="flex flex-col gap-3"
        >
          <AccordionPanel
            v-for="item in pricingItems"
            :key="item.id"
            :value="item.id"
            class="flex flex-col group rounded-xl border transition duration-300 border-black/10 bg-black/5 hover:bg-black/[0.075] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.075]"
          >
            <AccordionHeader class="px-2 py-1">
              <div class="flex justify-between items-center w-full px-4 py-3">
                <div class="flex flex-col gap-1 w-3/4">
                  <h4 class="font-medium text-gray-700 dark:text-gray-300">
                    {{ item.question }}
                  </h4>
                </div>
                <div
                  class="flex items-center justify-end w-1/4 italic font-semibold transition-colors duration-300 group-hover:text-primary"
                >
                  {{
                    activePanelsPrices.includes(item.id)
                      ? "Ver menos"
                      : "Ver más"
                  }}
                  <i
                    class="ml-2 pi pi-plus text-md transition-all duration-300 ease-in-out"
                    :class="{
                      'transform rotate-pro': activePanelsPrices.includes(
                        item.id
                      ),
                    }"
                  ></i>
                </div>
              </div>
            </AccordionHeader>

            <AccordionContent>
              <div class="flex flex-row px-4 pt-3">
                <p class="text-justify text-gray-600 dark:text-gray-400">
                  {{ item.answer }}
                </p>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>

      <!-- Personal -->
      <div v-show="activeTab === 2" class="animate-fadein">
        <Accordion
          :value="activePanelsPersonal"
          multiple
          expandIcon="null"
          @update:value="handlePersonalPanelChange"
          collapseIcon="null"
          class="flex flex-col gap-3"
        >
          <AccordionPanel
            v-for="item in teamItems"
            :key="item.id"
            :value="item.id"
            class="flex flex-col group rounded-xl border transition duration-300 border-black/10 bg-black/5 hover:bg-black/[0.075] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.075]"
          >
            <AccordionHeader class="px-2 py-1">
              <div class="flex justify-between items-center w-full px-4 py-3">
                <div class="flex flex-col gap-1 w-3/4">
                  <h4 class="font-medium text-gray-700 dark:text-gray-300">
                    {{ item.question }}
                  </h4>
                </div>
                <div
                  class="flex items-center justify-end w-1/4 italic font-semibold transition-colors duration-300 group-hover:text-primary"
                >
                  {{
                    activePanelsPersonal.includes(item.id)
                      ? "Ver menos"
                      : "Ver más"
                  }}
                  <i
                    class="ml-2 pi pi-plus text-md transition-all duration-300 ease-in-out"
                    :class="{
                      'transform rotate-pro': activePanelsPersonal.includes(
                        item.id
                      ),
                    }"
                  ></i>
                </div>
              </div>
            </AccordionHeader>

            <AccordionContent>
              <div class="flex flex-row px-4 pt-3">
                <p class="text-justify text-gray-600 dark:text-gray-400">
                  {{ item.answer }}
                </p>
              </div>
            </AccordionContent>
          </AccordionPanel>
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

/* Estilos para el icono de rotación */
.rotate-pro {
  transform: rotate(495deg);
}

/* Estilos personalizados para PrimeVue Accordion */
.p-accordion .p-accordion-header .p-accordion-header-link {
  border: none !important;
  background: transparent !important;
  padding: 0 !important;
}

.p-accordion .p-accordion-content {
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
}
</style>
