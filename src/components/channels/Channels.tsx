import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  ChannelData,
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
        const channelList: ChannelData[] = [];
        querySnapshot.forEach((doc) => {
          const channel: ChannelData = {
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

  function handleClick(channel: ChannelData) {
    dispatch(setChannel(channel));
  }

  return (
    <Container>
      <Nav>
        <Header>{server.name}</Header>

        <ChannelList>
          {channels.map((channel, index) => {
            return (
              <Link href={channel.path} key={index}>
                <a onClick={() => handleClick(channel)}>
                  <Channel># {channel.name}</Channel>
                </a>
              </Link>
            );
          })}
        </ChannelList>
      </Nav>

      <UserPanel />
    </Container>
  );
}

const Container = tw.section`
  flex flex-col justify-between bg-gray-50 w-60 h-full
`;

const Nav = tw.nav`
  hidden
  lg:block
`;

const Header = tw.h2`
`;

const ChannelList = tw.ol`
  overflow-y-auto
`;

const Channel = tw.li`
  flex cursor-pointer py-1 pr-2 mx-2 pl-2 rounded-md
  hover:bg-gray-200
`;
