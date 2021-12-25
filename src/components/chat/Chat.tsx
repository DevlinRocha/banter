import tw from "tailwind-styled-components";
import Messages from "./Messages";
import TextArea from "./TextArea";

export default function Chat() {
  return (
    <Container>
      <Messages />

      <TextArea />
    </Container>
  );
}

const Container = tw.main`
  flex flex-col w-full h-full
`;
