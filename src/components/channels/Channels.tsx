import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  Channel,
  getChannels,
  setChannel,
  useServersState,
} from "../../features/servers";
import UserPanel from "./UserPanel";
import Link from "next/link";
import tw from "tailwind-styled-components/dist/tailwind";

export default function Channels() {
  const { server, channels } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getChannels());
  }, [server, channels]);

  function handleClick(channel: Channel) {
    dispatch(setChannel(channel));
  }

  return (
    <Container>
      <Nav>
        <ServerList>
          {channels.map((channel, index) => {
            return (
              <Link href={channel.path} key={index}>
                <a onClick={() => handleClick(channel)}>
                  <Channel>{channel.name}</Channel>
                </a>
              </Link>
            );
          })}
        </ServerList>
      </Nav>

      <UserPanel />
    </Container>
  );
}

const Container = tw.div`
  flex flex-col justify-between w-60 h-screen
`;

const Nav = tw.nav`
  hidden lg:block
`;

const ServerList = tw.ol`
`;

const Channel = tw.li`
  cursor-pointer
`;
