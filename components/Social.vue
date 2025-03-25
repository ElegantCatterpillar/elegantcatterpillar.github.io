<script setup>
const socials = [
  {
    name: "GitHub",
    icon: "pi pi-github",
    link: "https://github.com/ElegantCatterpillar",
  },
  {
    name: "LinkedIn",
    icon: "pi pi-linkedin",
    link: "https://www.linkedin.com/in/oscarogm/",
  },
  {
    name: "WhatsApp",
    icon: "pi pi-whatsapp",
    link: "https://api.whatsapp.com/send/?phone=526622283222&text&type=phone_number&app_absent=0",
  },
];
</script>

<template>
  <div class="flex items-center justify-center gap-4 sm:gap-6">
    <NuxtLink
      v-for="social in socials"
      :key="social.name"
      :to="social.link"
      target="_blank"
      class="flex items-center justify-center"
      :aria-label="`Go to ${social.name} profile`"
    >
      <i
        class="text-2xl text-muted transition-all duration-300 hover:scale-125 hover:text-neutral-400"
        :class="social.icon"
        :alt="`${social.name}Logo`"
        :aria-label="`${social.name}Logo`"
      />
    </NuxtLink>
  </div>
</template>
