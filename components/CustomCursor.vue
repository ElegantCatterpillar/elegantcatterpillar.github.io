<template>
  <!-- Contenedor principal -->
  <div class="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
    <!-- Cursor visual -->
    <div
      class="absolute pointer-events-none"
      :style="{ left: `${x}px`, top: `${y}px` }"
      ref="cursor"
    >
      <!-- Contenedor de transformación central -->
      <div class="relative transform -translate-x-1/2 -translate-y-1/2">
        <!-- Anillo exterior estático (32x32) -->
        <div
          class="absolute w-8 h-8 rounded-full border-2 transition-all duration-150"
          :class="[isDark ? 'border-white/30' : 'border-black/30']"
          style="left: -16px; top: -16px"
          ref="outerRing"
          :key="'outerRing' + isDark"
        ></div>

        <!-- Anillo animado con efecto spotlight (24x24) -->
        <div
          class="absolute w-6 h-6 rounded-full pointer-events-none transition-all duration-300"
          style="left: -12px; top: -12px"
          ref="middleRing"
          :key="'middleRing' + isDark"
        >
          <!-- Usamos v-show en lugar de v-if para mejor performance -->
          <div
            v-show="!isDark"
            class="absolute inset-0 rounded-full animate-spin opacity-90"
            style="
              background: conic-gradient(
                from 0deg at 50% 50%,
                rgba(0, 0, 0, 0.9) 0deg,
                transparent 60deg,
                transparent 300deg,
                rgba(0, 0, 0, 0.9) 360deg
              );
              animation-duration: 2.5s;
            "
            :key="'lightConic' + isDark"
          ></div>

          <div
            v-show="isDark"
            class="absolute inset-0 rounded-full animate-spin opacity-90"
            style="
              background: conic-gradient(
                from 0deg at 50% 50%,
                rgba(255, 255, 255, 0.9) 0deg,
                transparent 60deg,
                transparent 300deg,
                rgba(255, 255, 255, 0.9) 360deg
              );
              animation-duration: 2.5s;
            "
            :key="'darkConic' + isDark"
          ></div>
        </div>

        <!-- Punto central -->
        <div
          class="absolute w-2 h-2 rounded-full transition-all duration-200"
          :class="{
            'bg-black': !isDark && !isHovering,
            'bg-white': isDark && !isHovering,
            'scale-[1.25]': isHovering,
            '!bg-black': isHovering && !isDark,
            '!bg-white': isHovering && isDark,
          }"
          style="left: -4px; top: -4px"
          ref="dot"
          :key="'dot' + isDark"
        ></div>
      </div>
    </div>

    <!-- Canvas para el efecto de polvo -->
    <canvas
      ref="dustCanvas"
      class="fixed top-0 left-0 pointer-events-none z-[9998] w-screen h-screen"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";

// Posición del cursor
const x = ref(0);
const y = ref(0);
const lastX = ref(0);
const lastY = ref(0);
const isDark = ref(false);
const isHovering = ref(false);
const isClicking = ref(false);
const dustCanvas = ref(null);
const cursor = ref(null);
const outerRing = ref(null);
const middleRing = ref(null);
const dot = ref(null);

// Variables para el efecto de polvo
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

// Inicializar efecto de polvo
const initDustEffect = () => {
  if (!dustCanvas.value) return;

  dustCanvas.value.width = window.innerWidth;
  dustCanvas.value.height = window.innerHeight;
  ctx.value = dustCanvas.value.getContext("2d");

  // Configuración de texto
  ctx.value.font = "21px serif";
  ctx.value.textBaseline = "middle";
  ctx.value.textAlign = "center";

  // Crear imágenes de texto para cada color
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

// Clase Particle
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

// Agregar partícula
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

// Efecto de click
const handleClick = () => {
  isClicking.value = true;

  if (outerRing.value && middleRing.value && dot.value) {
    outerRing.value.style.transform = "scale(1.3)";
    middleRing.value.style.transform = "scale(1.2)";

    setTimeout(() => {
      if (outerRing.value && middleRing.value) {
        outerRing.value.style.transform = "";
        middleRing.value.style.transform = "";
      }
    }, 100);
  }

  setTimeout(() => {
    isClicking.value = false;
  }, 150);
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

  // Verificar si estamos sobre un elemento interactivo
  const target = e.target;
  const interactiveElements = [
    "A",
    "BUTTON",
    "INPUT",
    "TEXTAREA",
    "SELECT",
    "LABEL",
    '[role="button"]',
  ];

  isHovering.value = interactiveElements.some((selector) => {
    if (typeof selector === "string") {
      return target.matches(selector) || target.closest(selector);
    }
    return false;
  });
};

// Cambiar colores cuando cambia el tema
const updateDustColors = () => {
  initDustEffect();
};

// Verificar tema
const checkTheme = () => {
  const newValue = document.documentElement.classList.contains("dark");
  if (isDark.value !== newValue) {
    isDark.value = newValue;
    // Forzar actualización del DOM
    nextTick(() => {
      updateDustColors();
    });
  }
};
// Aplicar cursor none a todos los elementos
const applyCursorNone = () => {
  const style = document.createElement("style");
  style.innerHTML = `
    * {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);
};

// Inicializar
onMounted(() => {
  checkTheme();
  applyCursorNone();

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", checkTheme);
  window.addEventListener("mousemove", updatePosition);
  window.addEventListener("click", handleClick);
  window.addEventListener("resize", () => {
    if (dustCanvas.value) {
      dustCanvas.value.width = window.innerWidth;
      dustCanvas.value.height = window.innerHeight;
    }
  });

  // Observar cambios en el DOM para aplicar cursor: none a nuevos elementos
  const observer = new MutationObserver(() => {
    applyCursorNone();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  initDustEffect();
});

// Limpiar
onUnmounted(() => {
  window.removeEventListener("mousemove", updatePosition);
  window.removeEventListener("click", handleClick);
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
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin linear infinite;
}

/* Transiciones suaves para los efectos */
.transition-all {
  transition-property: all;
}
.duration-150 {
  transition-duration: 150ms;
}
.duration-200 {
  transition-duration: 200ms;
}
.duration-300 {
  transition-duration: 300ms;
}
.scale-150 {
  transform: scale(1.5);
}

.border-white\/30,
.border-black\/30,
.bg-white,
.bg-black {
  transition: border-color 0.3s ease, background-color 0.3s ease;
}
</style>
