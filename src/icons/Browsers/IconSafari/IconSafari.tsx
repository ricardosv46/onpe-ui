import * as React from "react";
import { SVGProps } from "react";

export interface IconSafariProps extends SVGProps<SVGSVGElement> {}

export const IconSafari = (props: IconSafariProps) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_7500_5262)">
      <path d="M7.93359 16.068L10.9832 10.9832L16.068 7.93359L13.0184 13.0184L7.93359 16.068Z" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM19.0864 6.0112C19.1782 5.85821 19.2162 5.67893 19.1944 5.50185C19.1726 5.32477 19.0923 5.16006 18.9661 5.0339C18.8399 4.90774 18.6752 4.82737 18.4982 4.80557C18.3211 4.78378 18.1418 4.8218 17.9888 4.9136L9.8176 9.8176L4.912 17.9888C4.8202 18.1418 4.78218 18.3211 4.80397 18.4982C4.82577 18.6752 4.90614 18.8399 5.0323 18.9661C5.15845 19.0923 5.32317 19.1726 5.50025 19.1944C5.67733 19.2162 5.85661 19.1782 6.0096 19.0864L14.1808 14.1824L19.0864 6.0112Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_7500_5262">
        <rect width={24} height={24} fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default IconSafari;
