import tw from "tailwind-styled-components/dist/tailwind";
import { setUserSettingsOpen, useSettingsState } from "../../features/settings";
import SettingsSidebar from "./SettingsSidebar";
import SettingsView from "./SettingsView";
import LogoutConfirm from "./LogoutConfirm";
import Image from "next/image";
import closeButton from "../../../assets/closeButton.svg";
import { useAppDispatch } from "../../redux/hooks";
import ChangeUsername from "./ChangeUsername";
import ChangeEmail from "./ChangeEmail";

export default function UserSettings() {
  const {
    userSettingsOpen,
    logoutConfirmOpen,
    changeUsernameOpen,
    changeEmailOpen,
  } = useSettingsState();
  const dispatch = useAppDispatch();

  return (
    <Container>
      {logoutConfirmOpen ? (
        <LogoutContainer logoutConfirmOpen={logoutConfirmOpen}>
          <LogoutConfirm />
        </LogoutContainer>
      ) : null}

      {changeUsernameOpen ? (
        <ChangeUsernameContainer changeUsernameOpen={changeUsernameOpen}>
          <ChangeUsername />
        </ChangeUsernameContainer>
      ) : null}

      {changeEmailOpen ? (
        <ChangeEmailContainer changeEmailOpen={changeEmailOpen}>
          <ChangeEmail />
        </ChangeEmailContainer>
      ) : null}

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

type LogoutContainerProps = {
  logoutConfirmOpen: boolean;
};

type ChangeUsernameContainerProps = {
  changeUsernameOpen: boolean;
};

type ChangeEmailContainerProps = {
  changeEmailOpen: boolean;
};

const Container = tw.div`
  flex w-full h-full
`;

const SettingsContainer = tw(Container)`
  justify-around
`;

const LogoutContainer = tw(Container)<LogoutContainerProps>`
  ${(props) =>
    props.logoutConfirmOpen
      ? "fixed w-full h-full bg-black bg-opacity-[0.85] z-10"
      : null}
`;

const ChangeUsernameContainer = tw(Container)<ChangeUsernameContainerProps>`
  ${(props) =>
    props.changeUsernameOpen
      ? "fixed w-full h-full bg-black bg-opacity-[0.85] z-10"
      : null}
`;

const ChangeEmailContainer = tw(Container)<ChangeEmailContainerProps>`
  ${(props) =>
    props.changeEmailOpen
      ? "fixed w-full h-full bg-black bg-opacity-[0.85] z-10"
      : null}
`;

const CloseButton = tw.figure`
  pt-15 text-center mr-5
`;

const StyledImage = tw(Image)`
  cursor-pointer
`;

const Caption = tw.figcaption`
`;
