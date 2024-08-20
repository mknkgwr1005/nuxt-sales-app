<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-5" max-width="500" width="300px">
      <v-card-title class="text-h5">ログイン</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            required
            prepend-icon="mdi-email"
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            required
            prepend-icon="mdi-lock"
          ></v-text-field>
          <v-btn type="submit" color="primary" block>Login</v-btn>
          　
          <p>
            ユーザー登録してない方は<v-btn @click="changePage"> こちら </v-btn>
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const store = useIndexStore();

const email = ref("");
const password = ref("");
const router = useRouter();
const props = defineProps<{
  tab: string;
}>();

const emit = defineEmits<{
  (event: "update:tab", newTab: string): void;
}>();

const changePage = () => {
  console.log("method has been executed");
  emit("update:tab", "Register");
};

const resetPage = () => {
  emit("update:tab", "home");
};

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value).then(
      (response) => {
        if (response) {
          window.alert("ログインしました");
          store.announceData = [];
          store.fetchUserStatus();
          resetPage();
        }
      }
    );
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
