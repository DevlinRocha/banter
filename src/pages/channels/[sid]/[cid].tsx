import type { NextPage } from "next";
import { useRouter } from "next/router";
import Servers from "../../../components/Servers/Servers";
import Channels from "../../../components/channels/Channels";
import Chat from "../../../components/chat/Chat";
import UserSettings from "../../../components/userSettings/UserSettings";
import tw from "tailwind-styled-components/dist/tailwind";
import { setUser } from "../../../features/user";
import { useAppDispatch } from "../../../redux/hooks";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useSettingsState } from "../../../features/settings";
import { db } from "../../../../firebase";

const Home: NextPage = () => {
  const auth = getAuth();
  const router = useRouter();
  const { sid, cid } = router.query;
  const { userSettingsOpen } = useSettingsState();
  const dispatch = useAppDispatch();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currentUser = {
          username: docSnap.data().username,
          avatar: docSnap.data().avatar,
          tag: docSnap.data().tag,
          about: docSnap.data().about,
          banner: docSnap.data().banner,
        };
        dispatch(setUser(currentUser));
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  });

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
  flex w-screen h-screen
`;

export default Home;
