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
  blue: "oui:bg-onpe-blue/80",
  skyblue: "oui:bg-onpe-skyblue/80",
  "skyblue-light": "oui:bg-onpe-skyblue-light/80",
  yellow: "oui:bg-onpe-yellow/80",
  "light-skyblue": "oui:bg-onpe-light-skyblue/80",
  gray: "oui:bg-onpe-gray/80",
  "gray-light": "oui:bg-onpe-gray-light/80",
  "gray-extra-light": "oui:bg-onpe-gray-extra-light/80",
  red: "oui:bg-onpe-red/80",
  "dark-gray": "oui:bg-onpe-dark-gray/80",
  green: "oui:bg-onpe-green/80",
  "yellow-light": "oui:bg-onpe-yellow-light/80",
  primary: "oui:bg-onpe-blue/80",
};

export const Overlay = ({ show, onClick, color = "blue" }: OverlayProps) => {
  return (
    <div
      onClick={onClick}
      className={[
        "oui:absolute oui:inset-0 oui:w-full oui:h-screen oui:z-10 oui:transition-all oui:duration-500",
        show ? "oui:pointer-events-auto oui:opacity-100" : "oui:pointer-events-none oui:opacity-0",
        colorClasses[color],
      ].join(" ")}
    />
  );
};

export default Overlay;
