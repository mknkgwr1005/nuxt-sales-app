<template>
  <v-container fluid>
    <!-- Header -->
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12">
        <img v-if="!isMobile" src="../assets/img/main.png" alt="" />
      </v-col>
    </v-row>
    <!-- 入荷情報 -->
    <v-row align="center" justify="center" class="text-center">
      <v-col cols="12">
        <QuickAnnouncement />
      </v-col>
    </v-row>
    <!-- 検索バー -->
    <v-row v-if="!isMobile" align="center" justify="center" class="text-center">
      <v-col cols="12">
        <SearchBar />
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row>
      <!-- Sidebar (Search Options) -->
      <v-col
        cols="3"
        v-if="
          !isMobile &&
          (store.productList.length !== 0 || store.rktProductList.length !== 0)
        "
      >
        <v-card class="mb-3" height="auto" :width="changeOptionWidth">
          <SearchOptions />
        </v-card>
      </v-col>
      <v-row
        rows="3"
        v-if="
          !isMobile &&
          (store.productList.length !== 0 || store.rktProductList.length !== 0)
        "
      >
        {{ store.productsPerPage }}件表示 {{ store.totalProductsNum }}件ヒット
        <v-card class="mb-3" height="auto" :width="changeOptionWidth">
          <SearchOptions />
        </v-card>
      </v-row>

      <!-- Product List -->
      <v-col cols="9" justify="center" align="center" width="100%">
        <div
          width="100%"
          v-if="
            !isMobile &&
            (store.productList.length !== 0 ||
              store.rktProductList.length !== 0)
          "
        >
          {{ store.productsPerPage }}件表示 {{ store.totalProductsNum }}件ヒット
        </div>
        <v-row
          v-if="store.productList.length !== 0"
          justify="space-around"
          width="500px"
        >
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
                <v-btn @click="sortGenre(product.genreCategory.id)">
                  #{{ product.genreCategory.name }}
                </v-btn>
                <p>{{ product.truncatedDescription }}</p>
                <div>
                  <h5>平均レビュー：{{ product.review.rate }}</h5>
                  <v-icon
                    v-for="(star, index) of Math.floor(product.review.rate)"
                    :key="index"
                    class="yellow-star"
                    icon="mdi-star"
                  ></v-icon>
                  <v-icon
                    v-if="
                      Math.floor(product.review.rate) % product.review.rate !==
                        0 || product.review.rate > 0
                    "
                    class="yellow-star"
                    icon="mdi-star-half-full"
                  ></v-icon>
                </div>
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

        <v-row v-if="store.rktProductList.length !== 0" justify="space-around">
          <v-col
            cols="auto"
            v-for="rktProduct of store.rktProductList"
            :key="rktProduct.affiliateUrl"
          >
            <v-card
              class="mb-3"
              :title="rktProduct.itemName"
              height="500px"
              :width="changeCardWidth(rktProduct.truncatedDescription)"
            >
              <v-img
                :src="
                  rktProduct.mediumImageUrls
                    ? rktProduct.mediumImageUrls[0].imageUrl
                    : '../assets/products/noimage.jpg'
                "
                class="white--text"
                height="200px"
              ></v-img>
              <v-card-text>
                <h6 class="card-subtitle">&yen;{{ rktProduct.itemPrice }}</h6>
                <p>{{ rktProduct.truncatedDescription }}</p>
                <div>
                  <h5>平均レビュー：{{ rktProduct.reviewAverage }}</h5>
                  <v-icon
                    v-for="(star, index) of Math.floor(
                      rktProduct.reviewAverage
                    )"
                    :key="index"
                    class="yellow-star"
                    icon="mdi-star"
                  ></v-icon>
                  <v-icon
                    v-if="
                      Math.floor(rktProduct.reviewAverage) %
                        rktProduct.reviewAverage !==
                        0 || rktProduct.reviewAverage !== 0
                    "
                    class="yellow-star"
                    icon="mdi-star-half-full"
                  ></v-icon>
                </div>
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

        <!-- Pagination -->
        <v-row justify="center" align="center">
          <v-col cols="auto" class="overflow-auto">
            <v-pagination
              v-if="store.totalPageNum > 0"
              v-model="store.currentPageNum"
              :length="store.totalPageNum"
              :total-visible="10"
              first-icon="mdi-chevron-double-left"
              last-icon="mdi-chevron-double-right"
              @update:modelValue="handlePage"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import "../assets/products/noimage.jpg";

const store = useIndexStore();
let isMobile = ref(false);

const register = (product: any) => {
  store.setRegisterData(product);
};

const goToUrl = (url: string) => {
  window.open(url);
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
  useSearchProducts();
};

const changeCardWidth = (description: string) => {
  const length = description.length;
  if (length < 100) {
    return "300px";
  } else {
    return "400px";
  }
};

// Function to check screen size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});
</script>

<style scoped>
.cards {
  width: 300px;
  justify-content: center;
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
