import { useEffect, useLayoutEffect, useRef } from "react";
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
  const scrollRef = useRef<any>();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (!server.serverID || !channel.channelID) return;

    const q = query(
      collection(
        db,

        "servers",

        server.serverID,

        "channels",

        channel.channelID,

        "messages"
      )
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messageList: MessageData[] = [];

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        const message: MessageData = {
          content: docData.content,

          userID: docData.userID,

          date: docData.date,

          timestamp: docData.timestamp,

          reactions: docData.reactions,

          edited: docData.edited,

          image: docData.image,

          video: docData.video,
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
  }, [channel.channelID]);

  return (
    <Container>
      <List>
        <WelcomeMessage>
          <Heading>Welcome to #{channel.name}!</Heading>
          <Subtext>This is the start of the #{channel.name} channel.</Subtext>
        </WelcomeMessage>

        <Separator />

        {messages.map((message, index) => {
          return <Message message={message} key={index} />;
        })}

        <Scroll ref={scrollRef} />
      </List>
    </Container>
  );
}

const Container = tw.div`
  absolute flex w-full h-full overflow-x-clip overflow-y-scroll break-words whitespace-pre-wrap
`;

const List = tw.ol`
  flex flex-col flex-1 mt-auto pr-1
`;

const WelcomeMessage = tw.div`
  m-4 select-none
`;

const Heading = tw.h1`
  my-2 font-bold text-double text-ellipsis
`;

const Subtext = tw.span`
  text-gray-500
`;

const Separator = tw.div`
  flex h-0 mr-3.5 ml-4 border-t border-gray-300
`;

const Scroll = tw.span`
  w-px h-4
`;
