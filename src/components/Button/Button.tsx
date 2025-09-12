import React, { type ButtonHTMLAttributes } from "react";
import "./Button.css";

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

export const Button = ({ color, title, size = "normal", className, ...props }: ButtonProps) => {
  return (
    <button className={`onpe-button onpe-button-${color} onpe-button-${size} ${className || ""}`} {...props}>
      {title}
    </button>
  );
};

export default Button;
