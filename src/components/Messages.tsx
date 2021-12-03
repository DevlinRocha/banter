import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { fetchMessages } from "../redux/servers";
import tw from "tailwind-styled-components";
import Message from "./Message";

export default function Messages() {
  const { channel, messages } = useAppSelector((state) => state.servers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMessages());
  }, [channel]);

  useEffect(() => {
    displayMessages();
  }, [messages]);

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
