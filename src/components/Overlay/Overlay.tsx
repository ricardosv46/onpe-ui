import React from "react";
import "./Overlay.css";

export interface OverlayProps {
  show?: boolean;
  onClick?: () => void;
  color?:
    | "blue"
    | "skyblue"
    | "skyblue-light"
    | "yellow"
    | "light-skyblue"
    | "gray"
    | "gray-light"
    | "gray-extra-light"
    | "red"
    | "dark-gray"
    | "green"
    | "yellow-light"
    | "primary";
}

export const Overlay = ({ show, onClick, color = "blue" }: OverlayProps) => {
  const getColorClass = () => {
    return `onpe-overlay-${color}`;
  };

  const getVisibilityClass = () => {
    return show ? "onpe-overlay-show" : "onpe-overlay-hide";
  };

  return <div onClick={onClick} className={`onpe-overlay ${getVisibilityClass()} ${getColorClass()}`} />;
};

export default Overlay;
