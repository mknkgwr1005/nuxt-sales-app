<template>
  <div>
    <client-only>
      <v-tabs v-model="tab" align-tabs="center" bg-color="red-lighten-2">
        <v-tab value="home">Home</v-tab>
        <v-tab value="register">登録管理画面</v-tab>
        <v-tab value="Login" v-if="!store.loginStatus">ログイン</v-tab>
        <v-tab value="home" v-if="store.loginStatus" @click="logout"
          >ログアウト</v-tab
        >
      </v-tabs>
      <v-tabs-window v-model="tab">
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
let tab = ref("home");
const store = useIndexStore();

const handleTab = (newTab: string) => {
  console.log("update tab");
  tab.value = newTab;
};

const logout = () => {
  store.logout();
};
</script>

<style scoped></style>
