import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint", "nuxt-mdi", "@vueuse/nuxt", "@nuxt/test-utils/module"],
  css: ["~/assets/css/main.css"],
  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/components/chat/input-box", pathPrefix: false },
    { path: "~/components/chat/message", pathPrefix: false },
    { path: "~/components/sidebar", pathPrefix: false }
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: ""
    }
  },
  experimental: {
    appManifest: false
  },
  devServer: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000
  }
});
