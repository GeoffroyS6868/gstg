// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { href: "https://fonts.googleapis.com", rel: "preconnect" },
        {
          crossorigin: "",
          href: "https://fonts.gstatic.com",
          rel: "preconnect",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&family=Instrument+Serif:ital@0;1&display=swap",
          rel: "stylesheet",
        },
        {
          href: "/favicon-light.ico",
          media: "(prefers-color-scheme: light)",
          rel: "icon",
        },
        {
          href: "/favicon-dark.ico",
          media: "(prefers-color-scheme: dark)",
          rel: "icon",
        },
      ],
    },
  },

  build: {
    analyze: false,
  },

  compatibilityDate: "2025-07-15",

  css: ["~/assets/css/main.css"],

  devtools: { enabled: false },

  modules: ["@nuxt/ui", "motion-v/nuxt"],
});
