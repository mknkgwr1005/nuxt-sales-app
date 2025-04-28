import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: (config.public.API_BASE_URL as string) || "/api/",
  });

  nuxtApp.provide("axios", instance);
});
