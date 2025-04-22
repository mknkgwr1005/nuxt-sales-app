import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    "@pinia/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
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
    // プロキシ設定
    server: {
      proxy: {
        "/api/": {
          target: "https://shopping.yahooapis.jp", //通信先
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""), //リクエストURLを上書きする
        },
      },
    },
  },
  devtools: { enabled: true },
  // envファイルを使うように設定
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL || "/api",
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
  nitro: {
    prerender: {
      routes: ["/"],
    },
  },
});
