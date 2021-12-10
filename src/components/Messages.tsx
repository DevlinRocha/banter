import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setMessages, useServersState } from "../features/servers";
import tw from "tailwind-styled-components";
import Message from "./Message";
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function Messages() {
  const { server, channel, messages } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    displayMessages();
  }, [messages]);

  useEffect(() => {
    if (server.id && channel.id) {
      const q = query(
        collection(
          db,
          "servers",
          server?.id,
          "channels",
          channel?.id,
          "messages"
        )
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messageList: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          messageList.push(doc.data());
        });
        dispatch(setMessages([...messageList]));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [channel]);

  function displayMessages() {
    const chat: JSX.Element[] = [];
    const sortedMessages = [...messages];
    sortedMessages.sort((a, b) => {
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
