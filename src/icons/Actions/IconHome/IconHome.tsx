import React from "react";

export interface IconHomeProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const IconHome = ({ size = 20, ...props }: IconHomeProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 2.69L15 7.19V15H13V9H7V15H5V7.19L10 2.69ZM10 0L0 9H3V17H9V11H11V17H17V9H20" fill="currentColor" />
    </svg>
  );
};

export default IconHome;
