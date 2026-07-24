import { type ReactNode } from "react";

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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  title: string;
  size?: ButtonSize;
  /** Icono opcional que se muestra a la izquierda del texto */
  icon?: ReactNode;
  /** Color de fondo del contenedor del icono. Si no se especifica, usa el mismo color del botón */
  colorBgIcon?: ButtonColor;
  /** Deshabilita el click al presionar Enter o Espacio */
  disableEnterClick?: boolean;
  /** Activa el efecto hover (default: true) */
  hoverEffect?: boolean;
  /** Ajusta el ancho al contenido (usa padding horizontal interno) */
  fitContent?: boolean;
  srOnlyText?: string;
}

const colorClasses: Record<ButtonColor, string> = {
  blue: "oui:bg-onpe-blue",
  skyblue: "oui:bg-onpe-skyblue",
  "skyblue-light": "oui:bg-onpe-skyblue-light",
  yellow: "oui:bg-onpe-yellow",
  "light-skyblue": "oui:bg-onpe-light-skyblue",
  gray: "oui:bg-onpe-gray",
  "gray-light": "oui:bg-onpe-gray-light",
  "gray-extra-light": "oui:bg-onpe-gray-extra-light",
  red: "oui:bg-onpe-red",
  "dark-gray": "oui:bg-onpe-dark-gray",
  green: "oui:bg-onpe-green",
  "yellow-light": "oui:bg-onpe-yellow-light",
  primary: "oui:bg-onpe-blue",
};

const sizeClasses: Record<ButtonSize, string> = {
  small: "oui:min-h-10 oui:text-sm",
  normal: "oui:min-h-12 oui:text-base",
  large: "oui:min-h-14 oui:text-lg",
};

const hasWidthClass = (className: string) =>
  /\b(oui:)?!?w-|(?:^|\s)(oui:)?min-w-|(?:^|\s)(oui:)?max-w-/.test(className);

export function Button({
  color,
  title,
  size = "normal",
  className = "",
  icon,
  colorBgIcon,
  disableEnterClick,
  hoverEffect = false,
  fitContent = false,
  srOnlyText,
  ...props
}: ButtonProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <button
      className={[
        "oui:inline-flex oui:items-center",
        icon ? "" : "oui:justify-center",
        !hasWidthClass(className) &&
          (fitContent ? "oui:w-fit oui:min-w-0" : "oui:w-[200px]"),
        "oui:px-3",
        "oui:text-white oui:font-semibold oui:cursor-pointer",
        "oui:transition-all oui:duration-300 oui:ease-in-out",
        "oui:disabled:cursor-default oui:disabled:bg-onpe-gray!",
        hoverEffect ? "oui:hover:opacity-50 oui:disabled:hover:opacity-100" : "",
        colorClasses[color],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onKeyDown={disableEnterClick ? handleKeyDown : undefined}
      {...props}
    >
      {icon && (
        <div
          className={[
            "oui:w-12 oui:h-12 oui:flex oui:justify-center oui:items-center oui:shrink-0",
            props.disabled
              ? "oui:bg-onpe-gray"
              : colorClasses[colorBgIcon ?? color],
          ].join(" ")}
        >
          {icon}
        </div>
      )}

      {srOnlyText ? (
        <>
          <span className="oui:sr-only">{srOnlyText}</span>
          <span className="oui:flex-1 oui:text-center" aria-hidden="true">
            {title}
          </span>
        </>
      ) : (
        <span className="oui:flex-1 oui:text-center">{title}</span>
      )}
    </button>
  );
}

export default Button;
