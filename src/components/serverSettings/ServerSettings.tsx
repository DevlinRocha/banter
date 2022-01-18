import tw from "tailwind-styled-components/dist/tailwind";
import ServerSettingsSidebar from "./ServerSettingsSidebar";
import ServerSettingsView from "./serverSettingsView/ServerSettingsView";
import Image from "next/image";
import closeButton from "../../../assets/closeButton.svg";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import {
  setServerSettingsOpen,
  setServerCopy,
  setServerSettingsScreen,
  useServerSettingsState,
} from "../../features/serverSettings";
import { useServersState } from "../../features/servers";
import { setUnsavedChangesError } from "../../features/userSettings";

export default function ServerSettings() {
  const { server } = useServersState();
  const { serverCopy } = useServerSettingsState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setServerCopy(server));
  }, []);

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

  function closeWindow() {
    if (unsavedChanges()) return;

    dispatch(setServerSettingsOpen(false));
    dispatch(setServerSettingsScreen("Overview"));
  }

  return (
    <Container>
      <ServerSettingsSidebar />

      <SettingsContainer>
        <ServerSettingsView />

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
