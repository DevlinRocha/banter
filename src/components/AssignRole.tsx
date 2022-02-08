import tw from "tailwind-styled-components";
import { useServersState } from "../features/servers";

export default function AssignRole() {
  const { server } = useServersState();

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Container onClick={stopPropagation}>
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

const Container = tw.div`
  w-[250px] min-h-[144px] max-h-[290px] p-2 bg-white border
`;

const ResultsContainer = tw.div`
`;

const RoleContainer = tw.div`
  flex items-center w-[232px] px-2.5 py-1.5 mb-0.5 -ml-1.5 font-medium rounded-md cursor-pointer
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
