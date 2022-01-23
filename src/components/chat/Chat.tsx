import tw from "tailwind-styled-components";
import Messages from "./Messages";
import TextArea from "./textArea/TextArea";

export default function Chat() {
  return (
    <Container>
      <MessagesContainer>
        <Messages />
      </MessagesContainer>

      <TextArea />
    </Container>
  );
}

const Container = tw.main`
  flex flex-col w-full h-full
`;

const MessagesContainer = tw.div`
  relative flex flex-1
`;
