import Link from "next/link";
import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../redux/hooks";
import {
  Server,
  setServers,
  setServer,
  useServersState,
} from "../features/servers";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export default function Servers() {
  const { servers, server } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const q = query(collection(db, "servers"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const serverList: Server[] = [];

      querySnapshot.forEach((doc) => {
        const server: Server = {
          name: doc.data().name,
          path: `/channels/${doc.id}/`,
          id: doc.id,
        };

        serverList.push(server);
      });

      dispatch(setServers(serverList));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function handleClick(server: Server) {
    dispatch(setServer(server));
  }

  return (
    <Nav>
      <Sidebar>
        {servers.map((server, index) => {
          return (
            <Link href={server.path} key={index}>
              <a onClick={() => handleClick(server)}>
                <Server>{server.name}</Server>
              </a>
            </Link>
          );
        })}
      </Sidebar>
    </Nav>
  );
}

const Nav = tw.nav`
  hidden lg:block w-18 h-screen
`;

const Sidebar = tw.ol`
`;

const Server = tw.li`
  cursor-pointer
`;
