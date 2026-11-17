<script lang="ts" setup>
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    { href: "/favicon.ico", rel: "icon" },
    { href: "https://gstg.fr", rel: "canonical" },
  ],
  meta: [
    { charset: "utf-8" },
    { content: "width=device-width, initial-scale=1", name: "viewport" },
  ],
});

useSeoMeta({
  applicationName: "Geoffroy Stanger",
  description: "Software Engineer at Join Stories.",
  ogDescription: "Software Engineer at Join Stories.",
  ogImage: "https://gstg.fr/og.png",
  ogImageAlt: "Geoffroy Stanger",
  ogImageHeight: 630,
  ogImageType: "image/png",
  ogImageWidth: 1200,
  ogTitle: "Geoffroy Stanger",
  ogType: "website",
  ogUrl: "https://gstg.fr",
  robots: "index, follow",
  title: "Geoffroy Stanger",
  twitterCard: "summary_large_image",
  twitterDescription: "Software Engineer at Join Stories.",
  twitterImage: "https://gstg.fr/og.png",
  twitterTitle: "Geoffroy Stanger",
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
