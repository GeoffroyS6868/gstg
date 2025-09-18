// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "icon",
          href: "/favicon-light.ico",
          media: "(prefers-color-scheme: light)",
        },
        {
          rel: "icon",
          href: "/favicon-dark.ico",
          media: "(prefers-color-scheme: dark)",
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

  i18n: {
    langDir: "locales",
    locales: [
      { code: "en", language: "en-US", file: "en-US.json" },
      { code: "fr", language: "fr-FR", file: "fr-FR.json" },
    ],
    defaultLocale: "en",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      fallbackLocale: "en",
    },
    compilation: {
      strictMessage: false,
    },
  },

  modules: ["@nuxt/ui", "@nuxtjs/i18n", "v-gsap-nuxt"],
});
