import type { NextPage } from "next";
import { useRouter } from "next/router";
import Servers from "../../components/Servers";
import Channels from "../../components/Channels";
import Chat from "../../components/chat/Chat";
import UserSettings from "../../components/userSettings/UserSettings";
import tw from "tailwind-styled-components/dist/tailwind";
import { auth } from "../../../firebase";
import { useSettingsState } from "../../features/settings";

const Home: NextPage = () => {
  const router = useRouter();
  const { sid, cid } = router.query;
  const { userSettingsOpen } = useSettingsState();

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
