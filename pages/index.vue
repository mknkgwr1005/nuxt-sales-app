<template>
  <div>
    <client-only>
      <v-tabs v-model="tab" align-tabs="center" bg-color="red-lighten-2">
        <v-tab value="home">Home</v-tab>
        <v-tab value="register">登録管理画面</v-tab>
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="home">
          <template v-if="tab === 'home'">
            <ProductList />
          </template>
        </v-tabs-window-item>
        <v-tabs-window-item value="register">
          <template v-if="tab === 'register'">
            <RegisterProducts />
          </template>
        </v-tabs-window-item>
      </v-tabs-window>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ProductList, RegisterProducts } from "#components";

const tab = ref("home");
</script>

<style scoped></style>
