import { useAddServerState } from "../../features/addServer";
import AboutServer from "./AboutServer";
import CreateServer from "./CreateServer";
import CustomizeServer from "./CustomizeServer";

export default function AddServer() {
  const { addServerWindow } = useAddServerState();

  switch (addServerWindow) {
    case "Create Server":
    case "Join Server":
      return <CreateServer />;

    case "About Server":
      return <AboutServer />;

    case "Customize Server":
      return <CustomizeServer />;

    default:
      return <CreateServer />;
  }
}
