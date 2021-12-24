import { NextRouter } from "next/router";
import { SVGProps, useEffect, useState } from "react";
import { ServerData } from "../../features/servers";

interface DefaultServerIconProps extends SVGProps<SVGSVGElement> {
  server: ServerData;
  router: NextRouter;
}

export default function DefaultServerIcon(props: DefaultServerIconProps) {
  const [initials, setInitials] = useState("");

  useEffect(() => {
    getInitials();
  }, [props.server.name]);

  function getInitials() {
    const string = props.server.name;
    const matches = string.match(/\b(\w)/g);
    if (matches) {
      const initials = matches.join("");
      setInitials(initials);
    }
  }

  return (
    <svg width={48} height={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={48} height={48} />
      <text
        className={`text-lg group-hover:fill-white ${
          props.router.asPath.includes(props.server.serverID)
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
