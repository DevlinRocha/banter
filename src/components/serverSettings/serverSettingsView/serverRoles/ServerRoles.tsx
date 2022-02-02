import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useServersState } from "../../../../features/servers";
import {
  setEditRoleOpen,
  setServerChangesMade,
  useServerSettingsState,
} from "../../../../features/serverSettings";
import { useAppDispatch } from "../../../../redux/hooks";
import ServerRolesSidebar from "./ServerRolesSidebar";

export default function ServerRoles() {
  const { server } = useServersState();
  const { serverCopy, editRoleOpen } = useServerSettingsState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!serverCopy) return;

    if (server !== serverCopy) {
      dispatch(setServerChangesMade(true));
    } else {
      dispatch(setServerChangesMade(false));
    }
  }, [server, serverCopy]);

  function handleClick() {
    dispatch(setEditRoleOpen(true));
  }

  return editRoleOpen ? (
    <ServerRolesSidebar />
  ) : (
    <Container>
      <Heading>ROLES</Heading>

      <ServerSettings>
        <SubHeading>Organize your members</SubHeading>

        <SubTextContainer>
          <SubText>
            Use roles to organize your server members and customize their
            permissions.
          </SubText>
        </SubTextContainer>

        <CreateRoleButton onClick={handleClick}>Create Role</CreateRoleButton>
      </ServerSettings>

      <Divider></Divider>
    </Container>
  );
}

const Container = tw.main`
  min-w-[542px] max-w-[740px] pt-15 px-10 pb-20
`;

const Heading = tw.h2`
  mb-5 font-semibold
`;

const ServerSettings = tw.section`
  flex flex-col items-center
`;

const SubHeading = tw.h3`
  mb-2 text-2xl text-gray-800 font-semibold
`;

const SubTextContainer = tw.div`
  mb-4
`;

const SubText = tw.span`
  text-sm text-gray-600 font-medium
`;

const CreateRoleButton = tw.button`
  w-fit h-[34px] px-4 py-0.5 bg-blue-600 rounded-middle text-sm text-white font-medium
`;

const Divider = tw.div`
  max-w-165 h-px border-t my-8 border-gray-900/[0.08]
`;

const SettingsContainer = tw.div`
  flex flex-col max-w-[660px]
`;

const SettingContainer = tw.div`
  flex items-center mb-2 p-2.5 rounded-middle cursor-pointer
`;
