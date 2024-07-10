import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: "/api", //localhostのあとにつける文字列
  });
  nuxtApp.provide("axios", instance);
});
