import { useState, useEffect } from "react";
import Link from "next/link";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

import tw from "tailwind-styled-components/dist/tailwind";

interface ServerList {
  path: string;
  name: string;
}

export default function Servers() {
  const [servers, setServers] = useState<ServerList[]>([]);
  useEffect(() => {
    getServers();
  }, []);
  async function getServers() {
    let serverList: any[] = [];
    const q = query(collection(db, "servers"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const server = {
        path: `/channels/${doc.id}/`,
        name: doc.data().name,
      };
      serverList.push(server);
    });
    setServers(serverList);
  }

  return (
    <Nav>
      <Sidebar>
        {servers.map((server, index) => {
          return (
            <Link href={server.path} key={index}>
              <Server>{server.name}</Server>
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

const Server = tw.li`
  cursor-pointer
`;
