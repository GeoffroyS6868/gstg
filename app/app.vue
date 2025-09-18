<script lang="ts" setup>
const { locale } = useI18n();

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
    { rel: "canonical", href: "https://gstg.fr" },
  ],
  htmlAttrs: {
    lang: locale,
  },
});

useSeoMeta({
  title: "Geoffroy Stanger",
  ogTitle: "Geoffroy Stanger",
  description: "Geoffroy Stanger's Portfolio",
  ogDescription: "Geoffroy Stanger's Portfolio",
  applicationName: "Geoffroy Stanger's Portfolio",
  ogImageAlt: "Geoffroy Stanger's Portfolio",
  ogType: "website",
  ogUrl: "https://gstg.fr",
  ogImage: "https://gstg.fr/gstg.svg",
  ogImageHeight: 630,
  ogImageWidth: 1200,
  twitterCard: "summary_large_image",
  twitterTitle: "Geoffroy Stanger",
  twitterDescription: "Geoffroy Stanger's Portfolio",
  robots: "index, follow",
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
