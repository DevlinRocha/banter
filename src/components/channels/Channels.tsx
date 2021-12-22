import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  ChannelData,
  setChannel,
  setChannels,
  useServersState,
} from "../../features/servers";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import UserPanel from "./UserPanel";
import Link from "next/link";
import tw from "tailwind-styled-components/dist/tailwind";
import { db } from "../../../firebase";

export default function Channels() {
  const { server, channels } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (server.serverID) {
      const q = query(collection(db, "servers", server.serverID, "channels"));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const channelList: ChannelData[] = [];

        querySnapshot.forEach((doc) => {
          const channel: ChannelData = {
            name: doc.data().name,

            topic: doc.data().topic,

            path: `/channels/${server.serverID}/${doc.id}/`,

            channelID: doc.id,
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

  useEffect(() => {
    if (server.serverID && server.defaultChannel) {
      const unsubscribe = onSnapshot(
        doc(db, "servers", server.serverID, "channels", server.defaultChannel),
        (doc) => {
          const channel: ChannelData = {
            name: doc.data()?.name,
            topic: doc.data()?.topic,
            path: `${server.serverID}/${doc.id}/`,
            channelID: doc.id,
          };
          dispatch(setChannel(channel));
        }
      );

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
        <Header>
          <Heading>{server.name}</Heading>
        </Header>

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

const Header = tw.header`
  flex items-center w-60 h-12 mb-4 px-4 border-b border-gray-300
`;

const Heading = tw.h1`
  font-semibold
`;

const ChannelList = tw.ol`
  overflow-y-auto
`;

const Channel = tw.li`
  flex cursor-pointer py-1 pr-2 mx-2 pl-2 rounded-md
  hover:bg-gray-200
`;
