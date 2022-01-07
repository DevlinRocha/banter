import tw from "tailwind-styled-components/dist/tailwind";
import {
  setUserSettingsOpen,
  useUserSettingsState,
} from "../../features/userSettings";
import SettingsSidebar from "./SettingsSidebar";
import SettingsView from "./settingsView/SettingsView";
import LogoutConfirm from "./LogoutConfirm";
import Image from "next/image";
import closeButton from "../../../assets/closeButton.svg";
import { useAppDispatch } from "../../redux/hooks";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";
import ChangeAvatar from "./settingsView/userProfileSettings/ChangeAvatar";

export default function UserSettings() {
  const {
    userSettingsOpen,
    logoutConfirmOpen,
    changeUsernameOpen,
    changeEmailOpen,
    changeAvatarOpen,
  } = useUserSettingsState();
  const dispatch = useAppDispatch();

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
            onClick={() => dispatch(setUserSettingsOpen(!userSettingsOpen))}
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
  flex flex-none w-screen h-screen
`;

const SettingsContainer = tw.div`
  flex w-full h-full
`;

const CloseButton = tw.figure`
  pt-15 text-center mr-5
`;

const StyledImage = tw(Image)`
  cursor-pointer
`;

const Caption = tw.figcaption`
  text-[13px] text-gray-300 font-semibold
`;
