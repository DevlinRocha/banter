import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setMessages, useServersState } from "../redux/servers";
import tw from "tailwind-styled-components";
import Message from "./Message";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function Messages() {
  const { channel, messages } = useAppSelector((state) => state.servers);
  const serversState = useServersState();
  const dispatch = useAppDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    displayMessages();
  }, [messages]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const q = query(
      collection(
        db,
        "servers",
        serversState.server.id,
        "channels",
        serversState.channel.id,
        "messages"
      )
    );

    const messageList: any[] = [];

    const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        const message: any = {
          content: doc.data().content,
          date: doc.data().date,
          edited: doc.data().edited,
          reactions: doc.data().reactions,
          timestamp: doc.data().timestamp,
          user: {
            name: doc.data().user.name,
            img: doc.data().user.img,
          },
        };
        messageList.push(doc.data());
      });
      dispatch(setMessages(messageList));
    });

    return () => {
      unsubscribe();
    };
  }, [channel]);

  function displayMessages() {
    const chat: any = [];
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
