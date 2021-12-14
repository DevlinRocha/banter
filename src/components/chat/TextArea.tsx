import { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import tw from "tailwind-styled-components";
import { useServersState } from "../../features/servers";

export default function TextArea() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { server, channel } = useServersState();

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
          server.id,
          "channels",
          channel.id,
          "messages"
        ),
        {
          content: getText(),
          date: Date(),
          edited: false,
          reactions: [],
          timestamp: Date.now(),
          user: {
            name: auth.currentUser?.displayName,
            img: auth.currentUser?.photoURL,
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
  sticky bottom-0 z-10 w-full bg-white
`;

const TextInput = tw.input`
  border-black border-2 rounded-md p-1 pl-4
`;
