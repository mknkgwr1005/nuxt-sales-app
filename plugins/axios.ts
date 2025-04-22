import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.API_BASE_URL as string, // envファイルに応じて切り替わる
  });

  nuxtApp.provide("axios", instance);
});

// import axios from "axios";
// //リクエストURLを指定する この場合はlocalhostのあとに、
// // /api/をつけてあとはconfigにあるURLを追加する
// export default defineNuxtPlugin((nuxtApp) => {
//   const instance = axios.create({
//     baseURL: "/api",
//   });
//   nuxtApp.provide("axios", instance);
// });
