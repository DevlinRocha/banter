import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

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

export function createAccount(
  email: string,

  password: string,

  username: string
) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;

      updateProfile(user, {
        displayName: username,

        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/Account.png?alt=media&token=32d8543b-cc91-4006-b014-ab93d128441a",
      })
        .then(async () => {
          // Profile updated

          await setDoc(doc(db, "users", user.uid), {
            username: user.displayName,

            avatar: user.photoURL,

            tag: "0000", // Create function to generate unique tag for each username

            about: "I'm new to Banter :)",

            banner: "7CC6FE",

            email: user.email,
          });

          // User joins global chat
          await joinServer("ke6NqegIvJEOa9cLzUEp", user.uid);
        })

        .catch((error) => {
          console.error(error);
        });
    })

    .catch((error) => {
      const errorCode = error.code;

      const errorMessage = error.message;

      console.error(`${errorCode} ${errorMessage}`);
    });
}

export function signIn(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;

      return user;
    })

    .catch((error) => {
      const errorCode = error.code;

      const errorMessage = error.message;

      console.error(`${errorCode} ${errorMessage}`);
    });
}

export async function joinServer(serverID: string, userID: string) {
  await setDoc(doc(db, "servers", serverID, "members", userID), {});

  await setDoc(doc(db, "users", userID, "servers", serverID), {});
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
export type User = typeof user;
export const analytics = getAnalytics(app);
