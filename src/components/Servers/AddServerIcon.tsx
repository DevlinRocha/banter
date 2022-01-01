import { SVGProps } from "react";

export default function AddServerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={48} height={48} xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={48} height={48} />
      <line
        className={`group-hover:stroke-white`}
        x1="24"
        y1="16"
        x2="24"
        y2="32"
        stroke="#3BA55D"
        strokeWidth="2"
      />
      <line
        className={`group-hover:stroke-white`}
        x1="16"
        y1="24"
        x2="32"
        y2="24"
        stroke="#3BA55D"
        strokeWidth="2"
      />
    </svg>
  );
}
