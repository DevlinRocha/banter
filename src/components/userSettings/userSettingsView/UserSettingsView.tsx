import { useUserSettingsState } from "../../../features/userSettings";
import UserProfileSettings from "./userProfileSettings/UserProfileSettings";
import MyAccountSettings from "./myAccountSettings/MyAccountSettings";
import UnsavedChanges from "../../UnsavedChanges";
import AppearanceSettings from "./appearanceSettings/AppearanceSettings";

export default function SettingsView() {
  const { userSettingsScreen, userChangesMade } = useUserSettingsState();

  switch (userSettingsScreen) {
    case "My Account":
      return <MyAccountSettings />;

    case "User Profile":
      return (
        <>
          <UserProfileSettings />
          {userChangesMade && <UnsavedChanges changes="user" />}
        </>
      );

    case "Appearance":
      return <AppearanceSettings />;

    default:
      return <MyAccountSettings />;
  }
}
