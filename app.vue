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
const getRegiserDatafromDB = () => {
  console.log("Fetching data from DB");
  store.fetchRegisterData();
};

/**
 * 登録した商品を定期的に検索する
 */
let intervalId: number | null = null;

const getProduct = async () => {
  console.log("Getting registered products:" + store.registerData.length);
  await store.getRegisteredProducts();
  console.log("Products fetched");
};

// １分ごとに、登録した商品を取得して、APIで商品を検索する
const searchRegisteredProducts = () => {
  console.log("searchingRegisteredProducts");
  console.log("Interval ID before setInterval:", intervalId);
  getRegiserDatafromDB();
  if (intervalId === null) {
    intervalId = window.setInterval(() => {
      getProduct();
    }, 60000);
  }
  console.log("Interval ID after setInterval:", intervalId);
};

// コンポーネントがマウントされたときに商品を検索する
onMounted(() => {
  console.log("Component mounted");
  searchRegisteredProducts();
});

// コンポーネントがアンマウントされたときにインターバルをクリアする
onUnmounted(() => {
  console.log("Component unmounted");
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
});
</script>
