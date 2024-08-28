import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  build: {
    transpile: ["vuetify", "firebase"],
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
  plugins: [{ src: "~/firebase/config.ts", mode: "client" }],
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
      YAHOO_API_APPID: process.env.YAHOO_API_APPID,
      RAKUTEN_API_APPID: process.env.RAKUTEN_API_APPID,
    },
  },
});
