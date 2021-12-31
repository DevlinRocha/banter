import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  AuthCredential,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWcZTM0vSyLz1hQeFbO2SwS2wB-hGHtlQ",
  authDomain: "banter-69832.firebaseapp.com",
  projectId: "banter-69832",
  storageBucket: "banter-69832.appspot.com",
  messagingSenderId: "441171355945",
  appId: "1:441171355945:web:2a4136fc1e9c14fc7eef38",
  measurementId: "G-YCR3GD7Y6V",
};

export async function createAccount(
  email: string,

  password: string,

  username: string
) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in

    const user = userCredential.user;

    await updateProfile(user, {
      displayName: username,

      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/defaultProfilePicture.svg?alt=media&token=e0ee525e-6ad5-4098-9198-77608ec38f3a",
    });
    // Profile updated

    await setDoc(doc(db, "users", user.uid), {
      username: user.displayName,

      avatar: user.photoURL,

      tag: "0000", // Create function to generate unique tag for each username

      about: "I'm new to Banter :)",

      banner: "#7CC6FE",

      email: user.email,
    });
    // Database updated

    await joinServer("ke6NqegIvJEOa9cLzUEp", user.uid);
    // User joins global chat
  } catch (error) {
    console.error(error);
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in

    const user = userCredential.user;

    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    // Sign-out successful.
  } catch (error) {
    console.error(error);
    // An error happened.
  }
}

export async function joinServer(serverID: string, userID: string) {
  await setDoc(doc(db, "servers", serverID, "members", userID), {});

  await setDoc(doc(db, "users", userID, "servers", serverID), {});
}

export async function changeUsername(newUsername: string, password: string) {
  if (!auth.currentUser || !auth.currentUser.email) return;

  const user = auth.currentUser;

  try {
    const credential: AuthCredential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    await reauthenticateWithCredential(user, credential);

    await updateProfile(user, {
      displayName: newUsername,
    });
    // Profile updated!

    await setDoc(
      doc(db, "users", user.uid),

      {
        username: user.displayName,
      },

      { merge: true }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function changeEmail(newEmail: string, password: string) {
  if (!auth.currentUser || !auth.currentUser.email) return;

  try {
    const credential: AuthCredential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );

    await reauthenticateWithCredential(auth.currentUser, credential);
    // User re-authenticated

    await updateEmail(auth.currentUser, newEmail);
    // Email updated

    await setDoc(
      doc(db, "users", auth.currentUser.uid),

      {
        email: auth.currentUser.email,
      },

      { merge: true }
    );
    // Database updated
  } catch (error) {
    console.error(error);
  }
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
export type User = typeof user;
// export const analytics = getAnalytics(app);
