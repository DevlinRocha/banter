import tw from "tailwind-styled-components/dist/tailwind";
import { setUserSettingsOpen, useSettingsState } from "../../features/settings";
import SettingsSidebar from "./SettingsSidebar";
import SettingsView from "./SettingsView";
import LogoutConfirm from "./LogoutConfirm";
import Image from "next/image";
import closeButton from "../../../assets/closeButton.svg";
import { useAppDispatch } from "../../redux/hooks";

export default function UserSettings() {
  const { userSettingsOpen, logoutConfirmOpen } = useSettingsState();
  const dispatch = useAppDispatch();

  return (
    <Container>
      {logoutConfirmOpen ? (
        <LogoutContainer logoutConfirmOpen={logoutConfirmOpen}>
          <LogoutConfirm />
        </LogoutContainer>
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

type ContainerProps = {
  logoutConfirmOpen: boolean;
};

const Container = tw.div`
  flex w-full h-full
`;

const SettingsContainer = tw(Container)`
  justify-around
`;

const LogoutContainer = tw.div<ContainerProps>`
  fixed w-full h-full z-10
  ${(props) => (props.logoutConfirmOpen ? "bg-black bg-opacity-[0.85]" : null)}
`;

const CloseButton = tw.figure`
  pt-15 text-center mr-5
`;

const StyledImage = tw(Image)`
  cursor-pointer
`;

const Caption = tw.figcaption`
`;
