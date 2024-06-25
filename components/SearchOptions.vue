<template>
  <div>
    <div
      class="container filter-option d-flex flex-wrap justify-content-center"
    >
      <b-form-group inline>
        <label class="mr-sm-2" for="displayDataNum">表示数：</label>
        <b-form-select
          id="displayDataNum"
          class="mb-2 mr-sm-2 mb-sm-0"
          :options="store.$state.displayData"
          v-model="store.$state.results"
        ></b-form-select>
      </b-form-group>
      <b-form-group inline>
        <label class="mr-sm-2" for="orderData">並び順：</label>
        <b-form-select
          id="orderData"
          class="mb-2 mr-sm-2 mb-sm-0"
          value="title"
          :options="store.$state.changeOrderData"
          v-model="store.$state.sort"
        ></b-form-select>
      </b-form-group>
      <b-form-group inline>
        <label class="mr-sm-2" for="orderData">ジャンル：</label>
        <b-form-select
          v-if="store.$state.searchOption === 'yahoo'"
          id="orderData"
          class="mb-2 mr-sm-2 mb-sm-0 yahooOptions"
          value="title"
          :options="store.$state.yahooCategory"
          v-model="store.$state.genre"
        ></b-form-select>
        <b-form-select
          v-if="store.$state.searchOption === 'rakuten'"
          id="orderData"
          class="mb-2 mr-sm-2 mb-sm-0 rakutenOptions"
          value="title"
          :options="store.$state.rktCategory"
          v-model="store.$state.genre"
        ></b-form-select>
      </b-form-group>
    </div>
    <div class="displayDataHit">
      <p
        v-if="
          store.$state.productList.length !== 0 ||
          store.$state.rktProductList.length !== 0
        "
      >
        {{ store.$state.productsPerPage }}件表示
        {{ store.$state.totalProductsNum }}件ヒット
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useIndexStore } from "~/stores/index"; // ストアのインポート

const store = useIndexStore();

// 商品一覧を取得する
const searchProducts = async () => {
  const searchOption = store.searchOption;

  if (searchOption === "yahoo") {
    await store.getProductList();
  } else if (searchOption === "rakuten") {
    await store.getRktProductList();
  } else {
    return;
  }
};

// resultsの監視
watch(
  () => store.results,
  (val: number) => {
    if (val) {
      store.currentPageNum = 1;
    }
  }
);
</script>
