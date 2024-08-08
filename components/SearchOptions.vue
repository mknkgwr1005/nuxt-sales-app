<template>
  <v-container>
    <v-row class="d-flex flex-wrap justify-center">
      <v-col cols="auto">
        <h4>キーワード</h4>
        <div>
          <v-chip
            v-for="keyword in splitKeyword"
            :key="keyword"
            class="ma-2"
            closable
            @click:close="removeKeyword(keyword)"
          >
            {{ keyword }}
          </v-chip>
        </div>
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
        <h4>商品価格</h4>
        <v-text-field label="最低価格" v-model="store.minPrice"></v-text-field>
        <v-text-field label="最高価格" v-model="store.maxPrice"></v-text-field>
        <h4>レビュー平均</h4>
        <div>
          <v-btn class="mb-2" @click="updateReviewStar(1)">
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            1.0~
          </v-btn>
        </div>
        <div>
          <v-btn class="mb-2" @click="updateReviewStar(2)">
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            2.0~
          </v-btn>
        </div>
        <div>
          <v-btn class="mb-2" @click="updateReviewStar(3)">
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            3.0~
          </v-btn>
        </div>
        <div>
          <v-btn class="mb-2" @click="updateReviewStar(4)">
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            4.0~
          </v-btn>
        </div>
        <div>
          <v-btn class="mb-2" @click="updateReviewStar(5)">
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            <v-icon class="yellow-star" icon="mdi-star"></v-icon>
            5.0~
          </v-btn>
        </div>
        <v-btn color="primary" class="mt-4" @click="sortGenre()"
          >絞り込み</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
const store = useIndexStore();

// searchKeywordをスペースで分割し、splitKeywordに設定
const splitKeyword = ref(store.searchKeyword.split(" "));

// キーワードを削除する関数
const removeKeyword = (deleteKeyword: string) => {
  // キーワードのリストを走査し、削除するキーワードの正しいインデックスを見つける
  const index = splitKeyword.value.findIndex(
    (keyword) => keyword === deleteKeyword
  );

  if (index !== -1) {
    // splitKeywordから削除
    splitKeyword.value.splice(index, 1);

    // store.searchKeywordを更新
    store.searchKeyword = splitKeyword.value.join(" ");
  }
};

const updateChildCategory = () => {
  if (store.genre !== "") {
    if (store.searchOption === "yahoo") {
      store.findCategoryDetail();
    } else if (store.searchOption === "rakuten") {
      store.findRktChildCategory();
    }
  }
};

const updateReviewStar = (value: number) => {
  store.reviewStar = value;
  sortGenre();
};

const sortGenre = () => {
  store.setFilterOn();
  useSearchProducts();
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

.yellow-star {
  color: #fad094;
}

.mb-2 {
  margin-bottom: 16px;
}

.mt-4 {
  margin-top: 32px;
}
</style>
