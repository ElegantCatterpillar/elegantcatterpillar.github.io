<template>
  <div class="flex justify-center">
    <SpotlightButton rounded cover class="relative w-48 h-48">
      <div class="relative w-full h-full flex items-center justify-center">
        <img
          :src="ProfileImage"
          alt="Foto de perfil"
          class="w-full h-full object-cover rounded-full pointer-events-none scale-95"
        />
      </div>
    </SpotlightButton>
  </div>
</template>

<script setup>
import ProfileImage from "~/assets/images/me.jpg";
</script>
