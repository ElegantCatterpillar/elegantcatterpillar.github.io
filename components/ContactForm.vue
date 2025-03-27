<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import * as z from "zod";

const toast = useToast();

// Esquema de validación con Zod
const schema = z.object({
  email: z.string().email("Invalid email"),
  message: z.string().min(2, "Too short"),
  subject: z.string().min(2, "Subject is required"),
  name: z.string().optional(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}$/.test(val),
      {
        message: "Please enter a valid phone number with country code",
      }
    ),
});

// Estado reactivo del formulario
const formData = ref({
  email: "",
  message: "",
  subject: "",
  name: "",
  phone: "",
});

// Errores de validación
const errors = ref({});

// Validar formulario
const validateForm = () => {
  try {
    schema.parse(formData.value);
    errors.value = {};
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = error.formErrors.fieldErrors;
    }
    return false;
  }
};

// Enviar formulario
const onSubmit = async () => {
  if (!validateForm()) {
    toast.add({
      severity: "error",
      summary: "Validation Error",
      detail: "Please fill in all required fields correctly",
      life: 3000,
    });
    return;
  }

  try {
    await $fetch("/api/send", {
      method: "POST",
      body: formData.value,
    });

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Your message has been sent!",
      life: 3000,
    });

    // Resetear formulario después del envío exitoso
    formData.value = {
      email: "",
      message: "",
      subject: "",
      name: "",
      phone: "",
    };
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "An error occurred while sending your message",
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <form
      @submit.prevent="onSubmit"
      class="mt-6 flex flex-col gap-6 w-full max-w-4xl mx-auto p-6 rounded-xl border border-neutral-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg shadow-zinc-200/50 dark:shadow-zinc-950/50"
    >
      <!-- Primera fila: Nombre y Email -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Nombre -->
        <div class="flex flex-col gap-2">
          <label
            for="name"
            class="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300"
            data-i18n
            >{{ $t("contactForm.nameLabel") }}</label
          >
          <div class="relative">
            <InputText
              id="name"
              data-i18n
              v-model="formData.name"
              :placeholder="$t('contactForm.namePlaceholder')"
              class="w-full p-2 sm:p-3 text-xs sm:text-sm border border-neutral-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/50 dark:bg-zinc-800/50 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-200"
            />
          </div>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label
            for="email"
            class="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300"
            data-i18n
            >{{ $t("contactForm.emailLabel") }}</label
          >
          <div class="relative">
            <InputText
              id="email"
              data-i18n
              v-model="formData.email"
              type="email"
              :placeholder="$t('contactForm.emailPlaceholder')"
              class="w-full p-2 sm:p-3 text-xs sm:text-sm border border-neutral-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/50 dark:bg-zinc-800/50 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-200"
              :class="{ 'border-red-500/90 dark:border-red-400': errors.email }"
            />
          </div>
          <small
            data-i18n
            v-if="errors.email"
            class="text-xs text-red-500/90 dark:text-red-400 mt-1"
            >{{ $t(`validation.${errors.email[0]}`) }}</small
          >
        </div>
      </div>

      <!-- Segunda fila: Teléfono y Asunto -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Teléfono -->
        <div class="flex flex-col gap-2">
          <label
            for="phone"
            class="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300"
            data-i18n
          >
            {{ $t("contactForm.phoneLabel") }}
            <span
              class="text-[0.65rem] sm:text-xs text-neutral-500 dark:text-neutral-400"
              >{{ $t("contactForm.phoneHint") }}</span
            >
          </label>
          <div class="relative">
            <InputText
              id="phone"
              data-i18n
              v-model="formData.phone"
              type="tel"
              :placeholder="$t('contactForm.phonePlaceholder')"
              class="w-full p-2 sm:p-3 text-xs sm:text-sm border border-neutral-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/50 dark:bg-zinc-800/50 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-200"
            />
          </div>
          <small
            data-i18n
            v-if="errors.phone"
            class="text-xs text-red-500/90 dark:text-red-400 mt-1"
            >{{ $t(`validation.${errors.phone[0]}`) }}</small
          >
        </div>

        <!-- Asunto -->
        <div class="flex flex-col gap-2">
          <label
            for="subject"
            class="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300"
            data-i18n
            >{{ $t("contactForm.subjectLabel") }}</label
          >
          <div class="relative">
            <InputText
              id="subject"
              data-i18n
              v-model="formData.subject"
              :placeholder="$t('contactForm.subjectPlaceholder')"
              class="w-full p-2 sm:p-3 text-xs sm:text-sm border border-neutral-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/50 dark:bg-zinc-800/50 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-200"
              :class="{
                'border-red-500/90 dark:border-red-400': errors.subject,
              }"
            />
          </div>
          <small
            v-if="errors.subject"
            data-i18n
            class="text-xs text-red-500/90 dark:text-red-400 mt-1"
            >{{ $t(`validation.${errors.subject[0]}`) }}</small
          >
        </div>
      </div>

      <!-- Tercera fila: Mensaje (ocupará todo el ancho) -->
      <div class="flex flex-col gap-2">
        <label
          for="message"
          class="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300"
          data-i18n
          >{{ $t("contactForm.messageLabel") }}</label
        >
        <div class="relative">
          <Textarea
            data-i18n
            id="message"
            v-model="formData.message"
            :placeholder="$t('contactForm.messagePlaceholder')"
            :rows="5"
            class="w-full p-2 sm:p-3 text-xs sm:text-sm border border-neutral-200 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/50 dark:bg-zinc-800/50 text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 transition-all duration-200"
            :class="{ 'border-red-500/90 dark:border-red-400': errors.message }"
          />
        </div>
        <small
          data-i18n
          v-if="errors.message"
          class="text-xs text-red-500/90 dark:text-red-400 mt-1"
          >{{ $t(`validation.${errors.message[0]}`) }}</small
        >
      </div>

      <!-- Botón de envío -->
      <div class="mt-2">
        <SpotlightButton as="button" type="submit" class="w-full">
          <div
            class="relative py-3 sm:py-4 z-10 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-neutral-900 dark:text-white transition-all duration-200 hover:text-neutral-600 dark:hover:text-neutral-300"
            data-i18n
          >
            {{ $t("worktogether") }}
            <i class="pi pi-send text-xs sm:text-sm" />
          </div>
        </SpotlightButton>
      </div>
    </form>
  </div>
</template>
