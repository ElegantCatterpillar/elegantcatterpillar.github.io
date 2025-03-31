<template>
  <div class="flex flex-col gap-3">
    <h3 data-i18n class="text-white-shadow font-newsreader italic text-2xl">
      {{ $t("experiences") }}
    </h3>
    <p
      data-i18n
      class="text-md font-extralight italic text-neutral-600 dark:text-neutral-400"
    >
      {{ $t("experiencesDescription") }}
    </p>

    <Accordion
      :value="opcionPanels"
      multiple
      expandIcon="null"
      @update:value="handlePanelChange"
      collapseIcon="null"
      class="flex flex-col gap-3"
    >
      <AccordionPanel
        v-for="experience in experiences"
        :key="experience.title"
        :value="experience.id"
        class="flex flex-col group rounded-xl border transition duration-300 border-black/10 bg-black/5 hover:bg-black/[0.075] dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/[0.075]"
      >
        <AccordionHeader class="px-4 py-3" data-i18n>
          <div class="flex justify-between items-center w-full">
            <!-- Contenido izquierdo -->
            <div class="flex flex-col gap-1 w-3/4">
              <div class="flex items-center gap-2">
                <h4 class="text-primary text-lg">
                  {{ $t(experience.title) }}
                </h4>
              </div>
              <div
                class="flex gap-1 text-md text-neutral-600 dark:text-neutral-400 items-center flex-nowrap"
              >
                <span>{{ $t(experience.date) }}</span>
                <span class="mx-1">/</span>
                <span>{{ $t(experience.company) }}</span>
              </div>
            </div>

            <div
              class="flex items-center justify-end w-1/4 italic font-semibold transition-colors duration-300 group-hover:text-primary"
            >
              {{
                $t(opcionPanels.includes(experience.id) ? "seeLess" : "seeMore")
              }}
              <i
                class="ml-2 pi pi-plus text-md transition-all duration-300 ease-in-out"
                :class="{
                  'transform rotate-pro': opcionPanels.includes(experience.id),
                }"
              ></i>
            </div>
          </div>
        </AccordionHeader>

        <AccordionContent data-i18n>
          <div class="flex flex-row">
            <p class="pt-3 text-justify text-neutral-700 dark:text-neutral-300">
              {{ $t(experience.description) }}
            </p>
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  experiences: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const opcionPanels = ref([]);

const handlePanelChange = (newValue) => {
  opcionPanels.value = newValue;
};
</script>

<style scoped>
.rotate-pro {
  transform: rotate(495deg);
}
</style>