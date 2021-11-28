import { useState, useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import tw from "tailwind-styled-components";
import Message from "./Message";

export default function Messages() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    displayMessages();
  }, [messages]);

  function fetchMessages() {
    const q = query(
      collection(db, "serverList", "public", "servers", "global", "messages")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages: any[] = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setMessages(messages);
    });
  }

  function displayMessages() {
    const chat: any = [];
    const sortedMessages = messages.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    sortedMessages.map((message: any, index) => {
      chat.push(<Message message={message} key={index} />);
    });
    return chat;
  }

  return <List>{displayMessages()}</List>;
}

const List = tw.ol`
  flex-1 flex flex-col justify-end
`;
