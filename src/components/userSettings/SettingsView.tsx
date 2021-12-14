import { useSettingsState } from "../../features/settings";
import UserProfileSettings from "./UserProfileSettings";
import MyAccountSettings from "./MyAccountSettings";

export default function SettingsView() {
  const { settings } = useSettingsState();

  switch (settings) {
    case "My Account":
      return <MyAccountSettings />;
    case "User Profile":
      return <UserProfileSettings />;
  }
}
