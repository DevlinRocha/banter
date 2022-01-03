import { useAddServerState } from "../../features/addServer";
import CreateServer from "./CreateServer";

export default function AddServer() {
  const { addServerWindow } = useAddServerState();

  switch (addServerWindow) {
    case "Create Server":
      return <CreateServer />;

    case "Join Server":

    case "About Server":

    case "Customize Server":

    default:
      return <CreateServer />;
  }
}
