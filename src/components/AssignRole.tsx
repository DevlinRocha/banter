import { useState, useEffect, useLayoutEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { setServerRole } from "../../firebase";
import { RoleData, useServersState } from "../features/servers";
import {
  setAssignRoleOpen,
  setAssignRoleHeight,
  useServerSettingsState,
} from "../features/serverSettings";
import { useAppDispatch } from "../redux/hooks";

export default function AssignRole() {
  const [leftoverRoles, setLeftoverRoles] = useState<RoleData[]>([]);
  const { server, member } = useServersState();
  const { assignRolePosition } = useServerSettingsState();
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    dispatch(
      setAssignRoleHeight(containerRef.current.getBoundingClientRect().height)
    );
  }, [leftoverRoles]);

  useLayoutEffect(() => {
    if (!member.roles) return setLeftoverRoles(server.roles);

    const leftoverRoles: RoleData[] = [];

    if (!!server.roles)
      for (const role of server.roles) {
        if (!member.roles.includes(role)) leftoverRoles.push(role);
      }

    setLeftoverRoles(leftoverRoles);
  }, [member]);

  function handleClick(roleID: string) {
    dispatch(setAssignRoleOpen(false));

    if (!member.roles)
      return setServerRole(server.serverID, member.userID, [roleID]);

    const newRoles = member.roles.map((role) => role.roleID);

    let duplicate = false;

    for (const role of newRoles) {
      if (role === roleID) return (duplicate = true);
    }

    if (duplicate) return;

    newRoles.push(roleID);

    setServerRole(server.serverID, member.userID, newRoles);
  }

  return (
    <Container
      onClick={stopPropagation}
      ref={containerRef}
      style={assignRolePosition}
      $roles={leftoverRoles && leftoverRoles.length > 0 ? true : false}
    >
      {leftoverRoles && leftoverRoles.length > 0 ? (
        <ResultsContainer>
          {leftoverRoles.map((role, index) => {
            const RoleColorStyle = {
              backgroundColor: role.color,
            };

            return (
              <RoleContainer
                onClick={() => handleClick(role.roleID)}
                key={index}
              >
                <RoleColor style={RoleColorStyle} />
                <RoleName>{role.name}</RoleName>
              </RoleContainer>
            );
          })}
        </ResultsContainer>
      ) : (
        <NoResultsContainer>
          <Heading>Nope!</Heading>
        </NoResultsContainer>
      )}
    </Container>
  );
}

interface ContainerProps {
  $roles: boolean;
}

const Container = tw.div`
  absolute w-[250px] min-h-[78px] max-h-[256px] p-2 bg-white border rounded
  ${(props: ContainerProps) => (props.$roles ? "h-[256px]" : "h-[78px]")}
`;

const ResultsContainer = tw.div`
  mt-2 py-2
`;

const RoleContainer = tw.li`
  flex items-center w-[232px] px-2 py-2.5 mb-1 font-medium rounded-md cursor-pointer
  hover:bg-gray-100
`;

const RoleColor = tw.div`
  flex-none w-3 h-3 rounded-full
`;

const RoleName = tw.span`
  ml-2 font-medium truncate
`;

const NoResultsContainer = tw.div`
  flex justify-center p-5
`;

const Heading = tw.h4`
  font-semibold
`;
