import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/eslint", "nuxt-mdi", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  components: [
    { path: "~/components", pathPrefix: false },
    { path: "~/components/chat/input-box", pathPrefix: false },
    { path: "~/components/chat/message", pathPrefix: false }
  ]
});
