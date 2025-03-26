<template>
  <header class="rounded-full">
    <SpotlightButton rounded transparent class="border border-white/10">
      <nav
        class="z-10 flex h-[50px] justify-around gap-1 p-1 transition-all duration-100 ease-in-out sm:h-[45px] sm:hover:gap-2"
      >
        <NuxtLink
          data-i18n
          v-for="item in navigation"
          v-show="item.show"
          :id="item.name.toLowerCase()"
          :key="item.name"
          :aria-label="item.name + ' navigation link'"
          v-tooltip.bottom="$t(item.name)"
          :class="[
            item.to === route.path
              ? 'border border-black/5 black:border-white/5 black:bg-zinc-900/50 black:text-white/75 text-dark/75 shadow-2xl shadow-black/50 black:shadow-white/50 backdrop-blur-3xl'
              : 'text-muted',
          ]"
          :to="item.to"
          class="flex items-center justify-center gap-1 rounded-full border border-transparent px-4 py-1 transition-all duration-100 ease-in-out black:hover:border-white/5 black:hover:bg-zinc-900/50 hover:border-black/5 hover:backdrop-blur-3xl sm:px-6"
        >
          <div class="flex flex-col items-center relative">
            <!-- Ícono y texto -->
            <div class="flex items-center gap-1">
              <!-- Ícono -->
              <span
                :id="item.name.toLowerCase()"
                :class="item.icon"
                class="flex items-center justify-center size-7 sm:size-6 mt-2"
              />

              <!-- Texto (oculto en pantallas pequeñas) -->
              <!-- <span class="hidden sm:flex items-center text-sm">{{
                $t(item.name)
              }}</span> -->
            </div>

            <!-- Línea simulada -->
            <div
              v-if="item.to === route.path"
              class="absolute bottom-[0px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-black dark:via-white to-transparent"
            ></div>
          </div>
        </NuxtLink>
      </nav>
    </SpotlightButton>
  </header>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getNavigation } from "../composables/useNavigation";

const route = useRoute();
const navigation = getNavigation;
</script>
