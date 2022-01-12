import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import {
  ChannelData,
  setChannel,
  setChannels,
  setVoiceChannel,
  useServersState,
} from "../../features/servers";
import { query, collection, onSnapshot, doc } from "firebase/firestore";
import UserPanel from "./UserPanel";
import Link from "next/link";
import tw from "tailwind-styled-components/dist/tailwind";
import { db, joinVoice, openUserMedia } from "../../../firebase";
import { useRouter } from "next/router";
import downArrowIcon from "../../../assets/downArrowIcon.svg";
import {
  setserverDropdownOpen,
  useServerSettingsState,
} from "../../features/serverSettings";
import {
  setLocalStream,
  setPeerConnection,
  setRemoteStream,
} from "../../features/voiceChat";

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
        const channel: ChannelData = {
          name: doc.data().name,

          topic: doc.data().topic,

          type: doc.data().type,

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
  }, [server]);

  useEffect(() => {
    if (!server.serverID || !server.defaultChannel) return;

    const unsubscribe = onSnapshot(
      doc(db, "servers", server.serverID, "channels", server.defaultChannel),
      (doc) => {
        const channel: ChannelData = {
          name: doc.data()?.name,

          topic: doc.data()?.topic,

          type: doc.data()?.type,

          path: `${server.serverID}/${doc.id}/`,

          channelID: doc.id,
        };
        dispatch(setChannel(channel));
      }
    );

    return () => {
      unsubscribe();
    };
  }, [server]);

  function joinChannel(channel: ChannelData) {
    dispatch(setChannel(channel));
  }

  async function joinVoiceChannel(channel: ChannelData) {
    dispatch(setVoiceChannel(channel));
    const { localStream, remoteStream } = await openUserMedia();

    dispatch(setLocalStream(localStream));
    dispatch(setRemoteStream(remoteStream));

    const peerConnection = joinVoice(
      server.serverID,
      channel.channelID,
      localStream,
      remoteStream
    );

    if (!peerConnection) return;

    setPeerConnection(peerConnection);
  }

  function toggleDropdown() {
    dispatch(setserverDropdownOpen(!serverDropdownOpen));
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
            return channel.type === "text" ? (
              <Link href={channel.path} key={index} passHref>
                <a onClick={() => joinChannel(channel)}>
                  <Channel channel={channel} path={router.asPath}>
                    # {channel.name}
                  </Channel>
                </a>
              </Link>
            ) : (
              <Channel
                onClick={() => joinVoiceChannel(channel)}
                channel={channel}
                path={router.asPath}
              >
                {channel.name}
              </Channel>
            );
          })}
        </ChannelList>
      </ChannelListContainer>

      <UserPanel />
    </Container>
  );
}

type ChannelProps = {
  channel: ChannelData;
  path: string;
};

const Container = tw.nav`
  flex flex-col bg-gray-50 w-60 h-full
`;

const ChannelListContainer = tw.div`
  flex-1 overflow-hidden
  hover:overflow-y-auto
`;

const Header = tw.header`
  flex flex-none justify-between items-center w-60 h-12 mb-4 px-4 border-b border-gray-300 cursor-pointer
`;

const Heading = tw.h1`
  font-semibold
`;

const StyledImage = tw(Image)`
`;

const ChannelList = tw.ol`
`;

const Channel = tw.li<ChannelProps>`
  flex cursor-pointer py-1 pr-2 mx-2 pl-2 rounded-md
  ${(props) =>
    props.path.includes(props.channel.channelID)
      ? "bg-gray-200"
      : "hover:bg-gray-100"}
`;
