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
  description: "Software Engineer at Join.",
  ogDescription: "Software Engineer at Join.",
  ogImage: "https://gstg.fr/gstg.svg",
  ogImageAlt: "Geoffroy Stanger",
  ogImageHeight: 630,
  ogImageWidth: 1200,
  ogTitle: "Geoffroy Stanger",
  ogType: "website",
  ogUrl: "https://gstg.fr",
  robots: "index, follow",
  title: "Geoffroy Stanger",
  twitterCard: "summary_large_image",
  twitterDescription: "Software Engineer at Join.",
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
