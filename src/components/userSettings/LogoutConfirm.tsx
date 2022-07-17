import tw from "tailwind-styled-components/dist/tailwind";
import { logOut } from "../../../firebase";
import { resetServerState } from "../../features/servers";
import { resetUserState } from "../../features/user";
import {
  setLogoutConfirmOpen,
  setUserSettingsOpen,
} from "../../features/userSettings";
import { useAppDispatch } from "../../redux/hooks";

export default function LogoutConfirm() {
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setLogoutConfirmOpen(false));
  }

  function handleLogOut() {
    logOut();
    dispatch(setLogoutConfirmOpen(false));
    dispatch(setUserSettingsOpen(false));
    dispatch(resetServerState());
    dispatch(resetUserState());
  }

  function stopPropagation(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  return (
    <Backdrop onClick={closeWindow}>
      <Container onClick={stopPropagation}>
        <Heading>Log Out</Heading>

        <Body>Are you sure you want to log out?</Body>
        <Buttons>
          <CancelButton onClick={closeWindow}>Cancel</CancelButton>
          <LogOutButton onClick={handleLogOut}>Log Out</LogOutButton>
        </Buttons>
      </Container>
    </Backdrop>
  );
}

const Backdrop = tw.div`
  fixed w-full h-full bg-black/[0.85] z-10
`;

const Container = tw.div`
  fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-110 h-50 bg-white rounded-md z-20
`;

const Heading = tw.h2`
  w-full p-4 text-lg font-semibold
`;

const Body = tw.p`
  w-full h-18.5 pr-2 pb-5 pl-4 text-gray-500
`;

const Buttons = tw.div`
  flex justify-end w-full h-17.5 p-4 bg-gray-100
`;

const CancelButton = tw.button`
  py-0.5 px-4 h-full
`;

const LogOutButton = tw(CancelButton)`
  bg-red-500 text-white rounded-md
`;
