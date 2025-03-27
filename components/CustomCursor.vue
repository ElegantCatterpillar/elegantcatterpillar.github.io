<template>
  <!-- Contenedor principal del cursor -->
  <div class="fixed pointer-events-none z-[9999]">
    <!-- Cursor personalizado -->
    <div
      class="transform -translate-x-1/2 -translate-y-1/2"
      :style="{ left: `${x}px`, top: `${y}px` }"
    >
      <!-- Anillo exterior estático -->
      <div
        class="absolute -inset-1 rounded-full border-2 pointer-events-none"
        :class="isDark ? 'border-white/20' : 'border-black/20'"
      ></div>

      <!-- Anillo animado -->
      <div class="relative w-6 h-6 pointer-events-none">
        <!-- Modo Claro -->
        <div
          v-if="!isDark"
          class="absolute inset-0 rounded-full pointer-events-none"
          style="
            box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.8);
            animation: spin 2.5s linear infinite;
          "
        ></div>

        <!-- Modo Oscuro -->
        <div
          v-if="isDark"
          class="absolute inset-0 rounded-full pointer-events-none"
          style="
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.8);
            animation: spin 2.5s linear infinite;
          "
        ></div>

        <!-- Punto central -->
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full pointer-events-none"
          :class="isDark ? 'bg-white' : 'bg-black'"
        ></div>
      </div>
    </div>

    <!-- Canvas para el efecto de polvo de hadas (usando el método original) -->
    <canvas
      ref="dustCanvas"
      class="fixed top-0 left-0 pointer-events-none z-[9998] w-screen h-screen"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

// Posición del cursor
const x = ref(0);
const y = ref(0);
const lastX = ref(0);
const lastY = ref(0);
const isDark = ref(false);
const dustCanvas = ref(null);

// Variables para el efecto de polvo (fiel al original)
const particles = ref([]);
const animationFrame = ref(null);
const ctx = ref(null);
const canvImages = ref([]);
const possibleColors = ref({
  light: ["rgba(0,0,0,0.1)", "rgba(50,50,50,0.3)", "rgba(100,100,100,0.2)"],
  dark: [
    "rgba(255,255,255,0.9)",
    "rgba(200,200,200,0.8)",
    "rgba(150,150,150,0.7)",
  ],
});

// Inicializar efecto de polvo (fiel al original)
const initDustEffect = () => {
  if (!dustCanvas.value) return;

  dustCanvas.value.width = window.innerWidth;
  dustCanvas.value.height = window.innerHeight;
  ctx.value = dustCanvas.value.getContext("2d");

  // Configuración de texto igual al original
  ctx.value.font = "21px serif";
  ctx.value.textBaseline = "middle";
  ctx.value.textAlign = "center";

  // Crear imágenes de texto para cada color (como en el original)
  const char = "*";
  const colors = isDark.value
    ? possibleColors.value.dark
    : possibleColors.value.light;

  canvImages.value = [];
  colors.forEach((color) => {
    const measurements = ctx.value.measureText(char);
    const bgCanvas = document.createElement("canvas");
    const bgContext = bgCanvas.getContext("2d");

    bgCanvas.width = measurements.width;
    bgCanvas.height =
      measurements.actualBoundingBoxAscent +
      measurements.actualBoundingBoxDescent;

    bgContext.fillStyle = color;
    bgContext.textAlign = "center";
    bgContext.font = "21px serif";
    bgContext.textBaseline = "middle";
    bgContext.fillText(
      char,
      bgCanvas.width / 2,
      measurements.actualBoundingBoxAscent
    );

    canvImages.value.push(bgCanvas);
  });

  animateParticles();
};

// Agregar partícula (igual al original)
const addParticle = (x, y) => {
  if (canvImages.value.length === 0) return;

  particles.value.push(
    new Particle(
      x,
      y,
      canvImages.value[Math.floor(Math.random() * canvImages.value.length)]
    )
  );
};

// Clase Particle (igual al original)
class Particle {
  constructor(x, y, canvasItem) {
    const lifeSpan = Math.floor(Math.random() * 30 + 60);
    this.initialLifeSpan = lifeSpan;
    this.lifeSpan = lifeSpan;
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: Math.random() * 0.7 + 0.9,
    };
    this.position = { x: x, y: y };
    this.canv = canvasItem;
  }

  update(context) {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.lifeSpan--;
    this.velocity.y += 0.02;

    const scale = Math.max(this.lifeSpan / this.initialLifeSpan, 0);

    context.drawImage(
      this.canv,
      this.position.x - (this.canv.width / 2) * scale,
      this.position.y - this.canv.height / 2,
      this.canv.width * scale,
      this.canv.height * scale
    );
  }
}

// Animar partículas
const animateParticles = () => {
  if (!ctx.value) return;

  ctx.value.clearRect(0, 0, dustCanvas.value.width, dustCanvas.value.height);

  // Actualizar y dibujar partículas
  for (let i = particles.value.length - 1; i >= 0; i--) {
    const p = particles.value[i];
    p.update(ctx.value);

    if (p.lifeSpan < 0) {
      particles.value.splice(i, 1);
    }
  }

  animationFrame.value = requestAnimationFrame(animateParticles);
};

// Actualizar posición del cursor y agregar partículas
const updatePosition = (e) => {
  x.value = e.clientX;
  y.value = e.clientY;

  const dist = Math.sqrt(
    Math.pow(e.clientX - lastX.value, 2) + Math.pow(e.clientY - lastY.value, 2)
  );

  if (dist > 1.5) {
    addParticle(e.clientX, e.clientY);
    lastX.value = e.clientX;
    lastY.value = e.clientY;
  }
};

// Cambiar colores cuando cambia el tema
const updateDustColors = () => {
  initDustEffect(); // Recrear las imágenes de texto con los nuevos colores
};

// Verificar tema
const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains("dark");
};

// Inicializar
onMounted(() => {
  checkTheme();
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", checkTheme);
  window.addEventListener("mousemove", updatePosition);
  window.addEventListener("resize", () => {
    if (dustCanvas.value) {
      dustCanvas.value.width = window.innerWidth;
      dustCanvas.value.height = window.innerHeight;
    }
  });

  initDustEffect();
});

// Limpiar
onUnmounted(() => {
  window.removeEventListener("mousemove", updatePosition);
  cancelAnimationFrame(animationFrame.value);
  if (ctx.value) {
    ctx.value.clearRect(0, 0, dustCanvas.value.width, dustCanvas.value.height);
  }
});

// Observar cambios de tema
watch(isDark, updateDustColors);
</script>

<style>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Asegurar que el canvas ocupe toda la pantalla */
canvas {
  width: 100vw;
  height: 100vh;
}
</style>
