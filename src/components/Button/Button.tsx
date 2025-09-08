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
    if (color === "blue") return "bg-blue md:hover:bg-blue/30";
    if (color === "skyblue") return "bg-skyblue md:hover:bg-skyblue/30";
    if (color === "skyblue-light") return "bg-skyblue-light md:hover:bg-skyblue-light/30";
    if (color === "yellow") return "bg-yellow md:hover:bg-yellow/30";
    if (color === "light-skyblue") return "bg-light-skyblue md:hover:bg-light-skyblue/30";
    if (color === "gray") return "bg-gray md:hover:bg-gray/30";
    if (color === "gray-light") return "bg-gray-light md:hover:bg-gray-light/30";
    if (color === "gray-extra-light") return "bg-gray-extra-light md:hover:bg-gray-extra-light/30";
    if (color === "red") return "bg-red md:hover:bg-red/30";
    if (color === "dark-gray") return "bg-dark-gray md:hover:bg-dark-gray/30";
    if (color === "green") return "bg-green md:hover:bg-green/30";
    if (color === "yellow-light") return "bg-yellow-light md:hover:bg-yellow-light/30";
    if (color === "primary") return "bg-blue md:hover:bg-blue/30";
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
      className={`text-white cursor-pointer disabled:cursor-not-allowed flex justify-center items-center font-semibold disabled:bg-gray disabled:hover:bg-gray ${getColor()} ${getSize()} transition-all duration-300 ease-in-out min-w-[200px] ${className}`}
      {...props}
    >
      {title}
    </button>
  );
};

export default Button;
