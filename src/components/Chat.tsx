import tw from "tailwind-styled-components";
import Message from "./Message";

import chatHistory from "../../data/chatHistory.json";

interface Messages {
  [key: string]: {
    user: {
      img: string;
      username: string;
    };
    content: string;
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

  return <Main>{displayMessages(messages)}</Main>;
}

const Main = tw.main`
`;
