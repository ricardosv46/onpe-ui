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
        return "bg-blue/80";
      case "skyblue":
        return "bg-skyblue/80";
      case "skyblue-light":
        return "bg-skyblue-light/80";
      case "yellow":
        return "bg-yellow/80";
      case "light-skyblue":
        return "bg-light-skyblue/80";
      case "gray":
        return "bg-gray/80";
      case "gray-light":
        return "bg-gray-light/80";
      case "gray-extra-light":
        return "bg-gray-extra-light/80";
      case "red":
        return "bg-red/80";
      case "dark-gray":
        return "bg-dark-gray/80";
      case "green":
        return "bg-green/80";
      case "yellow-light":
        return "bg-yellow-light/80";
      case "primary":
        return "bg-blue/80";
      default:
        return "bg-blue/80";
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
