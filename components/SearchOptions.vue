<template>
  <v-container>
    <v-row class="d-flex flex-wrap justify-center">
      <v-col cols="auto">
        <v-form>
          <v-select
            v-model="store.results"
            :items="store.displayData"
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
            v-model="store.sort"
            :items="store.changeOrderData"
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
            v-if="store.searchOption === 'yahoo'"
            v-model="store.genre"
            :items="store.yahooCategory"
            label="ジャンル"
            item-value="value"
            item-title="text"
            type="input"
            @update:modelValue="updateChildCategory"
            outlined
          />
          <v-select
            v-if="store.searchOption === 'rakuten'"
            v-model="store.genre"
            :items="store.rktCategory"
            label="ジャンル"
            item-title="text"
            item-value="value"
            @update:modelValue="updateChildCategory"
            outlined
          ></v-select>
        </v-form>
        <v-form>
          <v-select
            v-if="store.genre"
            :items="store.childGenre"
            label="子カテゴリ"
            item-value="value"
            item-title="text"
            outlined
          />
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

const updateChildCategory = () => {
  console.log("showing this ChildCategory:" + store.$state.genre);

  if (store.$state.genre !== "") {
    if (store.$state.searchOption === "yahoo") {
      store.findCategoryDetail();
    } else if (store.$state.searchOption === "rakuten") {
      store.findRktChildCategory();
    }
  }
};

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
