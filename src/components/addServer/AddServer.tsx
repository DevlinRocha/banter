import { useAddServerState } from "../../features/addServer";
import AboutServer from "./AboutServer";
import CreateServer from "./CreateServer";
import CustomizeServer from "./CustomizeServer";
import JoinServer from "./JoinServer";

export default function AddServer() {
  const { addServerWindow } = useAddServerState();

  switch (addServerWindow) {
    case "Create Server":
      return <CreateServer />;

    case "Join Server":
      return <JoinServer />;

    case "About Server":
      return <AboutServer />;

    case "Customize Server":
      return <CustomizeServer />;

    default:
      return <CreateServer />;
  }
}
