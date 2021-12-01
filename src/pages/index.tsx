import type { NextPage } from "next";
import Servers from "../components/Servers";
import Channels from "../components/Channels";
import Chat from "../components/Chat";
import tw from "tailwind-styled-components/dist/tailwind";

const Home: NextPage = () => {
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
