import Link from "next/link";
import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../../redux/hooks";
import {
  ServerData,
  setServers,
  setServer,
  useServersState,
} from "../../features/servers";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import Image from "next/image";
import banterIcon from "../../../assets/banterIcon.svg";
import DefaultServerIcon from "./DefaultServerIcon";

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

          serverID: doc.id,
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
        <BanterIcon>
          <StyledImage
            src={banterIcon}
            width={48}
            height={48}
            alt="Banter logo"
          />
        </BanterIcon>

        <Separator />

        {servers.map((server, index) => {
          return (
            <Link href={server.path} key={index}>
              <a onClick={() => handleClick(server)}>
                <Server>
                  {server.img ? (
                    <StyledImage
                      loader={() => server.img}
                      src={server.img}
                      width={48}
                      height={48}
                      alt="Server icon"
                    />
                  ) : (
                    <ServerIcon server={server} />
                  )}
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
  hidden w-18 h-full
  lg:block
`;

const Sidebar = tw.ol`
  flex flex-col bg-gray-200 pt-3 w-18 h-full items-center
`;

const BanterIcon = tw.figure`
  flex justify-center cursor-pointer
`;

const Server = tw.li`
  flex justify-center mb-2 cursor-pointer
`;

const StyledImage = tw(Image)`
  rounded-3xl transition-all ease-linear fill-cyan-300
  hover:rounded-xl
`;

const ServerIcon = tw(DefaultServerIcon)`
  rounded-3xl transition-all ease-linear
  group fill-white
  hover:rounded-xl hover:fill-primary
`;

const Separator = tw.div`
  w-8 h-0.5 my-2 bg-gray-300
`;