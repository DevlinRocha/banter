import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
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
  signInAnonymously,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UserData } from "./src/features/user";
import { RoleData, ServerData } from "./src/features/servers";

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
        "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/assets%2FdefaultAvatar.svg?alt=media&token=2cd07b3e-6ee1-4682-8246-57bb20bc0d1f",
    });
    // Profile updated

    await setDoc(doc(db, "users", user.uid), {
      username: user.displayName,

      avatar: user.photoURL,

      tag: "0000", // Create function to generate unique tag for each username

      about: "",

      banner: "#7CC6FE",

      email: user.email,
    });
    // Database updated

    await joinServer("ke6NqegIvJEOa9cLzUEp");
    // User joins global chat
  } catch (error) {
    console.error(error);
  }
}

async function updateUserDatabase(property: string, newValue: string) {
  if (!auth.currentUser) return;

  const user = auth.currentUser;

  await updateDoc(
    doc(db, "users", user.uid),

    {
      [property]: newValue,
    }
  );
}

export async function saveUserProfileChanges(
  newUser: UserData,
  oldUser: UserData
) {
  if (!auth.currentUser) return;

  const user = auth.currentUser;

  switch (true) {
    case oldUser.avatar !== newUser.avatar:
      await updateProfile(user, {
        photoURL: newUser.avatar,
      });

      await updateUserDatabase("avatar", newUser.avatar);

    case oldUser.banner !== newUser.banner:
      await updateUserDatabase("banner", newUser.banner);

    case oldUser.about !== newUser.about:
      await updateUserDatabase("about", newUser.about);
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

export async function signInAsGuest() {
  try {
    const guestCredential = await signInAnonymously(auth);

    const guest = guestCredential.user;

    await updateProfile(guest, {
      displayName: "Guest",

      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/assets%2FdefaultAvatar.svg?alt=media&token=2cd07b3e-6ee1-4682-8246-57bb20bc0d1f",
    });

    // Profile updated

    await setDoc(doc(db, "users", guest.uid), {
      username: guest.displayName,

      avatar: guest.photoURL,

      tag: "0000", // Create function to generate unique tag for each username

      about: "",

      banner: "#7CC6FE",

      email: guest.email,
    });
    // Database updated

    await joinServer("ke6NqegIvJEOa9cLzUEp");
    // User joins global chat
  } catch (error) {
    console.error(error);
  }
}

async function reauthenticateUser(password: string) {
  if (!auth.currentUser || !auth.currentUser.email) return;

  const credential: AuthCredential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
  );

  await reauthenticateWithCredential(auth.currentUser, credential);
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

export async function changeUsername(newUsername: string, password: string) {
  if (!auth.currentUser || !auth.currentUser.email) return;

  const user = auth.currentUser;

  try {
    if (!user.displayName) return;

    await reauthenticateUser(password);

    await updateProfile(user, {
      displayName: newUsername,
    });
    // Profile updated!

    await updateUserDatabase("username", user.displayName);
  } catch (error) {
    console.error(error);
  }
}

export async function changeEmail(newEmail: string, password: string) {
  if (!auth.currentUser || !auth.currentUser.email) return;

  const user = auth.currentUser;

  try {
    if (!user.email) return;

    await reauthenticateUser(password);

    await updateEmail(user, newEmail);

    await updateUserDatabase("email", user.email);
  } catch (error) {
    console.error(error);
  }
}

export async function uploadAvatarPreview(file: File, userID: string) {
  const storage = getStorage();

  const avatarRef = ref(storage, `users/${userID}/temp/avatar`);

  await uploadBytes(avatarRef, file);

  return await getAvatarPreviewURL(userID);
}

async function getAvatarPreviewURL(userID: string) {
  const storage = getStorage();

  return await getDownloadURL(ref(storage, `users/${userID}/temp/avatar`));
}

export async function uploadAvatar(file: File, userID: string) {
  const storage = getStorage();

  const avatarRef = ref(storage, `users/${userID}/avatar`);

  await uploadBytes(avatarRef, file);

  return await getAvatarURL(userID);
}

async function getAvatarURL(userID: string) {
  const storage = getStorage();

  return await getDownloadURL(ref(storage, `users/${userID}/avatar`));
}

export async function createMessage(
  serverID: string,
  channelID: string,
  userID: string,
  content: string,
  image?: File
) {
  // Compatibility shim for older browsers, such as IE8 and earlier:
  if (!Date.now) {
    Date.now = function () {
      return new Date().getTime();
    };
  }

  try {
    const docRef = await addDoc(
      collection(db, "servers", serverID, "channels", channelID, "messages"),
      {
        content: content,
        date: Date(),
        edited: false,
        reactions: [],
        timestamp: Date.now(),
        userID: userID,
      }
    );

    if (!image) return;

    uploadMessageImage(image, serverID, channelID, docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function uploadMessageImagePreview(file: File, userID: string) {
  const storage = getStorage();

  const messageImageRef = ref(storage, `users/${userID}/temp/messageImage`);

  await uploadBytes(messageImageRef, file);

  return await getMessageImagePreviewURL(userID);
}

async function getMessageImagePreviewURL(userID: string) {
  const storage = getStorage();

  return await getDownloadURL(
    ref(storage, `users/${userID}/temp/messageImage`)
  );
}

export async function uploadMessageImage(
  file: File,
  serverID: string,
  channelID: string,
  messageID: string
) {
  const storage = getStorage();

  const messageImageRef = ref(
    storage,
    `servers/${serverID}/messages/${messageID}/${file.name}`
  );

  await uploadBytes(messageImageRef, file);

  const messageImageURL = await getDownloadURL(ref(messageImageRef));

  await updateMessageDatabase(
    serverID,
    channelID,
    messageID,
    "image",
    messageImageURL
  );

  return messageImageURL;
}

async function updateMessageDatabase(
  serverID: string,
  channelID: string,
  messageID: string,
  property: string,
  newValue: string
) {
  await updateDoc(
    doc(db, "servers", serverID, "channels", channelID, "messages", messageID),
    {
      [property]: newValue,
    }
  );
}

export async function createGifMessage(
  serverID: string,
  channelID: string,
  userID: string,
  url: string
) {
  // Compatibility shim for older browsers, such as IE8 and earlier:
  if (!Date.now) {
    Date.now = function () {
      return new Date().getTime();
    };
  }

  try {
    const docRef = await addDoc(
      collection(db, "servers", serverID, "channels", channelID, "messages"),
      {
        video: url,
        date: Date(),
        edited: false,
        reactions: [],
        timestamp: Date.now(),
        userID: userID,
      }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function createServer(
  serverName: string,
  userID: string,
  serverImage?: File
) {
  const serverDocRef = await addDoc(collection(db, "servers"), {
    name: serverName,

    img: "",

    defaultChannel: "",

    isPublic: false,

    contentFilter: "off",
  });

  const serverID = serverDocRef.id;

  if (serverImage) await uploadServerImage(serverImage, serverID);

  const defaultChannelRef = await createChannel(
    serverDocRef.id,
    "general",
    "text"
  );

  await updateDefaultChannel(serverDocRef, defaultChannelRef);

  await joinServer(serverDocRef.id);

  await setServerOwner(serverID, userID);

  return serverDocRef.id;
}

export async function createChannel(
  serverID: string,
  channelName: string,
  type: string
) {
  const channelDocRef = await addDoc(
    collection(db, "servers", serverID, "channels"),
    {
      name: channelName,
      type: type,
    }
  );

  return channelDocRef;
}

export async function updateDefaultChannel(
  server: DocumentReference<DocumentData>,
  channel: DocumentReference<DocumentData>
) {
  await updateDoc(server, {
    defaultChannel: channel.id,
  });
}

async function setServerOwner(serverID: string, userID: string) {
  await updateDoc(doc(db, "servers", serverID, "members", userID), {
    serverOwner: true,
  });
}

export async function saveServerChanges(
  newServer: ServerData,
  oldServer: ServerData
) {
  switch (true) {
    case newServer.img !== oldServer.img:
      await updateServerDatabase(newServer.serverID, "img", newServer.img);

    case newServer.name !== oldServer.name:
      await updateServerDatabase(newServer.serverID, "name", newServer.name);

    case newServer.roles !== oldServer.roles:
      await updateServerDatabase(newServer.serverID, "roles", newServer.roles);

    case newServer.contentFilter !== oldServer.contentFilter:
      await updateServerDatabase(
        newServer.serverID,
        "contentFilter",
        newServer.contentFilter
      );
  }
}

export async function uploadServerImagePreview(file: File, userID: string) {
  const storage = getStorage();

  const serverImageRef = ref(storage, `users/${userID}/temp/serverImage`);

  await uploadBytes(serverImageRef, file);

  return await getServerImagePreviewURL(userID);
}

async function getServerImagePreviewURL(userID: string) {
  const storage = getStorage();

  return await getDownloadURL(ref(storage, `users/${userID}/temp/serverImage`));
}

export async function uploadServerImage(file: File, serverID: string) {
  const storage = getStorage();

  const serverImageRef = ref(storage, `servers/${serverID}/serverImage`);

  await uploadBytes(serverImageRef, file);

  const serverImageURL = await getServerImageURL(serverID);

  await updateServerDatabase(serverID, "img", serverImageURL);

  return serverImageURL;
}

async function getServerImageURL(serverID: string) {
  const storage = getStorage();

  return await getDownloadURL(ref(storage, `servers/${serverID}/serverImage`));
}

export async function createServerRole(server: ServerData, newRoleID: string) {
  await updateDoc(doc(db, "servers", server.serverID), {
    roles: server.roles
      ? [
          ...server.roles,
          {
            name: "new role",
            color: "rgb(153,170,181)",
            separateDisplay: false,
            sort: server.roles.length,
            permissions: {
              manageChannels: false,
              manageRoles: false,
              manageServer: false,
            },
            roleID: newRoleID,
          },
        ]
      : [
          {
            name: "new role",
            color: "rgb(153,170,181)",
            separateDisplay: false,
            sort: 0,
            permissions: {
              manageChannels: false,
              manageRoles: false,
              manageServer: false,
            },
            roleID: newRoleID,
          },
        ],
  });
}

export async function setServerRole(
  serverID: string,
  userID: string,
  newRoles: (string | RoleData)[]
) {
  await updateDoc(doc(db, "servers", serverID, "members", userID), {
    roles: newRoles,
  });
}

async function updateServerDatabase(
  serverID: string,
  property: string,
  newValue: string | RoleData[]
) {
  await updateDoc(doc(db, "servers", serverID), {
    [property]: newValue,
  });
}

export async function joinServer(serverID: string) {
  if (!auth.currentUser) return;

  const user = auth.currentUser.uid;

  const docRef = doc(db, "servers", serverID);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists())
    throw new Error("Please enter a valid link or invite code.");

  await setDoc(doc(db, "servers", serverID, "members", user), {});

  await setDoc(doc(db, "users", user, "servers", serverID), {});
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
export type User = typeof user;
// export const analytics = getAnalytics(app);
