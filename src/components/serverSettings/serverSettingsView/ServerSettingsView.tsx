import { useServerSettingsState } from "../../../features/serverSettings";
import UnsavedChanges from "../../UnsavedChanges";
import ServerOverview from "./ServerOverview";

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

    default:
      return <ServerOverview />;
  }
}
