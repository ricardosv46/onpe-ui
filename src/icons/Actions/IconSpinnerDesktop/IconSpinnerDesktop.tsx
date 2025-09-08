import * as React from "react";
import { SVGProps } from "react";

export interface IconSpinnerDesktopProps extends SVGProps<SVGSVGElement> {}

export const IconSpinnerDesktop = (props: IconSpinnerDesktopProps) => (
  <svg width={102} height={102} viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M50.9999 3.08313C23.9241 3.08208 3.08296 24.6456 3.08325 51C3.08354 75.4375 22.453 98.9167 50.9999 98.9167C77.5573 98.9167 98.9166 77.3542 98.9166 51"
      stroke="currentColor"
      strokeWidth={6}
      strokeLinecap="round"
    />
  </svg>
);

