<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>商品登録ページ</h1>
          <p>登録したい商品を選択してください</p>
        </v-col>
      </v-row>
      <v-row class="d-inline-flex flex-wrap justify-content-center">
        <v-col
          cols="12"
          md="4"
          v-for="product in optionProduct"
          :key="product.inputValue"
        >
          <v-card class="cards mb-3">
            <v-img :src="product.img" height="200px"></v-img>
            <v-card-title>{{ product.inputValue }}</v-card-title>
            <v-card-actions>
              <v-btn
                v-if="!alreadyRegistered"
                @click="toggleNotification(product.inputValue)"
                >通知ON</v-btn
              >
              <v-btn
                v-if="alreadyRegistered"
                @click="toggleNotification(product.inputValue)"
                >通知OFF</v-btn
              >
            </v-card-actions>
          </v-card>
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
import { onMounted, ref } from "vue";
const store = useIndexStore();

const alreadyRegistered = ref(false);
const optionProduct = ref([
  { inputValue: "白州", YgenreId: 1344, img: "../assets/img/hakusyuu.jpg" },
  { inputValue: "山崎", YgenreId: 1344, img: "../assets/img/yamazaki.jpg" },
  { inputValue: "響", YgenreId: 1344, img: "../assets/img/hibiki.jpg" },
  {
    inputValue: "Nintendo Switch",
    YgenreId: 48840,
    img: "../assets/img/nintendo_switch.jpg",
  },
  { inputValue: "Playstation5", YgenreId: 50797, img: "../assets/img/ps5.jpg" },
]);

const toggleNotification = (inputValue: string) => {
  alreadyRegistered.value = !alreadyRegistered.value;
};

const searchRegisteredItem = () => {
  for (const registerItem of store.registerData) {
    for (const option of optionProduct.value) {
      if (registerItem.genreId === option.YgenreId) {
        toggleNotification(option.inputValue);
      }
    }
  }
};

const goToUrl = (url: string) => {
  window.location.href = url;
};

const removeItem = (item: any) => {
  // 削除ロジックをここに追加
};

onMounted(() => {
  searchRegisteredItem();
});
</script>

<style scoped>
.cards {
  max-width: 300px;
}
</style>
