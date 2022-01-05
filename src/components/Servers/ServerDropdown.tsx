import React from "react";
import tw from "tailwind-styled-components/dist/tailwind";
import {
  setInviteFriendsOpen,
  setserverDropdownOpen,
} from "../../features/serverSettings";
import { useAppDispatch } from "../../redux/hooks";

export default function ServerDropdown() {
  const dispatch = useAppDispatch();

  function closeWindow(e: React.MouseEvent) {
    dispatch(setserverDropdownOpen(false));
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <ListContainer>
          <ListItemInvite onClick={() => dispatch(setInviteFriendsOpen(true))}>
            Invite people
          </ListItemInvite>

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
  absolute flex flex-col w-[220px] top-[50px] left-20.5 px-2 py-1.5 bg-white rounded-middle
`;

const ListContainer = tw.ol`
`;

const ListItem = tw.li`
  my-0.5 py-1.5 pl-2 rounded-middle cursor-pointer
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
