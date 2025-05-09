// nuxt.config.ts
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  app: {
    baseURL: "/", // 必須
  },
  nitro: {
    preset: "vercel", // ← []ではなく、stringで "vercel" と書くのが正しい
  },
  build: {
    transpile: ["vuetify"],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: "node",
      },
    },
  },
  modules: [
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins = config.plugins || [];
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      YAHOO_API_APPID: process.env.YAHOO_API_APPID,
      RAKUTEN_API_APPID: process.env.RAKUTEN_API_APPID,
      FIREBASE_APP_KEY: process.env.FIREBASE_APP_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      FIREBASE_APPID: process.env.FIREBASE_APPID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    },
  },
});
