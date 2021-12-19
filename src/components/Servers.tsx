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
import banterIcon from "../../assets/banterIcon.svg";

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
        <BanterIcon>
          <StyledImage
            src={banterIcon}
            width={48}
            height={48}
            alt="Banter logo"
          />
        </BanterIcon>

        {servers.map((server, index) => {
          return (
            <Link href={server.path} key={index}>
              <a onClick={() => handleClick(server)}>
                <Server>
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
  hidden w-18 h-full
  lg:block
`;

const Sidebar = tw.ol`
  bg-gray-200 pt-3 w-18 h-full
`;

const BanterIcon = tw.figure`
  flex justify-center mb-2 cursor-pointer
`;

const Server = tw.li`
  flex justify-center mb-2 cursor-pointer
`;

const StyledImage = tw(Image)`
  rounded-full transition-all
  hover:rounded-md
`;
