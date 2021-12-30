import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  AuthCredential,
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
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      const user = userCredential.user;

      updateProfile(user, {
        displayName: username,

        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/defaultProfilePicture.svg?alt=media&token=e0ee525e-6ad5-4098-9198-77608ec38f3a",
      })
        .then(async () => {
          // Profile updated

          await setDoc(doc(db, "users", user.uid), {
            username: user.displayName,

            avatar: user.photoURL,

            tag: "0000", // Create function to generate unique tag for each username

            about: "I'm new to Banter :)",

            banner: "#7CC6FE",

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

export function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });
}

export async function joinServer(serverID: string, userID: string) {
  await setDoc(doc(db, "servers", serverID, "members", userID), {});

  await setDoc(doc(db, "users", userID, "servers", serverID), {});
}

export async function changeUsername(newUsername: string) {
  if (auth.currentUser) {
    const user = auth.currentUser;

    await updateProfile(user, {
      displayName: newUsername,
    })
      .then(async () => {
        // Profile updated!

        await setDoc(
          doc(db, "users", user.uid),

          {
            username: user.displayName,
          },

          { merge: true }
        );
      })
      .catch((error) => {
        // An error occurred
        console.error(error);
      });
  }
}

export async function changeEmail(newEmail: string) {
  if (auth.currentUser) {
    const user = auth.currentUser;

    const credential: AuthCredential = {
      providerId: user.providerId,

      signInMethod: "password",

      toJSON: function (): object {
        throw new Error("Function not implemented.");
      },
    };

    reauthenticateWithCredential(user, credential)
      .then(async () => {
        // User re-authenticated

        await updateEmail(user, newEmail)
          .then(async () => {
            // Email updated

            await setDoc(
              doc(db, "users", user.uid),

              {
                email: user.email,
              },

              { merge: true }
            );
          })

          .catch((error) => {
            // An error occurred

            console.error(error);
          });
      })
      .catch((error) => {
        // An error occurred

        console.error(error);
      });
  }
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
export type User = typeof user;
// export const analytics = getAnalytics(app);
