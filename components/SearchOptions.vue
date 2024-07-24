<template>
  <v-container>
    <v-row class="d-flex flex-wrap justify-center">
      <v-col cols="auto">
        <p>キーワード</p>
        <v-chip>
          {{ store.inputValue }}
        </v-chip>
        <div>　　</div>
        <v-form>
          <v-select
            class="display-data option"
            v-model="store.results"
            :items="store.displayData"
            label="表示数"
            item-title="text"
            item-value="value"
            outlined
          ></v-select>
        </v-form>
        <v-form>
          <v-select
            class="change-order option"
            v-model="store.sort"
            :items="store.changeOrderData"
            label="並び順"
            default="title"
            item-title="text"
            item-value="value"
            outlined
          ></v-select>
        </v-form>
        <v-form>
          <v-select
            class="genre option"
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
            class="genre option"
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
            class="child-genre"
            v-if="store.genre && store.childGenre.length !== 0"
            :items="store.childGenre"
            label="子カテゴリ"
            item-value="value"
            item-title="text"
            outlined
          />
        </v-form>
        <v-btn color="primary" @click="useSearchProducts()">絞り込み</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const store = useIndexStore();

const updateChildCategory = () => {
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
  () => store.results,
  (val: number) => {
    if (val) {
      console.log(val);
      store.currentPageNum = 1;
    }
  }
);
</script>

<style scoped>
.option {
  width: 200px;
}
</style>
