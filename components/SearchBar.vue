<template>
  <v-container class="d-flex flex-wrap align-content-center">
    <div class="inputTextField">
      <v-text-field
        v-model="store.searchKeyword"
        @change="replaceSpaces"
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
      />
    </div>

    <v-row>
      <v-col cols="12">
        <v-btn-toggle v-model="store.searchOption" mandatory class="mt-1" tile>
          <v-btn :value="'yahoo'" @click="useSearchProducts()">
            Yahooで検索
          </v-btn>
          <v-btn :value="'rakuten'" @click="useSearchProducts()">
            楽天で検索
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row
      v-if="
        store.$state.productList.length !== 0 ||
        store.$state.rktProductList.length !== 0 ||
        store.filterOn
      "
    >
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const store = useIndexStore();

const replaceSpaces = () => {
  store.searchKeyword = store.searchKeyword.replace(/　/g, " ");
};
// resultsの監視
watch(
  () => store.searchOption,
  (newVal: string) => {
    if (newVal) {
      console.log("changed!" + newVal);
      store.resetStoreData();
    }
  }
);
</script>

<style scoped>
.inputTextField {
  width: 50%;
}
.filter-button {
  margin: 10px;
  background-color: lightblue;
}
</style>
