<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">商品検索アプリ</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <QuickAnnouncement />
      </v-col>
    </v-row>

    <v-row class="d-flex flex-wrap align-content-center justify-content-center">
      <v-col cols="12">
        <SearchBar />
      </v-col>
    </v-row>

    <v-row v-if="store.$state.productList.length !== 0" justify="center">
      <v-col
        cols="auto"
        v-for="product of store.$state.productList"
        :key="product.index"
      >
        <v-card class="mb-3" :title="product.name">
          <v-img
            v-for="image of product.image"
            :key="image.small"
            class="align-end text-white"
            height="200"
            :src="image.medium ? image.medium : `~/assets/products/noimage.jpg`"
          ></v-img>
          <v-card-text>
            <h6 class="card-subtitle">&yen;{{ product.price }}</h6>
            <v-card-title text @click="sortGenre(product.genreCategory.id)">
              #{{ product.genreCategory.name }}
            </v-card-title>
            <p>{{ product.description }}</p>
            <v-btn color="primary" @click="goToUrl(product.url)"
              >購入する</v-btn
            >
            <v-btn color="success" @click="register(product)"
              >この商品を登録する</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="store.$state.rktProductList.length !== 0" justify="center">
      <v-col
        cols="auto"
        v-for="rktProduct of store.$state.rktProductList"
        :key="rktProduct.affiliateUrl"
      >
        <v-card class="mb-3" :title="rktProduct.itemName">
          <v-img
            :src="
              rktProduct.mediumImageUrls.length > 0
                ? rktProduct.mediumImageUrls[0].imageUrl
                : '../assets/products/noimage.jpg'
            "
            class="white--text"
            height="200px"
          ></v-img>
          <v-card-text>
            <h6 class="card-subtitle">&yen;{{ rktProduct.itemPrice }}</h6>
            <p>{{ rktProduct.itemCaption }}</p>
            <v-btn color="primary" @click="goToUrl(rktProduct.itemUrl)"
              >購入する</v-btn
            >
            <v-btn color="success" @click="register(rktProduct)"
              >この商品を登録する</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" class="overflow-auto">
        <v-pagination
          v-model="store.$state.currentPageNum"
          :length="store.$state.totalPageNum"
          :total-visible="10"
          first-icon="mdi-chevron-double-left"
          last-icon="mdi-chevron-double-right"
          @input="handlePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { QuickAnnouncement, SearchBar } from "#components";
// importすることによって、templateに表示される
import "../assets/products/noimage.jpg";
const store = useIndexStore();
// 速報する商品に登録する

const register = (product: any) => {
  store.setRegisterData(product);
};

// // 外部URLに遷移する
const goToUrl = (url: string) => {
  window.location.href = url;
};

const handlePage = async () => {
  if (store.$state.searchOption === "yahoo") {
    store.getProductList();
  } else {
    store.getRktProductList();
  }
};

const sortGenre = async (value: string) => {
  store.sortGenre(value);
  if (store.$state.searchOption === "yahoo") {
    store.getProductList;
  } else {
    store.getRktProductList;
  }
};
</script>

<style scoped>
.cards {
  width: 300px;
  justify-content: center;
}
</style>
payload: any, product: any$state: unknown, payload: string
