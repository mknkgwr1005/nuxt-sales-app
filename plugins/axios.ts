import axios from "axios";
//リクエストURLを指定する この場合はlocalhostのあとに、
// /api/をつけてあとはconfigにあるURLを追加する
export default defineNuxtPlugin((nuxtApp) => {
  const instance = axios.create({
    baseURL: "/api",
  });
  nuxtApp.provide("axios", instance);
});
