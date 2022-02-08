import { useEffect, useLayoutEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import { useServersState } from "../features/servers";
import { useServerSettingsState } from "../features/serverSettings";

export default function AssignRole() {
  const { server } = useServersState();
  const { assignRolePosition } = useServerSettingsState();
  const containerRef = useRef<HTMLDivElement>(null);

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
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
              <RoleContainer key={index}>
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
