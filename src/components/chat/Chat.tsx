import tw from "tailwind-styled-components";
import { useSendGifState } from "../../features/sendGif";
import Messages from "./Messages";
import SendGif from "./SendGif";
import TextArea from "./textArea/TextArea";

export default function Chat() {
  const { sendGifOpen } = useSendGifState();

  return (
    <Container>
      <MessagesContainer>
        <Messages />
        {sendGifOpen && <SendGif />}
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
