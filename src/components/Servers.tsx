import Link from "next/link";
import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../redux/hooks";
import {
  ServerData,
  setServers,
  setServer,
  useServersState,
} from "../features/servers";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Image from "next/image";

export default function Servers() {
  const { servers, server } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const q = query(collection(db, "servers"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const serverList: ServerData[] = [];

      querySnapshot.forEach((doc) => {
        const server: ServerData = {
          name: doc.data().name,
          img: doc.data().img,
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

  function handleClick(server: ServerData) {
    dispatch(setServer(server));
  }

  return (
    <Nav>
      <Sidebar>
        {servers.map((server, index) => {
          return (
            <Link href={server.path} key={index}>
              <a onClick={() => handleClick(server)}>
                <Server>
                  {" "}
                  <StyledImage
                    loader={() => server.img}
                    src={server.img}
                    width={48}
                    height={48}
                    alt="Server icon"
                  />
                </Server>
              </a>
            </Link>
          );
        })}
      </Sidebar>
    </Nav>
  );
}

const Nav = tw.nav`
  hidden lg:block w-18 h-full
`;

const Sidebar = tw.ol`
  bg-gray-300 w-full h-full
`;

const Server = tw.li`
  flex justify-center align-center mb-2 cursor-pointer
`;

const StyledImage = tw(Image)`
  rounded-full
`;
