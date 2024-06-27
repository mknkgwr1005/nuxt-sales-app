<template>
  <v-container>
    <v-row class="d-flex flex-wrap justify-center">
      <v-col cols="auto">
        <v-form>
          <v-select
            v-model="store.$state.results"
            :items="store.$state.displayData"
            label="表示数"
            item-title="text"
            item-value="value"
            outlined
          ></v-select>
        </v-form>
      </v-col>
      <v-col cols="auto">
        <v-form>
          <v-select
            v-model="store.$state.sort"
            :items="store.$state.changeOrderData"
            label="並び順"
            default="title"
            item-title="text"
            item-value="value"
            outlined
          ></v-select>
        </v-form>
      </v-col>
      <v-col cols="auto">
        <v-form>
          <v-select
            v-if="store.$state.searchOption === 'yahoo'"
            v-model="store.$state.genre"
            :items="store.$state.yahooCategory"
            label="ジャンル"
            item-value="value"
            item-title="text"
            outlined
          />
          <v-select
            v-if="store.$state.searchOption === 'rakuten'"
            v-model="store.$state.genre"
            :items="store.$state.rktCategory"
            label="ジャンル"
            item-title="text"
            item-value="value"
            outlined
          ></v-select>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <p
          v-if="
            store.$state.productList.length !== 0 ||
            store.$state.rktProductList.length !== 0
          "
        >
          {{ store.$state.productsPerPage }}件表示
          {{ store.$state.totalProductsNum }}件ヒット
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useIndexStore } from "~/stores/index"; // ストアのインポート

const store = useIndexStore();

// resultsの監視
watch(
  () => store.$state.results,
  (val: number) => {
    if (val) {
      store.currentPageNum = 1;
    }
  }
);
</script>
