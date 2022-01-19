import { SVGProps, useEffect, useState } from "react";
import { ServerData } from "../../features/servers";

interface DefaultServerIconProps extends SVGProps<SVGSVGElement> {
  server: ServerData;
  path: string;
}

export default function DefaultServerIcon(props: DefaultServerIconProps) {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    getInitials();
  }, [props.server.name]);

  function getInitials() {
    const string = props.server.name;
    const matches = string.replace("'", "").match(/\b(\w)/g);

    if (!matches) return setInitials("");

    const initials = matches.join("");
    setInitials(initials);
  }

  return (
    <svg width={512} height={512} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={512} height={512} />
      <text
        className={`front-medium group-hover:fill-white
        ${
          props.path.includes(props.server.serverID)
            ? "fill-white"
            : "fill-gray-800"
        }`}
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
      >
        {initials}
      </text>
    </svg>
  );
}
