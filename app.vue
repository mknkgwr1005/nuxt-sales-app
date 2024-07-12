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
const getRegiserDatafromDB = store.fetchRegisterData;

/**
 * 登録した商品を定期的に検索する
 */
let intervalId: number | null = null;

const searchRegisteredProducts = async () => {
  console.log("searchingRegisteredProducts");
  // この部分で registerData の更新をしないか、必要であれば特定の更新のみ行う
  getRegiserDatafromDB;
  const getProduct = async () => await store.getRegisteredProducts();
  if (intervalId === null) {
    intervalId = window.setInterval(getProduct, 6000);
  }
};

// コンポーネントがマウントされたときに商品を検索する
onMounted(() => searchRegisteredProducts());

// registerDataが更新されたら、再度商品を検索する
// watch(
//   () => store.registerData,
//   (newVal: any, oldVal: any) => {
//     if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
//       console.log("registerData has been changed");
//       searchRegisteredProducts();
//       refreshNuxtData();
//     }
//   },
//   { deep: true } // 深いウォッチを有効にする
// );

// コンポーネントがアンマウントされたときにインターバルをクリアする
// onUnmounted(() => {
//   if (intervalId !== null) {
//     console.log("unmounted");
//     clearInterval(intervalId);
//   }
// });
</script>
