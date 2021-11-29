import { useState, useEffect } from "react";
import Link from "next/link";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import tw from "tailwind-styled-components/dist/tailwind";

interface ChannelsProps {
  server: string;
}

export default function Channels(props: ChannelsProps) {
  const [channels, setChannels] = useState<any[]>([]);
  useEffect(() => {
    getChannels();
  }, []);
  async function getChannels() {
    const channelList: any[] = [];
    const q = query(collection(db, "servers", props.server, "channels"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const channel = {
        path: `/channels/${props.server}/${doc.id}`,
        name: doc.data().name,
      };
      channelList.push(channel);
    });
    setChannels(channelList);
  }
  return (
    <Nav>
      <Sidebar>
        {channels.map((channel, index) => {
          return (
            <Link href="/" key={index}>
              <Channel>{channel.name}</Channel>
            </Link>
          );
        })}
      </Sidebar>
    </Nav>
  );
}

const Nav = tw.nav`
    hidden lg:block h-screen
`;

const Sidebar = tw.ol`
`;

const Channel = tw.li`
  cursor-pointer
`;
