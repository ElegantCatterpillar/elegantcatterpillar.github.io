<template>
  <div class="flex flex-col h-screen">
    <NavBar />
    <div class="flex-1">
      <slot />
    </div>
    <Footer />
  </div>
</template>