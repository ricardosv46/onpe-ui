type ButtonColor =
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

type ButtonSize = "small" | "normal" | "large";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  title: string;
  size?: ButtonSize;
}

const colorClasses: Record<ButtonColor, string> = {
  blue: "bg-onpe-blue",
  skyblue: "bg-onpe-skyblue",
  "skyblue-light": "bg-onpe-skyblue-light",
  yellow: "bg-onpe-yellow",
  "light-skyblue": "bg-onpe-light-skyblue",
  gray: "bg-onpe-gray",
  "gray-light": "bg-onpe-gray-light",
  "gray-extra-light": "bg-onpe-gray-extra-light",
  red: "bg-onpe-red",
  "dark-gray": "bg-onpe-dark-gray",
  green: "bg-onpe-green",
  "yellow-light": "bg-onpe-yellow-light",
  primary: "bg-onpe-blue",
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "h-10 text-sm",
  normal: "h-12 text-base",
  large: "h-14 text-lg",
};

export function Button({
  color,
  title,
  size = "normal",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center",
        "min-w-[200px] border-none",
        "text-white font-semibold cursor-pointer",
        "transition-all duration-300 ease-in-out",
        "disabled:cursor-default disabled:!bg-onpe-gray",
        colorClasses[color],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {title}
    </button>
  );
}

export default Button;
