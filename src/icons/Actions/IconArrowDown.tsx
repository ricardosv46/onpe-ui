import { SVGProps } from "react";

/** Chevron down para Select y menús. Fondo del botón lo pinta el contenedor. */
export const IconArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M30 15L20 25L10 15"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default IconArrowDown;
