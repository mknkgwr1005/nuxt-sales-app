<template>
  <div class="d-flex flex-wrap align-content-center justify-content-center">
    <v-text-field
      v-model="store.$state.inputValue"
      density="compact"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
      flat
      hide-details
      single-line
      app
      color="light"
      dense
    >
    </v-text-field>
    <v-row>
      <v-col cols="12">
        <v-btn-toggle
          v-model="store.$state.searchOption"
          mandatory
          class="mt-1"
          tile
        >
          <v-btn depressed :value="'yahoo'" @click="searchProducts">
            Yahooで検索
          </v-btn>
          <v-btn depressed :value="'rakuten'" @click="searchProducts">
            楽天で検索
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row
      v-if="
        store.$state.productList.length !== 0 ||
        store.$state.rktProductList.length !== 0
      "
    >
      <v-col cols="12" class="text-center">
        <v-btn class="filter-button" @click="setFilterOn">絞り込み</v-btn>
      </v-col>
    </v-row>
    <SearchOptions v-if="store.$state.filterOn === true" />
  </div>
</template>

<script setup lang="ts">
import { SearchOptions } from "#components";

const store = useIndexStore();
// 商品一覧を取得する
const searchProducts = async () => {
  console.log("search");

  const searchOption = store.$state.searchOption;

  if (searchOption === "yahoo") {
    store.getProductList();
    store.findCategoryDetail();
  } else if (searchOption === "rakuten") {
    store.getRktProductList();
    store.findRktChildCategory();
  } else {
    return;
  }
};
const setFilterOn = () => {
  store.setFilterOn();
  searchProducts();
};
</script>

<style scoped>
.filter-button {
  margin: 10px;
  background-color: lightblue;
}
</style>
