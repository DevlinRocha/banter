import tw from "tailwind-styled-components";
import Title from "./Title";
import Messages from "./Messages";
import TextArea from "./TextArea";

export default function Chat() {
  return (
    <Container>
      <Title />
      <Messages />
      <TextArea />
    </Container>
  );
}

const Container = tw.main`
  flex flex-col h-screen overflow-hidden
`;
