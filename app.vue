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
 */
const getRegiserDatafromDB = () => store.fetchRegisterData();

/**
 * 登録した商品を定期的に検索する
 */
let intervalId: number | null = null;

const searchRegisteredProducts = async () => {
  console.log("searchingRegisteredProducts");
  getRegiserDatafromDB(); // 括弧を追加して関数を実行
  const getProduct = async () => await store.getRegisteredProducts();
  if (intervalId === null) {
    intervalId = window.setInterval(getProduct, 6000);
  }
};

// コンポーネントがマウントされたときに商品を検索する
onMounted(() => {
  searchRegisteredProducts();
});

// コンポーネントがアンマウントされたときにインターバルをクリアする
onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>
