// plugins/firebase.ts
import { defineNuxtPlugin } from "#app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/functions";
import fb from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB_8EmhZ5-oTwG_jWWAsf2iJujGFPeFpug",
  authDomain: "vue-sales-app.firebaseapp.com",
  projectId: "vue-sales-app",
  storageBucket: "vue-sales-app.appspot.com",
  messagingSenderId: "361515311633",
  appId: "1:361515311633:web:f38ad24c83a273917f47b0",
  measurementId: "G-Z5M5CC40K1", //test
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("auth", auth);
});
