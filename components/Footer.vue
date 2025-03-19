<template>
  <div class="bg-white text-gray-800 dark:bg-gray-800 dark:text-white footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4 class="text-lg font-semibold mb-2 dark:text-gray-100">
          Enlaces Rápidos
        </h4>
        <ul>
          <li>
            <a
              href="/"
              class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >Inicio</a
            >
          </li>
          <li>
            <a
              href="/about"
              class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >Acerca de</a
            >
          </li>
          <li>
            <a
              href="/portfolio"
              class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >Portafolio</a
            >
          </li>
          <li>
            <a
              href="/contact"
              class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >Contacto</a
            >
          </li>
        </ul>
      </div>
      <div class="footer-section">
        <h4 class="text-lg font-semibold mb-2 dark:text-gray-100">Contacto</h4>
        <p class="text-gray-700 dark:text-gray-300">
          Email: ejemplo@dominio.com
        </p>
        <p class="text-gray-700 dark:text-gray-300">Teléfono: +123 456 7890</p>
      </div>
      <div class="footer-section">
        <h4 class="text-lg font-semibold mb-2 dark:text-gray-100">Contactame</h4>
        <div class="social-links">
          <a
            href="https://api.whatsapp.com/send/?phone=526622283222&text&type=phone_number&app_absent=0"
            class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white pi pi-whatsapp"
          ></a>
          <a
            href="https://www.linkedin.com/in/oscarogm/"
            class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white pi pi-linkedin"
          ></a>
          <a
            href="https://github.com/ElegantCatterpillar"
            class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white pi pi-github"
          ></a>
        </div>
      </div>
    </div>
    <Divider/>
    <div class="footer-bottom border-t border-gray-200 dark:border-gray-700">
      <p class="text-gray-600 dark:text-gray-400">
        &copy; 2023 Tu Nombre. Todos los derechos reservados.
      </p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  padding: 20px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.footer-section {
  margin: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li a {
  text-decoration: none;
  line-height: 1.6;
}

.social-links a {
  margin: 0 10px;
  font-size: 1.5em;
}

.footer-bottom {
  padding-top: 10px;
}
</style>
