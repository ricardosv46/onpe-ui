import * as React from "react";
import { SVGProps } from "react";

export interface IconCheckProps extends SVGProps<SVGSVGElement> {}

export const IconCheck = (props: IconCheckProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor" />
  </svg>
);

export default IconCheck;
