import tw from "tailwind-styled-components";
import Title from "./Title";
import Message from "./Message";
import TextArea from "./TextArea";

import chatHistory from "../../data/chatHistory.json";

interface Messages {
  [key: string]: {
    user: {
      img: string;
      username: string;
    };
    content: string;
    date: string;
    edited: boolean;
    reactions: null;
  };
}

function displayMessages(messages: Messages) {
  const messageList = [];
  for (let message in messages) {
    messageList.push(<Message message={messages[message]} key={message} />);
  }
  return messageList;
}

export default function Chat() {
  const messages = chatHistory.messages;

  return (
    <>
      <Title />
      <ChatList>{displayMessages(messages)}</ChatList>
      <TextArea />
    </>
  );
}

const ChatList = tw.ol`
`;
