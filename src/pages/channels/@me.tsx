import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Servers from "../../components/servers/Servers";
import Channels from "../../components/channels/Channels";
import UserSettings from "../../components/userSettings/UserSettings";
import tw from "tailwind-styled-components/dist/tailwind";
import { setUser, resetUserState, useUserState } from "../../features/user";
import { useAppDispatch } from "../../redux/hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useServersState } from "../../features/servers";
import { useUserSettingsState } from "../../features/userSettings";
import { db } from "../../../firebase";
import { useRouter } from "next/router";
import { useAddServerState } from "../../features/addServer";
import AddServer from "../../components/addServer/AddServer";

const Home: NextPage = () => {
  const auth = getAuth();
  const { user } = useUserState();
  const { channel } = useServersState();
  const { userSettingsOpen } = useUserSettingsState();
  const { addServerOpen } = useAddServerState();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const authStateListener = onAuthStateChanged(auth, async (user) => {
      if (!user) return redirect();

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return redirect();

      const currentUser = {
        username: docSnap.data().username,

        tag: docSnap.data().tag,

        avatar: docSnap.data().avatar,

        about: docSnap.data().about,

        banner: docSnap.data().banner,

        userID: user.uid,

        email: user.email,
      };

      dispatch(setUser(currentUser));
    });
    return () => {
      authStateListener();
    };
  }, []);

  useEffect(() => {
    if (!user.userID) return;

    const unsubscribe = onSnapshot(doc(db, "users", user.userID), (doc) => {
      if (!doc.exists()) return;

      const currentUser = {
        username: doc.data().username,

        tag: doc.data().tag,

        avatar: doc.data().avatar,

        about: doc.data().about,

        banner: doc.data().banner,

        userID: doc.id,

        email: doc.data().email,
      };

      dispatch(setUser(currentUser));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function redirect() {
    dispatch(resetUserState());

    router.push("/login");
  }

  return (
    <PageContainer>
      <Head>
        <title>{channel.name ? channel.name : "Banter"}</title>

        <link rel="manifest" href="/manifest.json" />
      </Head>

      {userSettingsOpen && <UserSettings />}

      {addServerOpen && <AddServer />}

      <Servers />

      <Channels />
    </PageContainer>
  );
};

const PageContainer = tw.div`
  flex w-screen h-screen overflow-hidden select-none
`;

export default Home;
