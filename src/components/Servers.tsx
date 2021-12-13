import Link from "next/link";
import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../redux/hooks";
import {
  getServers,
  Server,
  setServer,
  useServersState,
} from "../features/servers";

export default function Servers() {
  const { servers } = useServersState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getServers());
  }, [servers]);

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
