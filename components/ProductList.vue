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

    <v-row>
      <v-col cols="12">
        <SearchBar />
      </v-col>
    </v-row>

    <v-row v-if="store.productList.length !== 0" justify="center">
      <v-col
        cols="auto"
        v-for="product of store.productList"
        :key="product.index"
      >
        <v-card
          class="mb-3"
          :title="product.name"
          height="500px"
          :width="changeCardWidth(product.truncatedDescription)"
        >
          <v-img
            class="align-end text-white"
            height="200"
            :src="
              product.image.medium
                ? product.image.medium
                : `./assets/products/noimage.jpg`
            "
          ></v-img>
          <v-card-text>
            <h6 class="card-subtitle">&yen;{{ product.price }}</h6>
            <v-btn text @click="sortGenre(product.genreCategory.id)">
              #{{ product.genreCategory.name }}
            </v-btn>
            <p>{{ product.truncatedDescription }}</p>
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

    <v-row v-if="store.rktProductList.length !== 0" justify="center">
      <v-col
        cols="auto"
        v-for="rktProduct of store.rktProductList"
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

    <v-row v-if="store.totalPageNum > 0">
      <v-col cols="12" class="overflow-auto">
        <v-pagination
          v-model="store.currentPageNum"
          :length="store.totalPageNum"
          :total-visible="10"
          first-icon="mdi-chevron-double-left"
          last-icon="mdi-chevron-double-right"
          @update:modelValue="handlePage"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { QuickAnnouncement, SearchBar } from "#components";
import "../assets/products/noimage.jpg";
const store = useIndexStore();

const register = (product: any) => {
  store.setRegisterData(product);
};

const goToUrl = (url: string) => {
  window.location.href = url;
};

const handlePage = () => {
  if (store.searchOption === "yahoo") {
    store.getProductList();
  } else if (store.searchOption === "rakuten") {
    store.getRktProductList();
  }
};

const sortGenre = async (value: string) => {
  store.sortGenre(value);
  if (store.searchOption === "yahoo") {
    store.getProductList();
  } else {
    store.getRktProductList();
  }
};

const changeCardWidth = (description: string) => {
  const length = description.length;
  if (length < 50) {
    return "300px";
  } else if (length < 100) {
    return "400px";
  } else {
    return "500px";
  }
};
</script>

<style scoped>
.cards {
  width: 300px;
  justify-content: center;
}
</style>
