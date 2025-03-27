<template>
  <Html lang="en">
    <Body>
      <NuxtRouteAnnouncer />
      <NuxtLayout>
        <CustomCursor />
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup>
const title = "OswaldoDEV";
const description = "Your page description";
const image = "/images/me.jpg";
const url = "https://oswaldogm.com";

useHead({
  titleTemplate: "%s | Portafolio",
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "charset", content: "utf-8" },
    { name: "color-scheme", content: "light dark" },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    { rel: "canonical", href: url },
  ],
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: image,
  ogUrl: url,
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
});
</script>
