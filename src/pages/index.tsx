import type { NextPage } from "next";
import Channels from "../components/Channels";
import Chat from "../components/Chat";
import tw from "tailwind-styled-components/dist/tailwind";

const Home: NextPage = () => {
  return (
    <Container>
      <Channels server={"global"} />
      <Chat />
    </Container>
  );
};

const Container = tw.div`
  flex
`;

export default Home;
