import tw from "tailwind-styled-components/dist/tailwind";
import {
  setCreateChannelOpen,
  setInviteFriendsOpen,
  setServerDropdownOpen,
  setServerSettingsOpen,
} from "../../features/serverSettings";
import { useAppDispatch } from "../../redux/hooks";
import { useUserState } from "../../features/user";

export default function ServerDropdown() {
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  function closeWindow(e: React.MouseEvent) {
    dispatch(setServerDropdownOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <ListContainer>
          <ListItemInvite onClick={() => dispatch(setInviteFriendsOpen(true))}>
            Invite People
          </ListItemInvite>

          {user.roles.serverOwner && (
            <ListItem onClick={() => dispatch(setServerSettingsOpen(true))}>
              Server Settings
            </ListItem>
          )}

          {user.roles.serverOwner && (
            <ListItem onClick={() => dispatch(setCreateChannelOpen(true))}>
              Create Channel
            </ListItem>
          )}

          <Separator />

          <ListItemLeave>Leave Server</ListItemLeave>
        </ListContainer>
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full z-50
`;

const Container = tw.div`
  absolute flex flex-col w-[220px] top-[50px] left-20.5 px-2 py-1.5 bg-white rounded-middle drop-shadow-xl
`;

const ListContainer = tw.ol`
`;

const ListItem = tw.li`
  flex items-center my-0.5 py-1.5 pl-2 h-8 rounded-middle cursor-pointer
  hover:bg-indigo-800 hover:text-white
`;

const ListItemInvite = tw(ListItem)`
  text-indigo-500
`;

const ListItemLeave = tw(ListItem)`
  text-red-500
  hover:bg-red-500
`;

const Separator = tw.div`
  w-[196px] h-px border-b border-gray-300 m-1
`;
