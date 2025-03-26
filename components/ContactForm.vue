<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import * as z from 'zod'

const toast = useToast()

// Esquema de validación con Zod
const schema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().min(2, 'Too short'),
  name: z.string().optional()
})

// Estado reactivo del formulario
const formData = ref({
  email: '',
  message: '',
  name: ''
})

// Errores de validación
const errors = ref({})

// Validar formulario
const validateForm = () => {
  try {
    schema.parse(formData.value)
    errors.value = {}
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = error.formErrors.fieldErrors
    }
    return false
  }
}

// Enviar formulario
const onSubmit = async () => {
  if (!validateForm()) {
    toast.add({
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields correctly',
      life: 3000
    })
    return
  }

  try {
    await $fetch('/api/send', {
      method: 'POST',
      body: formData.value
    })
    
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Your message has been sent!',
      life: 3000
    })
    
    // Resetear formulario después del envío exitoso
    formData.value = { email: '', message: '', name: '' }
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred while sending your message',
      life: 3000
    })
  }
}
</script>

<template>
  <form 
    @submit.prevent="onSubmit"
    class="mt-6 flex flex-col gap-4 w-full max-w-md mx-auto"
  >
    <!-- Campo Nombre -->
    <div class="flex flex-col gap-1">
      <label for="name" class="text-sm font-medium text-gray-700 dark:text-gray-300">Name (Optional)</label>
      <InputText 
        id="name"
        v-model="formData.name"
        placeholder="Your name"
        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />
      <small v-if="errors.name" class="text-red-500 text-xs">{{ errors.name[0] }}</small>
    </div>

    <!-- Campo Email -->
    <div class="flex flex-col gap-1">
      <label for="email" class="text-sm font-medium text-gray-700 dark:text-gray-300">Email*</label>
      <InputText 
        id="email"
        v-model="formData.email"
        type="email"
        placeholder="Your email"
        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        :class="{ 'border-red-500': errors.email }"
      />
      <small v-if="errors.email" class="text-red-500 text-xs">{{ errors.email[0] }}</small>
    </div>

    <!-- Campo Mensaje -->
    <div class="flex flex-col gap-1">
      <label for="message" class="text-sm font-medium text-gray-700 dark:text-gray-300">Message*</label>
      <Textarea
        id="message"
        v-model="formData.message"
        placeholder="Your message"
        :rows="4"
        class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        :class="{ 'border-red-500': errors.message }"
      />
      <small v-if="errors.message" class="text-red-500 text-xs">{{ errors.message[0] }}</small>
    </div>

    <!-- Botón de envío -->
    <Button
      type="submit"
      label="Send Message"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
    />
  </form>
</template>