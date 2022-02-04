import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../../../../redux/hooks";
import { RoleData, useServersState } from "../../../../features/servers";
import {
  setCurrentRole,
  setEditRoleOpen,
  useServerSettingsState,
} from "../../../../features/serverSettings";

export default function ServerRolesSidebar() {
  const { server } = useServersState();
  const { currentRole } = useServerSettingsState();
  const dispatch = useAppDispatch();

  function goBack() {
    dispatch(setEditRoleOpen(false));
  }

  function handleClick(sort: number) {
    const role = server.roles.find((role) => role.sort === sort);
    dispatch(setCurrentRole(role));
  }

  return (
    <Container>
      <NavContainer>
        <TitleContainer>
          <BackButton onClick={goBack}>BACK</BackButton>
        </TitleContainer>

        <SettingsList>
          {server.roles.map((role, index) => {
            return (
              <RoleContainer
                currentRole={currentRole}
                sort={role.sort}
                onClick={() => handleClick(role.sort)}
                key={index}
              >
                <RoleName>{role.name}</RoleName>
              </RoleContainer>
            );
          })}
        </SettingsList>
      </NavContainer>
    </Container>
  );
}

type RoleContainerProps = {
  currentRole: RoleData;
  sort: number;
};

const Container = tw.div`
  flex flex-col items-end w-fit border-r
`;

const NavContainer = tw.nav`
  w-[232px] py-15 pr-1.5 pl-5
`;

const SettingsList = tw.ol`
`;

const TitleContainer = tw.div`
  px-2.5 pb-1.5 font-semibold
`;

const BackButton = tw.span`
  text-gray-600 cursor-pointer
  hover:text-black
`;

const RoleContainer = tw.div<RoleContainerProps>`
  min-h-[34px] px-2.5 py-1.5 mb-0.5 font-medium rounded-md cursor-pointer truncate
  hover:bg-gray-100
  ${(props) => (props.currentRole.sort === props.sort ? "bg-gray-300" : "")}
`;

const RoleName = tw.span`
`;
