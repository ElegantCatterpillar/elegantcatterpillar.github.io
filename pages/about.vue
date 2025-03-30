<template>
  <section
    class="relative pt-8 z-20 mx-auto flex max-w-4xl flex-col items-center justify-center gap-4 px-4 sm:px-0"
  >
    <h1
      data-i18n
      class="font-newsreader italic text-center text-4xl text-neutral-900 dark:text-white"
    >
      {{ $t("about") }}
    </h1>
    <h2
      data-i18n
      class="text-center text-lg font-extralight italic text-neutral-600 dark:text-neutral-400"
    >
      {{ $t("aboutDescription") }}
    </h2>
    <div class="w-full sm:w-[75%] h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"></div>

    <div
      class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"
    >
      <div class="flex flex-col items-center gap-4">
        <!-- Imagen -->
        <SpotlightImage
          class="mt-8"
          :src="ProfileImage"
          :square="true"
          :width="200"
          :height="200"
        />
        <Signature class="w-32 md:w-40" />
      </div>

      <div class="items-center flex flex-col gap-4 sm:ml-4">
        <h3 data-i18n class="text-lg">{{ $t("intro") }}</h3>
        <div data-i18n class="flex flex-col gap-4 text-primary">
          {{ $t("meDescription") }}
        </div>
        <SpotlightButton>
          <button
            data-i18n
            @click="downloadCV"
            class="flex items-center justify-between gap-2 px-2 py-2 text-lg text-neutral-900 dark:text-white font-medium"
          >
            <i class="pi pi-download"></i>
            <span class="ml-4">{{ $t("downloadCV") }}</span>
          </button>
        </SpotlightButton>
      </div>
    </div>

    <!-- Separador (sin cambios) -->
    <div
      class="w-[75%] h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"
    ></div>

    <Experiences class="w-full" :experiences="experiences || []" />

    <div
      class="w-[75%] h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-auto"
    ></div>

    <Stacks class="w-full" :stacks="stacks || []" />
  </section>
</template>

<script setup>
defineI18nRoute(false);
import ProfileImage from "~/public/images/me.jpg";

const { t, locale } = useI18n();

const experiences = [
  {
    title: "experiencesList.title1",
    company: "experiencesList.company1",
    date: "experiencesList.date1",
    description: "experiencesList.description1"
  },
  {
    title: "experiencesList.title2",
    company: "experiencesList.company2",
    date: "experiencesList.date2",
    description: "experiencesList.description2"
  },
];

const stacks = [
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
  {
    name: "netcore",
    link: "https://dotnet.microsoft.com/en-us/",
    image: "/images/stack/netcore.svg",
  },
  {
    name: "photoshop",
    link: "https://www.adobe.com/es/products/photoshop.html",
    image: "/images/stack/photoshop.svg",
  },
];

const downloadCV = () => {
  const filePath = `/documents/cv-${locale.value}.pdf`;
  fetch(filePath).then((response) => {
    if (response.ok) {
      const link = document.createElement("a");
      link.href = filePath;
      const fileNameRef = locale.value === "es" ? "CV" : "Resume";
      link.download = `Oswaldo Garcia ${fileNameRef}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(t("downloadError"));
    }
  });
};
</script>
