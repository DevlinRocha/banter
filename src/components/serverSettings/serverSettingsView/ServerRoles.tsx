import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { useServersState } from "../../../features/servers";
import {
  setServerChangesMade,
  useServerSettingsState,
} from "../../../features/serverSettings";
import { useAppDispatch } from "../../../redux/hooks";

export default function ServerRoles() {
  const { server } = useServersState();
  const { serverCopy } = useServerSettingsState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!serverCopy) return;

    if (server !== serverCopy) {
      dispatch(setServerChangesMade(true));
    } else {
      dispatch(setServerChangesMade(false));
    }
  }, [server, serverCopy]);

  return (
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

        <CreateRoleButton>Create Role</CreateRoleButton>
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
