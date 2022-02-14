import { useEffect, useLayoutEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { setServerRole } from "../../firebase";
import { useServersState } from "../features/servers";
import {
  setAssignRoleOpen,
  setAssignRolePosition,
  useServerSettingsState,
} from "../features/serverSettings";
import { useAppDispatch } from "../redux/hooks";

export default function AssignRole() {
  const { server, member } = useServersState();
  const { assignRolePosition } = useServerSettingsState();
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  useLayoutEffect(() => {
    if (!assignRolePosition || !assignRolePosition.top || !containerRef.current)
      return;

    const containerHeight = containerRef.current.getBoundingClientRect().height;

    if (assignRolePosition.top + containerHeight > window.innerHeight) {
      dispatch(
        setAssignRolePosition({
          ...assignRolePosition,
          top: window.innerHeight - containerHeight - 64,
        })
      );
    }
  }, [assignRolePosition, containerRef]);

  function handleClick(roleID: string) {
    dispatch(setAssignRoleOpen(false));

    if (!member.roles || !member.roles.roles)
      return setServerRole(server.serverID, member.userID, [roleID]);

    const newRoles = member.roles.roles;

    newRoles.push(roleID);
    setServerRole(server.serverID, member.userID, newRoles);
  }

  return (
    <Container
      onClick={stopPropagation}
      ref={containerRef}
      style={assignRolePosition}
      roles={server.roles ? true : false}
    >
      {server.roles ? (
        <ResultsContainer>
          {server.roles.map((role, index) => {
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

type ContainerProps = {
  roles: boolean;
};

const Container = tw.div<ContainerProps>`
  absolute w-[250px] min-h-[144px] max-h-[290px] p-2 bg-white border rounded
  ${(props) => (props.roles ? "h-[290px]" : "h-[144px]")}
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