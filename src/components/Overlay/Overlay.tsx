import React from "react";

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
    switch (color) {
      case "blue":
        return "bg-onpe-ui-blue/80";
      case "skyblue":
        return "bg-onpe-ui-skyblue/80";
      case "skyblue-light":
        return "bg-onpe-ui-skyblue-light/80";
      case "yellow":
        return "bg-onpe-ui-yellow/80";
      case "light-skyblue":
        return "bg-onpe-ui-light-skyblue/80";
      case "gray":
        return "bg-onpe-ui-gray/80";
      case "gray-light":
        return "bg-onpe-ui-gray-light/80";
      case "gray-extra-light":
        return "bg-onpe-ui-gray-extra-light/80";
      case "red":
        return "bg-onpe-ui-red/80";
      case "dark-gray":
        return "bg-onpe-ui-dark-gray/80";
      case "green":
        return "bg-onpe-ui-green/80";
      case "yellow-light":
        return "bg-onpe-ui-yellow-light/80";
      case "primary":
        return "bg-onpe-ui-blue/80";
      default:
        return "bg-onpe-ui-blue/80";
    }
  };

  return (
    <div
      onClick={onClick}
      className={`${
        show ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      } absolute inset-0 w-full h-screen z-10 ${getColorClass()} transition-all duration-500 ease-in-out`}
    />
  );
};

export default Overlay;
