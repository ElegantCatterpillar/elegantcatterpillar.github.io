<script setup>
import { ref } from "vue";
import { tabs, services, precios, personal } from "~/data/faq";

const activeTab = ref(0);
const activePanelsServices = ref([]);
const activePanelsPrices = ref([]);
const activePanelsPersonal = ref([]);

// Datos de ejemplo para los accordions
const servicesItems = ref(services);

const pricingItems = ref(precios);

const personalItems = ref(personal);

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
        {{ $t("faq") }}
      </h3>
      <p
        data-i18n
        class="text-md font-extralight italic text-neutral-600 dark:text-neutral-400"
      >
        {{ $t("faqDescription") }}
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
          <span data-i18n>{{ $t(tab.key) }}</span>
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
              <div
                class="flex justify-between items-center w-full px-4 py-3 gap-4"
              >
                <!-- Added gap-4 -->
                <div class="flex-1">
                  <!-- Changed from w-3/4 to flex-1 -->
                  <h4
                    data-i18n
                    class="font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ $t(item.question) }}
                  </h4>
                </div>
                <div class="flex-shrink-0">
                  <!-- Changed from w-1/4 to flex-shrink-0 -->
                  <div
                    data-i18n
                    class="flex items-center justify-end italic font-semibold transition-colors duration-300 group-hover:text-primary"
                  >
                    {{
                      activePanelsServices.includes(item.id)
                        ? $t("seeLess")
                        : $t("seeMore")
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
              </div>
            </AccordionHeader>

            <AccordionContent>
              <div class="flex flex-row px-4 pt-3">
                <p
                  data-i18n
                  class="text-justify text-gray-600 dark:text-gray-400"
                >
                  {{ $t(item.answer) }}
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
              <div
                class="flex justify-between items-center w-full px-4 py-3 gap-4"
              >
                <div class="flex-1">
                  <h4
                    data-i18n
                    class="font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ $t(item.question) }}
                  </h4>
                </div>

                <div class="flex-shrink-0">
                  <!-- Changed from w-1/4 to flex-shrink-0 -->
                  <div
                    data-i18n
                    class="flex items-center justify-end italic font-semibold transition-colors duration-300 group-hover:text-primary"
                  >
                    {{
                      activePanelsPrices.includes(item.id)
                        ? $t("seeLess")
                        : $t("seeMore")
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
              </div>
            </AccordionHeader>

            <AccordionContent>
              <div class="flex flex-row px-4 pt-3">
                <p
                  data-i18n
                  class="text-justify text-gray-600 dark:text-gray-400"
                >
                  {{ $t(item.answer) }}
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
            v-for="item in personalItems"
            :key="item.id"
            :value="item.id"
            class="flex flex-col group rounded-xl border transition duration-300 border-black/10 bg-black/5 hover:bg-black/[0.075] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.075]"
          >
            <AccordionHeader class="px-2 py-1">
              <div
                class="flex justify-between items-center w-full px-4 py-3 gap-4"
              >
                <div class="flex-1">
                  <h4
                    data-i18n
                    class="font-medium text-gray-700 dark:text-gray-300"
                  >
                    {{ $t(item.question) }}
                  </h4>
                </div>

                <div class="flex-shrink-0">
                  <!-- Changed from w-1/4 to flex-shrink-0 -->
                  <div
                    data-i18n
                    class="flex items-center justify-end italic font-semibold transition-colors duration-300 group-hover:text-primary"
                  >
                    {{
                      activePanelsPersonal.includes(item.id)
                        ? $t("seeLess")
                        : $t("seeMore")
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
              </div>
            </AccordionHeader>

            <AccordionContent>
              <div class="flex flex-row px-4 pt-3">
                <p
                  data-i18n
                  class="text-justify text-gray-600 dark:text-gray-400"
                >
                  {{ $t(item.answer) }}
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
