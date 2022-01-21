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

      const docData = docSnap.data();

      const currentUser = {
        username: docData.username,

        tag: docData.tag,

        avatar: docData.avatar,

        about: docData.about,

        banner: docData.banner,

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

      const docData = doc.data();

      const currentUser = {
        username: docData.username,

        tag: docData.tag,

        avatar: docData.avatar,

        about: docData.about,

        banner: docData.banner,

        userID: doc.id,

        email: docData.email,
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
