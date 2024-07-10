import { AxiosInstance } from "axios";

declare module "#app" {
  interface NuxtApp {
    $axios: AxiosInstance;
    $axiosRakuten: AxiosInstance;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $axiosRakuten: AxiosInstance;
  }
}
