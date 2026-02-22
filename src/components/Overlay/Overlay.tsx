type OverlayColor =
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

export interface OverlayProps {
  show?: boolean;
  onClick?: () => void;
  color?: OverlayColor;
}

const colorClasses: Record<OverlayColor, string> = {
  blue: "bg-onpe-blue/80",
  skyblue: "bg-onpe-skyblue/80",
  "skyblue-light": "bg-onpe-skyblue-light/80",
  yellow: "bg-onpe-yellow/80",
  "light-skyblue": "bg-onpe-light-skyblue/80",
  gray: "bg-onpe-gray/80",
  "gray-light": "bg-onpe-gray-light/80",
  "gray-extra-light": "bg-onpe-gray-extra-light/80",
  red: "bg-onpe-red/80",
  "dark-gray": "bg-onpe-dark-gray/80",
  green: "bg-onpe-green/80",
  "yellow-light": "bg-onpe-yellow-light/80",
  primary: "bg-onpe-blue/80",
};

export const Overlay = ({ show, onClick, color = "blue" }: OverlayProps) => {
  return (
    <div
      onClick={onClick}
      className={[
        "absolute inset-0 w-full h-screen z-10 transition-all duration-500",
        show ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        colorClasses[color],
      ].join(" ")}
    />
  );
};

export default Overlay;
