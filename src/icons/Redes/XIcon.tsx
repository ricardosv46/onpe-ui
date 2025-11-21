import { SVGProps } from "react";

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <title>X</title>
    <path
      fill="#062A50"
      d="M24 12c0 6.625-5.375 12-12 12S0 18.625 0 12C.006 5.375 5.375 0 12.006 0 18.631 0 24 5.375 24 12Z"
    />
    <path
      fill="#fff"
      d="M13.733 10.895 18.59 5.7h-1.842l-3.81 4.077L10.018 5.7H4.976l5.103 7.127-5.103 5.459h1.842l4.059-4.342 3.11 4.342h5.043l-5.297-7.392Zm-6.16-3.853h1.758l7.102 9.916h-1.758L7.573 7.042Z"
    />
  </svg>
);
export default XIcon;
