<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
const store = useIndexStore();

/**
 * DBから登録している商品を取得してくる
 *  */
const getRegiserDatafromDB = store.fetchRegisterData;

/**
 * 登録した商品を定期的に検索する
 */
let intervalId: number | null = null;

const searchRegisteredProducts = async () => {
  console.log("hello");

  getRegiserDatafromDB();
  const getProduct = async () => await store.getRegisteredProducts();
  if (intervalId === null) {
    intervalId = window.setInterval(getProduct, 6000);
  }
};
// 定期的に商品を検索する
onMounted(() => searchRegisteredProducts());
</script>
