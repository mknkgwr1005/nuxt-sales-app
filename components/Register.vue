<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-5" max-width="400" width="300px">
      <v-card-title class="text-h5">新規登録</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
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
          <v-btn type="submit" color="primary" block>新規登録</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleRegister = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("Registered:", userCredential.user);
    router.push("/");
  } catch (error) {
    console.error("Error registering:", error);
  }
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
