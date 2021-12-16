import { useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Servers from "../../components/Servers";
import Channels from "../../components/channels/Channels";
import Chat from "../../components/chat/Chat";
import UserSettings from "../../components/userSettings/UserSettings";
import tw from "tailwind-styled-components/dist/tailwind";
import { setUser } from "../../features/user";
import { useAppDispatch } from "../../redux/hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSettingsState } from "../../features/settings";

const Home: NextPage = () => {
  const auth = getAuth();
  const router = useRouter();
  const { sid, cid } = router.query;
  const { userSettingsOpen } = useSettingsState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const currentUser = {
          name: user.displayName,
          img: user.photoURL,
        };
        dispatch(setUser(currentUser));
      } else {
        // User is signed out
      }
    });
  }, []);

  return (
    <Container>
      {userSettingsOpen ? (
        <UserSettings />
      ) : (
        <Container>
          <Servers />
          <Channels />
          <Chat />
        </Container>
      )}
    </Container>
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

const Container = tw.div`
  flex
`;

export default Home;
