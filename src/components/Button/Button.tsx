import React, { type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color:
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
  title: string;
  size?: "small" | "normal" | "large";
}

export const Button = ({ color, title, size, className, ...props }: ButtonProps) => {
  const getColor = () => {
    if (color === "blue") return "bg-onpe-ui-blue md:hover:bg-onpe-ui-blue/30";
    if (color === "skyblue") return "bg-onpe-ui-skyblue md:hover:bg-onpe-ui-skyblue/30";
    if (color === "skyblue-light") return "bg-onpe-ui-skyblue-light md:hover:bg-onpe-ui-skyblue-light/30";
    if (color === "yellow") return "bg-onpe-ui-yellow md:hover:bg-onpe-ui-yellow/30";
    if (color === "light-skyblue") return "bg-onpe-ui-light-skyblue md:hover:bg-onpe-ui-light-skyblue/30";
    if (color === "gray") return "bg-onpe-ui-gray md:hover:bg-onpe-ui-gray/30";
    if (color === "gray-light") return "bg-onpe-ui-gray-light md:hover:bg-onpe-ui-gray-light/30";
    if (color === "gray-extra-light") return "bg-onpe-ui-gray-extra-light md:hover:bg-onpe-ui-gray-extra-light/30";
    if (color === "red") return "bg-onpe-ui-red md:hover:bg-onpe-ui-red/30";
    if (color === "dark-gray") return "bg-onpe-ui-dark-gray md:hover:bg-onpe-ui-dark-gray/30";
    if (color === "green") return "bg-onpe-ui-green md:hover:bg-onpe-ui-green/30";
    if (color === "yellow-light") return "bg-onpe-ui-yellow-light md:hover:bg-onpe-ui-yellow-light/30";
    if (color === "primary") return "bg-onpe-ui-blue md:hover:bg-onpe-ui-blue/30";
    return "";
  };

  const getSize = () => {
    if (size === "small") return "h-10 text-sm";
    if (size === "normal") return "h-12 text-base";
    if (size === "large") return "h-14 text-lg";
    return "h-12 text-base"; // Por defecto es normal
  };

  return (
    <button
      className={`text-white cursor-pointer disabled:cursor-not-allowed flex justify-center items-center font-semibold disabled:bg-onpe-ui-gray disabled:hover:bg-onpe-ui-gray ${getColor()} ${getSize()} transition-all duration-300 ease-in-out min-w-[200px] ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
