import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  setMessages,
  useServersState,
  MessageData,
} from "../../features/servers";
import tw from "tailwind-styled-components";
import Message from "./Message";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";

export default function Messages() {
  const { server, channel, messages } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (server.serverID && channel.channelID) {
      const q = query(
        collection(
          db,

          "servers",

          server?.serverID,

          "channels",

          channel?.channelID,

          "messages"
        )
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messageList: MessageData[] = [];
        querySnapshot.forEach((doc) => {
          const message: MessageData = {
            user: {
              username: doc.data().user.name,

              avatar: doc.data().user.img,
            },

            content: doc.data().content,

            date: doc.data().date,

            timestamp: doc.data().timestamp,

            reactions: doc.data().reactions,

            edited: doc.data().edited,
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
    <Container>
      <List>
        {messages.map((message, index) => {
          return <Message message={message} key={index} />;
        })}
      </List>
    </Container>
  );
}

const Container = tw.div`
  flex w-full h-full overflow-y-scroll
`;

const List = tw.ol`
  flex flex-col mt-auto
`;
