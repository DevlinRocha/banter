import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  setMessages,
  useServersState,
  MessageData,
} from "../../features/servers";
import tw from "tailwind-styled-components";
import Message from "../Message";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Messages() {
  const { server, channel, messages } = useServersState();
  const dispatch = useAppDispatch();

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
        const messageList: MessageData[] = [];
        querySnapshot.forEach((doc) => {
          const message: MessageData = {
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
          messageList.push(message);
        });
        messageList.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        dispatch(setMessages(messageList));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [channel]);

  return (
    <List>
      {messages.map((message, index) => {
        return <Message message={message} key={index} />;
      })}
    </List>
  );
}

const List = tw.ol`
  flex-1 flex flex-col justify-end overflow-y-auto
`;
