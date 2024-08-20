<template>
  <div>
    <client-only>
      <!-- App bar for mobile screens -->
      <v-app-bar v-show="isMobile" app color="#FF6C7E">
        <v-app-bar-nav-icon @click="menu = !menu"></v-app-bar-nav-icon>
        <v-toolbar-title>menu</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu v-model="menu" offset-y>
          <v-list>
            <v-list-item v-on:click="changeTab('home')">Home</v-list-item>
            <v-list-item v-on:click="changeTab('register')"
              >登録管理画面</v-list-item
            >
            <v-list-item
              v-on:click="changeTab('Login')"
              v-if="!store.loginStatus"
              >ログイン</v-list-item
            >
            <v-list-item v-on:click="logout" v-if="store.loginStatus"
              >ログアウト</v-list-item
            >
          </v-list>
        </v-menu>
        <v-btn icon @click="searchBar = !searchBar">
          <v-icon v-if="!searchBar">mdi-magnify</v-icon>
          <v-icon v-if="searchBar">mdi-close</v-icon>
        </v-btn>
        <MobileSearchBar v-if="searchBar" />
      </v-app-bar>

      <!-- Tabs for larger screens -->
      <div v-show="!isMobile">
        <v-tabs v-model="tab" align-tabs="center" bg-color="red-lighten-2">
          <v-tab value="home">Home</v-tab>
          <v-tab value="register">登録管理画面</v-tab>
          <v-tab value="Login" v-if="!store.loginStatus">ログイン</v-tab>
          <v-tab value="home" v-if="store.loginStatus" @click="logout"
            >ログアウト</v-tab
          >
        </v-tabs>
      </div>

      <!-- Tab content -->
      <v-spacer></v-spacer>
      <v-tabs-window :class="productListClass" v-model="tab">
        <v-tabs-window-item value="home">
          <template v-if="tab === 'home'">
            <ProductList />
          </template>
        </v-tabs-window-item>
        <v-tabs-window-item value="register">
          <template v-if="tab === 'register'">
            <RegisterProducts tab="tab" />
          </template>
        </v-tabs-window-item>
        <v-tabs-window-item value="Login">
          <template v-if="tab === 'Login'">
            <Login tab="tab" @update:tab="handleTab" />
          </template>
        </v-tabs-window-item>
        <v-tabs-window-item value="Register">
          <template v-if="tab === 'Register'">
            <Register />
          </template>
        </v-tabs-window-item>
      </v-tabs-window>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

let tab = ref("home");
const store = useIndexStore();
let menu = ref(false);
let isMobile = ref(false);
let searchBar = ref(false);

const handleTab = (newTab: string) => {
  tab.value = newTab;
};

const changeTab = (newTab: string) => {
  tab.value = newTab;
  menu.value = false; // Close the menu after selection
};

const logout = async () => {
  await store.logout();
  handleTab("home");
};

// Function to check screen size
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkScreenSize);
});

// Computed class for product-list margin
const productListClass = computed(() => {
  console.log(isMobile);

  if (isMobile.value === false) {
    return "product-list-auto-margin";
  } else {
    return "product-list";
  }
});
</script>

<style scoped>
.product-list {
  margin: 50px;
}

.product-list-auto-margin {
  margin: auto;
}
</style>
