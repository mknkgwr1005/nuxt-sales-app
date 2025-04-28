import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: "/api/", // 無条件で "/api/" にする
  });

  nuxtApp.provide("axios", instance);
});
