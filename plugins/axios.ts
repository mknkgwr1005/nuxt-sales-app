import axios from "axios";
// plugins/axios.ts
export default defineNuxtPlugin((nuxtApp) => {
  const axiosInstance = axios.create({
    baseURL: "https://shopping.yahooapis.jp/",
  });

  nuxtApp.provide("axios", axiosInstance);
});
