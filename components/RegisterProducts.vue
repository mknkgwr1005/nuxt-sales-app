<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>商品登録ページ</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h2>登録した商品</h2>
        </v-col>
      </v-row>
      <v-row class="d-inline-flex flex-wrap justify-content-center">
        <v-col
          cols="12"
          md="4"
          v-for="registerData in store.registerData"
          :key="registerData.url"
        >
          <v-card class="cards mb-3" align="center">
            <v-img :src="registerData.image" height="200px"></v-img>
            <v-card-title>{{ registerData.name }}</v-card-title>
            <v-card-actions>
              <v-btn @click="goToUrl(registerData.url)">購入する</v-btn>
              <v-btn @click="removeItem(registerData)">削除する</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const store = useIndexStore();

const goToUrl = (url: string) => {
  window.open(url, "product");
};

const removeItem = (item: any) => {
  store.deleteRegisteredProduct(item);
};
</script>

<style scoped>
.cards {
  max-width: 300px;
}
</style>
