import * as React from "react";
import { SVGProps } from "react";

export interface IconSpinnerMobileProps extends SVGProps<SVGSVGElement> {}

export const IconSpinnerMobile = (props: IconSpinnerMobileProps) => (
  <svg width={33} height={33} viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.5 3C8.87169 2.9997 2.99992 9.07499 3 16.5C3.00008 23.385 8.45721 30 16.5 30C23.9822 30 30 23.925 30 16.5"
      stroke="currentColor"
      strokeWidth={6}
      strokeLinecap="round"
    />
  </svg>
);

export default IconSpinnerMobile;
