import tw from "tailwind-styled-components/dist/tailwind";
import {
  setUnsavedChangesError,
  setUserCopy,
  setUserSettingsOpen,
  setUserSettingsScreen,
  useUserSettingsState,
} from "../../features/userSettings";
import SettingsSidebar from "./UserSettingsSidebar";
import SettingsView from "./userSettingsView/UserSettingsView";
import LogoutConfirm from "./LogoutConfirm";
import Image from "next/image";
import closeButton from "../../../assets/closeButton.svg";
import { useAppDispatch } from "../../redux/hooks";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";
import ChangeAvatar from "./userSettingsView/userProfileSettings/ChangeAvatar";
import { useUserState } from "../../features/user";
import { useEffect } from "react";

export default function UserSettings() {
  const {
    logoutConfirmOpen,
    changeUsernameOpen,
    changeEmailOpen,
    changeAvatarOpen,
    userCopy,
  } = useUserSettingsState();
  const { user } = useUserState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserCopy(user));
  }, []);

  function unsavedChanges() {
    if (!userCopy) return false;

    if (userCopy !== user) {
      dispatch(setUnsavedChangesError(true));

      setTimeout(() => {
        dispatch(setUnsavedChangesError(false));
      }, 1500);

      return true;
    }
  }

  function closeWindow() {
    if (unsavedChanges()) return;

    dispatch(setUserSettingsOpen(false));
    dispatch(setUserSettingsScreen("My Account"));
  }

  return (
    <Container>
      {logoutConfirmOpen && <LogoutConfirm />}

      {changeUsernameOpen && <ChangeUsername />}

      {changeEmailOpen && <ChangeEmail />}

      {changeAvatarOpen && <ChangeAvatar />}

      <SettingsSidebar />

      <SettingsContainer>
        <SettingsView />

        <CloseButton>
          <StyledImage
            onClick={closeWindow}
            src={closeButton}
            width={36}
            height={36}
            alt={"Close button"}
          />

          <Caption>ESC</Caption>
        </CloseButton>
      </SettingsContainer>
    </Container>
  );
}

const Container = tw.div`
  flex flex-none w-screen h-screen select-none
`;

const SettingsContainer = tw.div`
  relative flex w-full h-full
`;

const CloseButton = tw.figure`
  flex-none pt-15 text-center mr-5
`;

const StyledImage = tw(Image)`
  cursor-pointer
`;

const Caption = tw.figcaption`
  text-[13px] text-gray-300 font-semibold
`;
