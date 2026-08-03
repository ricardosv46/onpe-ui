type LinkButtonColor = "red" | "skyblue" | "blue" | "gray" | "dark-gray";
type LinkButtonSize = "small" | "normal";

export interface LinkButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  title: string;
  color?: LinkButtonColor;
  size?: LinkButtonSize;
}

const colorClasses: Record<LinkButtonColor, string> = {
  red: "oui:text-onpe-red",
  skyblue: "oui:text-onpe-skyblue",
  blue: "oui:text-onpe-blue",
  gray: "oui:text-onpe-gray",
  "dark-gray": "oui:text-onpe-dark-gray",
};

const sizeClasses: Record<LinkButtonSize, string> = {
  small: "oui:text-sm",
  normal: "oui:text-base",
};

export function LinkButton({
  title,
  color = "red",
  size = "normal",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <button
      type="button"
      className={[
        "oui:underline oui:cursor-pointer oui:bg-transparent oui:border-none oui:p-0",
        "oui:font-normal oui:transition-opacity oui:duration-300 oui:ease-in-out",
        "oui:hover:opacity-70 oui:disabled:opacity-40 oui:disabled:cursor-default oui:disabled:hover:opacity-40",
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

export default LinkButton;
