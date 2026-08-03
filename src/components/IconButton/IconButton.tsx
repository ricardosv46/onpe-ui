import { type ReactNode } from "react";

type IconButtonColor =
  | "blue"
  | "skyblue"
  | "yellow"
  | "gray"
  | "dark-gray"
  | "red"
  | "green"
  | "primary";

type IconButtonSize = "small" | "normal" | "large";

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  icon: ReactNode;
  /** Nombre accesible del botón (aria-label): obligatorio porque no hay texto visible */
  label: string;
  color?: IconButtonColor;
  size?: IconButtonSize;
}

const colorClasses: Record<IconButtonColor, string> = {
  blue: "oui:text-onpe-blue",
  skyblue: "oui:text-onpe-skyblue",
  yellow: "oui:text-onpe-yellow",
  gray: "oui:text-onpe-gray",
  "dark-gray": "oui:text-onpe-dark-gray",
  red: "oui:text-onpe-red",
  green: "oui:text-onpe-green",
  primary: "oui:text-onpe-blue",
};

const sizeClasses: Record<IconButtonSize, string> = {
  small: "oui:w-5 oui:h-5",
  normal: "oui:w-6 oui:h-6",
  large: "oui:w-8 oui:h-8",
};

export function IconButton({
  icon,
  label,
  color = "skyblue",
  size = "normal",
  className = "",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={[
        "oui:inline-flex oui:items-center oui:justify-center",
        "oui:cursor-pointer oui:bg-transparent oui:border-none oui:p-1",
        "oui:transition-opacity oui:duration-300 oui:ease-in-out",
        "oui:hover:opacity-60 oui:disabled:opacity-40 oui:disabled:cursor-default oui:disabled:hover:opacity-40",
        colorClasses[color],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon}
    </button>
  );
}

export default IconButton;
