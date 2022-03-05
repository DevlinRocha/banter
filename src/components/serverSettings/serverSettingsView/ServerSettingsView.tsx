import { useServerSettingsState } from "../../../features/serverSettings";
import UnsavedChanges from "../../UnsavedChanges";
import ServerModeration from "./ServerModeration";
import ServerOverview from "./ServerOverview";
import ServerRoles from "./serverRoles/ServerRoles";

export default function ServerSettingsView() {
  const { serverSettingsScreen, serverChangesMade } = useServerSettingsState();

  switch (serverSettingsScreen) {
    case "Overview":
      return (
        <>
          <ServerOverview />
          {serverChangesMade && <UnsavedChanges changes="server" />}
        </>
      );

    case "Roles":
      return (
        <>
          <ServerRoles />
          {serverChangesMade && <UnsavedChanges changes="server" />}
        </>
      );

    case "Moderation":
      return (
        <>
          <ServerModeration />
          {serverChangesMade && <UnsavedChanges changes="server" />}
        </>
      );

    default:
      return <ServerOverview />;
  }
}
