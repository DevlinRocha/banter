import tw from "tailwind-styled-components/dist/tailwind";
import SettingsSidebar from "./SettingsSidebar";
import SettingsView from "./SettingsView";

export default function UserSettings() {
  return (
    <Container>
      <SettingsSidebar />
      <SettingsView />
    </Container>
  );
}

const Container = tw.div`
  w-screen h-screen
`;
