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
import { setAddServerOpen } from "../../features/addServer";

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

        const docData = doc.data();

        const server: ServerData = {
          name: docData.name,

          img: docData.img,

          path: `/channels/${doc.id}/${docData.defaultChannel}/`,

          serverID: doc.id,

          defaultChannel: docData?.defaultChannel,

          roles: docData.roles,

          contentFilter: docData.contentFilter,
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
    dispatch(setAddServerOpen(true));
  }

  return (
    <Nav>
      <Sidebar>
        <Link href="/channels/@me" passHref>
          <BanterIcon onClick={() => dispatch(resetServerState())}>
            <ServerBar server-id={"@me"} path={router.asPath} />

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
              <ServerContainer onClick={() => handleClick(server)}>
                <ServerBar server-id={server.serverID} path={router.asPath} />
                {server.img ? (
                  <CustomServerIcon
                    server-id={server.serverID}
                    path={router.asPath}
                    loader={() => server.img}
                    src={server.img}
                    width={48}
                    height={48}
                    unoptimized
                    alt="Server icon"
                  />
                ) : (
                  <ServerIcon
                    server={server}
                    height={48}
                    width={48}
                    path={router.asPath}
                  />
                )}
              </ServerContainer>
            </Link>
          );
        })}
        <AddServerIconContainer onClick={addServer}>
          <CreateServerIcon />
        </AddServerIconContainer>
      </Sidebar>
    </Nav>
  );
}

interface ServerIconProps {
  server: ServerData;
  path: string;
}

interface BanterProps {
  serverID?: string;
  path: string;
}

const Nav = tw.nav`
  w-18 h-full
`;

const Sidebar = tw.ol`
  flex flex-col bg-gray-200 pt-3 w-18 h-full items-center overflow-x-hidden overflow-y-auto
`;

const BanterIcon = tw.figure`
  relative flex justify-center w-full cursor-pointer group
`;

const ServerContainer = tw.li`
  relative flex justify-center mb-2 w-full cursor-pointer group
`;

const ServerBar = tw.span`
  absolute left-0 w-1 h-10 bg-black rounded-r-middle
  group-hover:flex
  ${(props: BanterProps) =>
    props.serverID && props.path.includes(props.serverID)
      ? "flex h-10 top-1"
      : "hidden h-5 top-3.5"}
`;

const StyledImage = tw(Image)`
  rounded-3xl transition-all ease-linear object-cover
  group-hover:rounded-xl
`;

const CustomServerIcon = tw(StyledImage)`
  ${(props: BanterProps) =>
    props.serverID && props.path.includes(props.serverID)
      ? "rounded-xl fill-primary"
      : "rounded-3xl fill-white"}
`;

const BanterImage = tw(StyledImage)`
  ${(props: BanterProps) => {
    switch (props.path) {
      case "/channels/@me":
        return "rounded-xl";

      default:
        return null;
    }
  }}
`;

const ServerIcon = tw(DefaultServerIcon)`
  text-lg transition-all ease-linear
  group-hover:rounded-xl group-hover:fill-primary
  ${(props: ServerIconProps) =>
    props.path.includes(props.server.serverID)
      ? "rounded-xl fill-primary"
      : "rounded-3xl fill-white"}
`;

const AddServerIconContainer = tw.div`
  cursor-pointer group
`;

const CreateServerIcon = tw(AddServerIcon)`
  transition-all ease-linear flex-none rounded-3xl fill-white cursor-pointer
  group-hover:rounded-xl group-hover:fill-active
`;

const Separator = tw.div`
  w-8 h-0.5 my-2 bg-gray-300
`;
