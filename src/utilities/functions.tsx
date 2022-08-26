import tw from "tailwind-styled-components/dist/tailwind";
import Link from "next/link";
import { ChannelData, setChannel } from "../features/servers";
import { store } from "../redux/store";

export function findLinks(
  message: string,
  channels: ChannelData[],
  dispatch: typeof store.dispatch
) {
  if (
    !message ||
    (!message.includes("https://") && !message.includes("http://"))
  )
    return findChannels(message, channels, dispatch);

  const messageArray = message.split(/(https?:\/\/\w[^ ]+)/);

  const fixedArray = addSlash(messageArray);

  return (
    <>
      {fixedArray.map((message, index) => {
        return index % 2 === 0 ? (
          <span key={index}>{findChannels(message, channels, dispatch)}</span>
        ) : (
          <Link href={message} passHref key={index}>
            <LinkText rel="noreferrer noopener" target="_blank">
              {findChannels(message, channels, dispatch)}
            </LinkText>
          </Link>
        );
      })}
    </>
  );
}

function addSlash(messageArray: string[]) {
  return messageArray.map((message, index) => {
    return index % 2 === 0
      ? message
      : message.includes("/", 8)
      ? message
      : message.concat("/");
  });
}

function findChannels(
  message: string,
  channels: ChannelData[],
  dispatch: typeof store.dispatch
) {
  if (!message || !message.includes("#")) return message;

  const messageArray = message.split(/(#\w[^ ]+)/);

  return (
    <>
      {messageArray.map((message, index) => {
        const match = channels.find(
          (channel) => message.substring(1) === channel.name
        );

        return match ? (
          <Link href={match.path} passHref key={index}>
            <ChannelLinkText onClick={() => dispatch(setChannel(match))}>
              {message}
            </ChannelLinkText>
          </Link>
        ) : (
          <span key={index}>{message}</span>
        );
      })}
    </>
  );
}

const LinkText = tw.a`
  text-blue-600
  hover:underline
`;

const ChannelLinkText = tw.a`
  text-blue-600 bg-blue-100 rounded px-0.5 cursor-pointer
  hover:text-white hover:bg-blue-600
`;
