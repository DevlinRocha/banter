import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  onSnapshot,
  DocumentReference,
  DocumentData,
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
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UserData } from "./src/features/user";

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
        "https://firebasestorage.googleapis.com/v0/b/banter-69832.appspot.com/o/defaultProfilePicture.svg?alt=media&token=e0ee525e-6ad5-4098-9198-77608ec38f3a",
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

export async function saveUserProfileChanges(newUser: UserData) {
  if (!auth.currentUser) return;

  const user = auth.currentUser;

  await updateProfile(user, {
    photoURL: newUser.avatar,
  });

  await updateUserDatabase("avatar", newUser.avatar);
  await updateUserDatabase("banner", newUser.banner);
  await updateUserDatabase("about", newUser.about);
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

export async function uploadAvatar(file: File, userID: string) {
  const storage = getStorage();

  const avatarRef = ref(storage, `users/${userID}/avatar`);

  await uploadBytes(avatarRef, file);

  return await getAvatarURL(userID);
}

async function getAvatarURL(userID: string) {
  const storage = getStorage();

  try {
    return await getDownloadURL(ref(storage, `users/${userID}/avatar`));
  } catch (error) {
    console.error(error);
  }
}

export async function createServer(serverName: string) {
  const serverDocRef = await addDoc(collection(db, "servers"), {
    name: serverName,

    img: "",

    defaultChannel: "",

    isPublic: false,
  });

  const defaultChannelRef = await createChannel(
    serverDocRef.id,
    "general",
    "text"
  );

  await createChannel(serverDocRef.id, "General", "voice");

  await updateDefaultChannel(serverDocRef, defaultChannelRef);

  await joinServer(serverDocRef.id);
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

  if (type === "voice") {
    createVoiceChannel(channelDocRef);
  }

  return channelDocRef;
}

export async function createVoiceChannel(channelDocRef: DocumentReference) {
  console.log("Create PeerConnection with configuration: ", configuration);

  const peerConnection = new RTCPeerConnection(configuration);

  registerPeerConnectionListeners(peerConnection);

  // Code for collecting ICE candidates below
  const callerCandidatesCollection = collection(
    channelDocRef,
    "callerCandidates"
  );

  peerConnection.addEventListener(
    "icecandidate",
    async (event: RTCPeerConnectionIceEvent) => {
      if (!event.candidate) {
        console.log("Got final candidate!");
        return;
      }
      console.log("Got candidate: ", event.candidate);
      await addDoc(callerCandidatesCollection, event.candidate.toJSON());
    }
  );
  // Code for collecting ICE candidates above

  // Code for creating a room below
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  console.log("Created offer:", offer);

  const roomWithOffer = {
    offer: {
      type: offer.type,
      sdp: offer.sdp,
    },
  };

  await setDoc(channelDocRef, roomWithOffer, { merge: true });
  console.log(`New room created with SDP offer. Room ID: ${channelDocRef.id}`);
  // Code for creating a room above

  // Peer connection event listener, can try:
  const remoteStream = new MediaStream();

  peerConnection.addEventListener("track", (event) => {
    console.log("Got remote track:", event.streams[0]);
    event.streams[0].getTracks().forEach(async (track) => {
      console.log("Add a track to the remoteStream:", track);
      remoteStream.addTrack(track);
    });
  });

  // Listening for remote session description below
  // Needs to unsubscribe from listener when disconnecting from channel
  onSnapshot(channelDocRef, async (snapshot) => {
    const data = snapshot.data();
    if (!peerConnection.currentRemoteDescription && data && data.answer) {
      console.log("Got remote description: ", data.answer);
      const rtcSessionDescription = new RTCSessionDescription(data.answer);
      await peerConnection.setRemoteDescription(rtcSessionDescription);
    }
  });
  // Listening for remote session description above

  // Listen for remote ICE candidates below

  onSnapshot(callerCandidatesCollection, async (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        let data = change.doc.data();
        console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  // Listen for remote ICE candidates above
}

export async function updateDefaultChannel(
  server: DocumentReference<DocumentData>,
  channel: DocumentReference<DocumentData>
) {
  await updateDoc(server, {
    defaultChannel: channel.id,
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

// VOICE CHAT FUNCTIONS

export async function joinVoice(
  serverID: string,
  channelID: string,
  localStream: MediaStream,
  remoteStream: MediaStream
) {
  const channelRef = doc(db, "servers", serverID, "channels", channelID);
  const channelSnapshot = await getDoc(channelRef);

  console.log("Got room:", channelSnapshot.exists());

  if (!channelSnapshot.exists()) return;

  console.log("Create PeerConnection with configuration: ", configuration);
  const peerConnection = new RTCPeerConnection(configuration);

  registerPeerConnectionListeners(peerConnection);

  localStream.getTracks().forEach((track) => {
    console.log("Local track:", track);
    peerConnection.addTrack(track, localStream);
  });

  // Code for collecting ICE candidates below
  const calleeCandidatesCollection = collection(channelRef, "calleeCandidates");

  peerConnection.addEventListener("icecandidate", async (event) => {
    if (!event.candidate) {
      console.log("Got final candidate!");
      return;
    }
    console.log("Got candidate: ", event.candidate);
    await addDoc(calleeCandidatesCollection, event.candidate.toJSON());
  });
  // Code for collecting ICE candidates above

  peerConnection.addEventListener("track", (event) => {
    console.log("Got remote track:", event.streams[0]);
    event.streams[0].getTracks().forEach((track) => {
      console.log("Add a track to the remoteStream:", track);
      remoteStream.addTrack(track);
    });
  });

  // Code for creating SDP answer below

  const offer = channelSnapshot.data().offer;
  console.log("Got offer:", offer);
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();
  console.log("Created answer:", answer);
  await peerConnection.setLocalDescription(answer);

  const roomWithAnswer = {
    answer: {
      type: answer.type,
      sdp: answer.sdp,
    },
  };
  await updateDoc(channelRef, roomWithAnswer);
  // Code for creating SDP answer above

  const callerCandidatesCollection = collection(channelRef, "callerCandidates");

  // Listening for remote ICE candidates below
  onSnapshot(callerCandidatesCollection, async (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        let data = change.doc.data();
        console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
        await peerConnection.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  // Listening for remote ICE candidates above

  return peerConnection;
}

export async function openUserMedia() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });

  const localStream = stream;
  const remoteStream = new MediaStream();

  return { localStream, remoteStream };
}

async function hangUp(serverID: string, channelID: string) {
  // Add declaration for leave button
  // const tracks = document.querySelector('#localVideo').srcObject.getTracks();
  // tracks.forEach(track => {
  // track.stop();
  // });
  // if (remoteStream) {
  //   remoteStream.getTracks().forEach((track) => track.stop());
  // }
  // if (peerConnection) {
  //   peerConnection.close();
  // }
  // Delete room on hangup
  // if (channelID) {
  //   const channelRef = doc(db, "servers", serverID, "channels", channelID);
  //   const calleeCandidatesCollection = collection(
  //     channelRef,
  //     "calleeCandidates"
  //   );
  //   const calleeCandidates = await getDocs(calleeCandidatesCollection);
  //   calleeCandidates.forEach(async (candidate) => {
  //     await deleteDoc(candidate.ref);
  //   });
  //   const callerCandidatesCollection = collection(
  //     channelRef,
  //     "callerCandidates"
  //   );
  //   const callerCandidates = await getDocs(callerCandidatesCollection);
  //   callerCandidates.forEach(async (candidate) => {
  //     await deleteDoc(candidate.ref);
  //   });
  //   await deleteDoc(channelRef);
  // }
}

function registerPeerConnectionListeners(peerConnection: RTCPeerConnection) {
  peerConnection.addEventListener("icegatheringstatechange", () => {
    console.log(
      `ICE gathering state changed: ${peerConnection.iceGatheringState}`
    );
  });

  peerConnection.addEventListener("connectionstatechange", () => {
    console.log(`Connection state change: ${peerConnection.connectionState}`);
  });

  peerConnection.addEventListener("signalingstatechange", () => {
    console.log(`Signaling state change: ${peerConnection.signalingState}`);
  });

  peerConnection.addEventListener("iceconnectionstatechange ", () => {
    console.log(
      `ICE connection state change: ${peerConnection.iceConnectionState}`
    );
  });
}

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const auth = getAuth();
const user = auth.currentUser;
export type User = typeof user;
// export const analytics = getAnalytics(app);

// VOICE CHAT DECLARATIONS

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
