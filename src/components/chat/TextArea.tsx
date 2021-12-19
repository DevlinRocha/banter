import { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import tw from "tailwind-styled-components";
import { useServersState } from "../../features/servers";
import { useUserState } from "../../features/user";

export default function TextArea() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { server, channel } = useServersState();
  const { user } = useUserState();

  function getText() {
    let messageContent;

    if (inputRef.current) {
      if (inputRef.current.value.trim() === "") return;

      messageContent = inputRef.current.value;

      inputRef.current.value = "";
    }

    return messageContent;
  }

  async function sendMessage(e: any) {
    e.preventDefault();

    // Compatibility shim for older browsers, such as IE8 and earlier:
    if (!Date.now) {
      Date.now = function () {
        return new Date().getTime();
      };
    }

    try {
      const docRef = await addDoc(
        collection(
          db,
          "servers",
          server.serverID,
          "channels",
          channel.channelID,
          "messages"
        ),
        {
          content: getText(),
          date: Date(),
          edited: false,
          reactions: [],
          timestamp: Date.now(),
          user: {
            name: user.username,
            img: user.avatar,
          },
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Container onSubmit={sendMessage}>
      <TextInput
        ref={inputRef}
        type="text"
        placeholder={`Message #${channel.name}`}
      />
    </Container>
  );
}

const Container = tw.form`
  sticky bottom-6 w-full h-11 mt-2 mb-6 px-4 z-10
`;

const TextInput = tw.input`
  bg-gray-100 rounded-md p-2.5 pl-4 w-full h-full placeholder-gray-500
`;
