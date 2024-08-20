<template>
  <v-container
    class="d-flex flex-wrap justify-content-center product-carousel"
    fluid
  >
    <!-- button -->
    <v-row
      v-if="store.announceData.length !== 0"
      class="product-cards"
      justify="center"
    >
      <v-btn
        icon
        @click="prev"
        class="carousel-nav left"
        :disabled="store.leftCarousel"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <!-- productcard -->
      <v-row dense wrap="nowrap" no-gutters justify="center">
        <v-col
          v-for="product of store.newAnnounceData"
          :key="product?.url"
          cols="auto"
          md="3"
          class="d-flex"
        >
          <v-card class="card-content" width="200px" height="500px" flat>
            <v-img
              :src="product.imageUrl"
              alt="product.name"
              class="white--text"
              height="200px"
            />
            <v-card-text class="card-text">
              <p id="product-name">
                {{ product.name }}
              </p>
              <p>￥{{ product.price }}</p>
              <v-btn color="primary" @click="goToUrl(product.url)"
                >購入する</v-btn
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- button -->
      <v-btn
        icon
        @click="next"
        class="carousel-nav right"
        :disabled="store.rightCarousel"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>

    <!-- エラーメッセージ -->
    <v-row v-if="store.announceData.length === 0" justify="center">
      <v-col cols="12">
        <v-card class="errorMessage" flat>
          <v-card-text> 入荷情報はまだありません </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-row justify="center" v-if="store.stopSearchCount > 5">
    <v-btn @click="searchRegisteredProducts"> refresh </v-btn>
  </v-row>
</template>
<script setup lang="ts">
const store = useIndexStore();

// 外部URLに遷移する
const goToUrl = (url: string) => {
  window.open(url, "product");
};

let currentIndex = store.currentIndex;

const next = () => {
  store.updateIndex();
  store.handleAnnouncement();
};

const prev = () => {
  if (currentIndex >= 0) {
    store.backIndex();
    store.handleAnnouncement();
  } else {
    return;
  }
};

const { searchRegisteredProducts } = useSearchRegisteredProducts();
</script>

<style scoped>
.product-carousel {
  position: relative;
}

.product-cards {
  overflow-x: auto;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.carousel-nav.left {
  left: 0;
}

.carousel-nav.right {
  right: 0;
}

.errorMessage {
  width: auto;
  height: auto;
}
.card {
  display: flex;
  justify-content: flex-start;
}

.card-content {
  width: 18rem;
  font-size: 1rem;
}

#product-name {
  font-weight: bold;
}
</style>
