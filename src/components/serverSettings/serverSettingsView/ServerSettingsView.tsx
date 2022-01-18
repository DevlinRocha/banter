import { useServerSettingsState } from "../../../features/serverSettings";
import ServerOverview from "./ServerOverview";

export default function ServerSettingsView() {
  const { serverSettingsScreen, serverChangesMade } = useServerSettingsState();

  switch (serverSettingsScreen) {
    case "Overview":
      return <ServerOverview />;

    /* {serverChangesMade && <UnsavedChanges />} */

    default:
      return <ServerOverview />;
  }
}
