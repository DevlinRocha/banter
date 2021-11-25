import { useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
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
            img: "https://pbs.twimg.com/profile_images/1369982148682215427/dbS7T1nr_400x400.jpg",
            name: "Devlin",
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

`;

const TextInput = tw.input`
  border-black border-2 rounded-full pl-4
`;
