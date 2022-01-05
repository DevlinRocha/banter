import { useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Servers from "../../../components/Servers/Servers";
import Channels from "../../../components/channels/Channels";
import Chat from "../../../components/chat/Chat";
import UserSettings from "../../../components/userSettings/UserSettings";
import tw from "tailwind-styled-components/dist/tailwind";
import { setUser, resetUserState, useUserState } from "../../../features/user";
import { useAppDispatch } from "../../../redux/hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useServersState } from "../../../features/servers";
import { useUserSettingsState } from "../../../features/userSettings";
import { db } from "../../../../firebase";
import { useRouter } from "next/router";
import Members from "../../../components/Members";
import Title from "../../../components/Title";
import { useAddServerState } from "../../../features/addServer";
import AddServer from "../../../components/addServer/AddServer";
import ServerDropdown from "../../../components/Servers/ServerDropdown";
import { useServerSettingsState } from "../../../features/serverSettings";
import InviteFriends from "../../../components/Servers/InviteFriends";

const Home: NextPage = () => {
  const auth = getAuth();
  const { user } = useUserState();
  const { channel } = useServersState();
  const { userSettingsOpen, memberListOpen } = useUserSettingsState();
  const { addServerOpen } = useAddServerState();
  const { serverDropdownOpen, inviteFriendsOpen } = useServerSettingsState();
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

      {inviteFriendsOpen && <InviteFriends />}

      <Servers />

      <Container>
        <Channels />

        <ChatContainer>
          <Title />

          <ContentContainer>
            <Chat />

            {memberListOpen && <Members />}
          </ContentContainer>
        </ChatContainer>
      </Container>

      {serverDropdownOpen && <ServerDropdown />}
    </PageContainer>
  );
};

export async function getServerSideProps() {
  const auth = getAuth();

  if (!auth) {
    return {
      redirect: {
        destination: "/register",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const PageContainer = tw.div`
  flex w-screen h-screen overflow-hidden
`;

const Container = tw.div`
  flex w-full h-full
`;

const ChatContainer = tw.div`
  flex flex-col flex-1
`;

const ContentContainer = tw.div`
  flex flex-1
`;

export default Home;
