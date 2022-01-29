import tw from "tailwind-styled-components/dist/tailwind";
import { useAppDispatch } from "../../redux/hooks";
import { useServersState } from "../../features/servers";
import {
  setDeleteServerConfirmOpen,
  setServerSettingsScreen,
  useServerSettingsState,
} from "../../features/serverSettings";
import { setUnsavedChangesError } from "../../features/userSettings";

export default function ServerSettingsSidebar() {
  const { serverSettingsScreen, serverCopy } = useServerSettingsState();
  const { server } = useServersState();
  const dispatch = useAppDispatch();

  function unsavedChanges() {
    if (!serverCopy) return false;

    if (serverCopy !== server) {
      dispatch(setUnsavedChangesError(true));

      setTimeout(() => {
        dispatch(setUnsavedChangesError(false));
      }, 1500);

      return true;
    }
  }

  function viewServerOverview() {
    if (unsavedChanges()) return;

    dispatch(setServerSettingsScreen("Overview"));
  }

  return (
    <Container>
      <NavContainer>
        <ListHeading>
          {server.name.toUpperCase() || "SERVER SETTINGS"}
        </ListHeading>

        <SettingsList>
          <ListItem
            className={`${
              serverSettingsScreen === "Overview" && "bg-gray-300"
            }`}
            onClick={viewServerOverview}
          >
            Overview
          </ListItem>
        </SettingsList>

        <Divider />

        <SettingsList>
          <DeleteServer
            onClick={() => dispatch(setDeleteServerConfirmOpen(true))}
          >
            Delete Server
          </DeleteServer>
        </SettingsList>
      </NavContainer>
    </Container>
  );
}

const Container = tw.div`
  flex flex-col items-end w-1/2 bg-gray-100
`;

const NavContainer = tw.nav`
  w-[218px] py-15 pr-1.5 pl-5
`;

const SettingsList = tw.ol`
`;

const ListHeading = tw.h3`
  px-2.5 pb-1.5 text-xs font-bold
`;

const ListItem = tw.li`
  px-2.5 py-1.5 mb-0.5 font-medium rounded-md cursor-pointer
  hover:bg-gray-200
`;

const Divider = tw.div`
  h-px mx-2.5 my-2 bg-gray-200
`;

const DeleteServer = tw(ListItem)`
  text-red-500
`;
