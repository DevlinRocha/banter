import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWcZTM0vSyLz1hQeFbO2SwS2wB-hGHtlQ",
  authDomain: "banter-69832.firebaseapp.com",
  projectId: "banter-69832",
  storageBucket: "banter-69832.appspot.com",
  messagingSenderId: "441171355945",
  appId: "1:441171355945:web:2a4136fc1e9c14fc7eef38",
  measurementId: "G-YCR3GD7Y6V",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const analytics = getAnalytics(app);
