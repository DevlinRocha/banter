import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  Channel,
  setChannel,
  setChannels,
  useServersState,
} from "../../features/servers";
import { query, collection, onSnapshot } from "firebase/firestore";
import UserPanel from "./UserPanel";
import Link from "next/link";
import tw from "tailwind-styled-components/dist/tailwind";
import { db } from "../../../firebase";

export default function Channels() {
  const { server, channels } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (server.id) {
      const q = query(collection(db, "servers", server.id, "channels"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const channelList: Channel[] = [];
        querySnapshot.forEach((doc) => {
          const channel: Channel = {
            name: doc.data().name,
            path: `${server.path}${doc.id}/`,
            id: doc.id,
          };

          channelList.push(channel);
        });

        dispatch(setChannels(channelList));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [server]);

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
