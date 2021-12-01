import type { NextPage } from "next";
import { useRouter } from "next/router";
import Servers from "../../components/Servers";
import Channels from "../../components/Channels";
import Chat from "../../components/Chat";
import tw from "tailwind-styled-components/dist/tailwind";

const Home: NextPage = () => {
  const router = useRouter();
  const { sid, cid } = router.query;
  return (
    <Container>
      <Servers />
      <Channels />
      <Chat />
    </Container>
  );
};

const Container = tw.div`
  flex
`;

export default Home;
