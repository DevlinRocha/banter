import tw from "tailwind-styled-components/dist/tailwind";
import {
  setChangeEmailOpen,
  setUserSettingsOpen,
} from "../../features/settings";
import { useAppDispatch } from "../../redux/hooks";

export default function ChangeEmail() {
  const dispatch = useAppDispatch();

  function closeWindow() {
    dispatch(setChangeEmailOpen(false));
  }

  function handleChangeEmail() {
    dispatch(setChangeEmailOpen(false));
    dispatch(setUserSettingsOpen(false));
  }

  return (
    <Container>
      <Heading>Enter an email address</Heading>

      <Body>Enter a new email address and your existing password.</Body>
      <Buttons>
        <CancelButton onClick={closeWindow}>Cancel</CancelButton>
        <LogOutButton onClick={handleChangeEmail}>Done</LogOutButton>
      </Buttons>
    </Container>
  );
}

const Container = tw.div`
  fixed flex flex-col top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-110 h-50 bg-white rounded-md
`;

const Heading = tw.h2`
  w-full p-4
`;

const Body = tw.p`
  w-full h-18.5 pr-2 pb-5 pl-4
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
