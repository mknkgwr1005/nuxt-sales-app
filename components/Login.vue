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

console.log(props.tab);

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("Logged in:", userCredential.user);
    router.push("/");
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
