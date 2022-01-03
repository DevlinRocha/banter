import { useUserSettingsState } from "../../features/userSettings";
import UserProfileSettings from "./UserProfileSettings";
import MyAccountSettings from "./MyAccountSettings";

export default function SettingsView() {
  const { userSettingsScreen } = useUserSettingsState();

  switch (userSettingsScreen) {
    case "My Account":
      return <MyAccountSettings />;

    case "User Profile":
      return <UserProfileSettings />;

    default:
      return <MyAccountSettings />;
  }
}
