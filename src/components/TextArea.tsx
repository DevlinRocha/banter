import { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase";
import tw from "tailwind-styled-components";

export default function TextArea() {
  const inputRef = useRef<HTMLInputElement>(null);
  function getText() {
    let messageContent;
    if (inputRef.current) {
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
        collection(db, "serverList", "public", "servers", "global", "messages"),
        {
          content: getText(),
          date: Date(),
          edited: false,
          reactions: [],
          timestamp: Date.now(),
          user: {
            img: auth.currentUser?.photoURL,
            name: auth.currentUser?.displayName,
          },
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Container onSubmit={sendMessage}>
      <TextInput ref={inputRef} type="text" placeholder="Message" />
    </Container>
  );
}

const Container = tw.form`
  sticky bottom-0 z-10
`;

const TextInput = tw.input`
  border-black border-2 rounded-full p-1 pl-4
`;
