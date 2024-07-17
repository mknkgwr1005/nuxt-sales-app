<template>
  <v-container class="d-flex flex-wrap justify-content-center">
    <v-row v-if="store.$state.announceData.length !== 0">
      <v-col
        v-for="product of store.$state.announceData"
        :key="product?.url"
        cols="auto"
      >
        <v-card class="card-content m-2">
          <v-img
            :src="product.imageUrl"
            alt="product.name"
            class="white--text"
            height="200px"
          ></v-img>
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
    <v-row v-if="store.$state.announceData.length === 0">
      <v-col cols="12">
        <v-card class="errorMessage" flat>
          <v-card-text> 入荷情報はまだありません </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <v-btn @click="searchRegisteredProducts"> 入荷情報を取得 </v-btn>
    </div>
  </v-container>
</template>
<script setup lang="ts">
const store = useIndexStore();

// 外部URLに遷移する
const goToUrl = (url: string) => {
  window.open(url, "product");
};

const { searchRegisteredProducts } = useSearchRegisteredProducts();
</script>

<style scoped>
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
