import Link from "next/link";
import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { getServers } from "../redux/servers";

export default function Servers() {
  const { servers } = useAppSelector((state) => state.servers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getServers());
  }, []);

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
