import { useAddServerState } from "../../features/addServer";
import AboutServer from "./AboutServer";
import CreateServer from "./CreateServer";

export default function AddServer() {
  const { addServerWindow } = useAddServerState();

  switch (addServerWindow) {
    case "Create Server":
      return <CreateServer />;

    case "Join Server":

    case "About Server":
      return <AboutServer />;

    case "Customize Server":

    default:
      return <CreateServer />;
  }
}
