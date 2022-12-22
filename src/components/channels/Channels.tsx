import Image from "next/image";
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
import { useRouter } from "next/router";
import downArrowIcon from "../../../assets/downArrowIcon.svg";
import {
  setServerDropdownOpen,
  useServerSettingsState,
} from "../../features/serverSettings";

export default function Channels() {
  const { server, channels } = useServersState();
  const { serverDropdownOpen } = useServerSettingsState();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!server.serverID) return;

    const q = query(collection(db, "servers", server.serverID, "channels"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const channelList: ChannelData[] = [];

      querySnapshot.forEach((doc) => {
        const docData = doc.data();

        const channel: ChannelData = {
          name: docData.name,

          topic: docData.topic,

          type: docData.type,

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
  }, [server.serverID]);

  useEffect(() => {
    if (!server.serverID || !server.defaultChannel) return;

    const unsubscribe = onSnapshot(
      doc(db, "servers", server.serverID, "channels", server.defaultChannel),
      (doc) => {
        const docData = doc.data();

        const channel: ChannelData = {
          name: docData?.name,

          topic: docData?.topic,

          type: docData?.type,

          path: `${server.serverID}/${doc.id}/`,

          channelID: doc.id,
        };
        dispatch(setChannel(channel));
      }
    );

    return () => {
      unsubscribe();
    };
  }, [server.serverID]);

  function joinChannel(channel: ChannelData) {
    dispatch(setChannel(channel));
  }

  function toggleDropdown() {
    dispatch(setServerDropdownOpen(!serverDropdownOpen));
  }

  return (
    <Container>
      <Header onClick={toggleDropdown}>
        <Heading>{server.name}</Heading>

        <StyledImage src={downArrowIcon} />
      </Header>

      <ChannelListContainer>
        <ChannelList>
          {channels.map((channel, index) => {
            return (
              <Link href={channel.path} key={index} passHref>
                <a onClick={() => joinChannel(channel)}>
                  <ChannelContainer channel={channel} path={router.asPath}>
                    <ChannelIcon>
                      {channel.type === "text" ? "#" : "*"}
                    </ChannelIcon>
                    <ChannelName>{channel.name}</ChannelName>
                  </ChannelContainer>
                </a>
              </Link>
            );
          })}
        </ChannelList>
      </ChannelListContainer>

      <UserPanel />
    </Container>
  );
}

interface ChannelProps {
  channel: ChannelData;
  path: string;
}

const Container = tw.nav`
  flex flex-col bg-gray-100 w-60 h-full
  dark:bg-dark-200
`;

const ChannelListContainer = tw.div`
  flex-1 overflow-hidden
  hover:overflow-y-auto
`;

const Header = tw.header`
  flex flex-none justify-between items-center w-60 h-12 mb-4 px-4 border-b border-gray-300 cursor-pointer
  dark:border-0 dark:shadow-[0_1px_0_0_rgba(4,4,5,0.2),0_1.5px_0_0_rgba(6,6,7,0.05),0_2px_0_0_rgba(4,4,5,0.05)]
`;

const Heading = tw.h1`
  font-semibold truncate
  dark:text-white
`;

const StyledImage = tw(Image)`
`;

const ChannelList = tw.ol`
`;

const ChannelContainer = tw.li`
  flex items-center cursor-pointer py-1 pr-2 mx-2 pl-2 max-h-8 rounded-md
  ${(props: ChannelProps) =>
    props.path.includes(props.channel.channelID)
      ? "bg-gray-500/[0.24] dark:text-white"
      : "hover:bg-gray-500/[0.08] dark:text-text-secondary"}
`;

const ChannelIcon = tw.span`
  mr-1.5 text-gray-500 font-bold text-2xl font-thin
`;

const ChannelName = tw.span`
  font-medium truncate
`;
