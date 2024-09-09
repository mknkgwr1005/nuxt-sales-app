// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, Timestamp } from "firebase/firestore";
import { firebaseConfig } from "@/firebase/config";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const app = initializeApp(firebaseConfig);

// Initialize Firebase
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const FirebaseTimestamp = Timestamp;
