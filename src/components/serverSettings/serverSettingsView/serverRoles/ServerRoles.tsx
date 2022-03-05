import { useEffect } from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import { createServerRole } from "../../../../../firebase";
import { setServer, useServersState } from "../../../../features/servers";
import {
  setCurrentRole,
  setEditRoleOpen,
  setRolesCopy,
  setServerChangesMade,
  setServerCopy,
  useServerSettingsState,
} from "../../../../features/serverSettings";
import { useAppDispatch } from "../../../../redux/hooks";
import ServerRolesSidebar from "./ServerRolesSidebar";
import ServerEditRole from "./SeverEditRole";
import { v4 as uuidv4 } from "uuid";

export default function ServerRoles() {
  const { server } = useServersState();
  const { serverCopy, editRoleOpen, serverChangesMade } =
    useServerSettingsState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setRolesCopy(server.roles));
  }, []);

  useEffect(() => {
    if (!serverCopy) return;

    if (server !== serverCopy) {
      dispatch(setServerChangesMade(true));
    } else {
      dispatch(setServerChangesMade(false));
    }
  }, [server, serverCopy]);

  function createRole() {
    if (!serverCopy) return;

    const newRoleID = uuidv4();
    createServerRole(serverCopy, newRoleID);

    dispatch(setEditRoleOpen(true));

    const newServer = { ...server };

    const serverVersion = { ...serverCopy };

    newServer.roles = server.roles
      ? [
          ...server.roles,
          {
            name: "new role",
            color: "#99AAB5",
            separateDisplay: false,
            sort: server.roles.length,
            permissions: {
              manageChannels: false,
              manageRoles: false,
              manageServer: false,
            },
            roleID: newRoleID,
          },
        ]
      : [
          {
            name: "new role",
            color: "#99AAB5",
            separateDisplay: false,
            sort: 0,
            permissions: {
              manageChannels: false,
              manageRoles: false,
              manageServer: false,
            },
            roleID: newRoleID,
          },
        ];

    serverVersion.roles = serverCopy.roles
      ? [
          ...serverCopy.roles,
          {
            name: "new role",
            color: "#99AAB5",
            separateDisplay: false,
            sort: server.roles.length,
            permissions: {
              manageChannels: false,
              manageRoles: false,
              manageServer: false,
            },
            roleID: newRoleID,
          },
        ]
      : [
          {
            name: "new role",
            color: "#99AAB5",
            separateDisplay: false,
            sort: 0,
            permissions: {
              manageChannels: false,
              manageRoles: false,
              manageServer: false,
            },
            roleID: newRoleID,
          },
        ];

    const role = newServer.roles.find(
      (role) => role.sort === newServer.roles.length - 1
    );

    dispatch(setCurrentRole(role));

    dispatch(setServer(newServer));

    if (serverChangesMade) return dispatch(setServerCopy(serverVersion));

    dispatch(setServerCopy(newServer));
  }

  function editRole(sort: number) {
    const role = server.roles.find((role) => role.sort === sort);

    dispatch(setCurrentRole(role));
    dispatch(setEditRoleOpen(true));
  }

  return editRoleOpen ? (
    <EditContainer>
      <ServerRolesSidebar />
      <ServerEditRole />
    </EditContainer>
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

        <CreateRoleButton onClick={createRole}>Create Role</CreateRoleButton>
      </ServerSettings>

      <Divider></Divider>

      {server.roles &&
        server.roles.map((role, index) => {
          const RoleColorStyle = {
            backgroundColor: role.color,
          };

          return (
            <RoleContainer onClick={() => editRole(role.sort)} key={index}>
              <RoleColor style={RoleColorStyle} />
              <RoleName>{role.name}</RoleName>
            </RoleContainer>
          );
        })}
    </Container>
  );
}

const Container = tw.main`
  min-w-[542px] max-w-[740px] pt-15 px-10 pb-20
`;

const EditContainer = tw.main`
  flex min-w-[524px] max-w-[740px] pr-10
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

const RoleContainer = tw.div`
  flex w-[700px] h-15 items-center rounded border-y border-gray-100 cursor-pointer
  hover:bg-gray-100
`;

const RoleColor = tw.div`
  w-3 h-3 mr-2.5 rounded-full
`;

const RoleName = tw.span`
`;
