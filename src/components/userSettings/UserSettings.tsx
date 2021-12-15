import tw from "tailwind-styled-components/dist/tailwind";
import { useSettingsState } from "../../features/settings";
import SettingsSidebar from "./SettingsSidebar";
import SettingsView from "./SettingsView";
import LogoutConfirm from "./LogoutConfirm";

export default function UserSettings() {
  const { logoutConfirmOpen } = useSettingsState();

  return (
    <Container>
      {logoutConfirmOpen ? <LogoutConfirm /> : null}
      <SettingsSidebar />
      <SettingsView />
    </Container>
  );
}

const Container = tw.div`
  flex w-screen h-screen
`;
