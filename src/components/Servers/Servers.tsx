import Link from "next/link";
import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../../redux/hooks";
import {
  ServerData,
  setServers,
  setServer,
  useServersState,
  resetServerState,
  setServerIDs,
} from "../../features/servers";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import Image from "next/image";
import banterIcon from "../../../assets/banterIcon.svg";
import DefaultServerIcon from "./DefaultServerIcon";
import { useUserState } from "../../features/user";
import { useRouter } from "next/router";
import AddServerIcon from "./AddServerIcon";
import { setaddServerOpen } from "../../features/addServer";

export default function Servers() {
  const { servers, serverIDs } = useServersState();
  const { user } = useUserState();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.userID) return;

    const q = query(collection(db, "users", user.userID, "servers"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const serverIDs: string[] = [];

      querySnapshot.forEach((doc) => {
        serverIDs.push(doc.id);
      });

      dispatch(setServerIDs(serverIDs));
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "servers"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const serverList: ServerData[] = [];

      querySnapshot.forEach((doc) => {
        if (!serverIDs.includes(doc.id)) return;

        const server: ServerData = {
          name: doc.data().name,

          img: doc.data().img,

          path: `/channels/${doc.id}/${doc.data().defaultChannel}/`,

          serverID: doc.id,

          defaultChannel: doc.data()?.defaultChannel,
        };

        serverList.push(server);
      });

      dispatch(setServers(serverList));
    });

    return () => {
      unsubscribe();
    };
  }, [serverIDs]);

  function handleClick(server: ServerData) {
    dispatch(setServer(server));
  }

  function addServer() {
    dispatch(setaddServerOpen(true));
  }

  return (
    <Nav>
      <Sidebar>
        <Link href="/channels/@me" passHref>
          <BanterIcon onClick={() => dispatch(resetServerState())}>
            <BanterImage
              path={router.asPath}
              src={banterIcon}
              width={48}
              height={48}
              alt="Banter logo"
            />
          </BanterIcon>
        </Link>

        <Separator />

        {servers.map((server, index) => {
          return (
            <Link href={server.path} passHref key={index}>
              <Server onClick={() => handleClick(server)}>
                {server.img ? (
                  <StyledImage
                    loader={() => server.img}
                    src={server.img}
                    width={48}
                    height={48}
                    alt="Server icon"
                  />
                ) : (
                  <ServerIcon server={server} path={router.asPath} />
                )}
              </Server>
            </Link>
          );
        })}

        <AddServerIconContainer onClick={addServer} />
      </Sidebar>
    </Nav>
  );
}

type ServerIconProps = {
  server: ServerData;
  path: string;
};

type BanterProps = {
  path: string;
};

const Nav = tw.nav`
  hidden w-18 h-full
  lg:block
`;

const Sidebar = tw.ol`
  flex flex-col bg-gray-200 pt-3 w-18 h-full items-center overflow-x-hidden overflow-y-auto
`;

const BanterIcon = tw.figure`
  flex justify-center cursor-pointer
`;

const Server = tw.li`
  flex justify-center mb-2 cursor-pointer
`;

const StyledImage = tw(Image)`
  rounded-3xl transition-all ease-linear
  hover:rounded-xl
`;

const BanterImage = tw(StyledImage)<BanterProps>`

  ${(props) => {
    switch (props.path) {
      case "/channels/@me":
        return "rounded-xl";

      default:
        return null;
    }
  }}
  
`;

const ServerIcon = tw(DefaultServerIcon)<ServerIconProps>`
  transition-all ease-linear group
  hover:rounded-xl hover:fill-primary
  ${(props) =>
    props.path.includes(props.server.serverID)
      ? "rounded-xl fill-primary"
      : "rounded-3xl fill-white"}
`;

const AddServerIconContainer = tw(AddServerIcon)`
  transition-all ease-linear rounded-3xl fill-white cursor-pointer group
  hover:rounded-xl hover:fill-active
`;

const Separator = tw.div`
  w-8 h-0.5 my-2 bg-gray-300
`;
