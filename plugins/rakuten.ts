import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const rakutenInstance = axios.create({
    baseURL: "https://app.rakuten.co.jp/services/api", //置き換えるURL
  });

  nuxtApp.provide("axiosRakuten", rakutenInstance);
});
