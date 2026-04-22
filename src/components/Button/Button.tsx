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
  small: "min-h-10 text-sm",
  normal: "min-h-12 text-base",
  large: "min-h-14 text-lg",
};

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
        "inline-flex items-center",
        icon ? "" : "justify-center",
        fitContent ? "w-fit min-w-0" : "w-[200px]",
        "px-3",
        "text-white font-semibold cursor-pointer",
        "transition-all duration-300 ease-in-out",
        "disabled:cursor-default disabled:bg-onpe-gray!",
        hoverEffect ? "hover:opacity-50 disabled:hover:opacity-100" : "",
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
            "w-12 h-12 flex justify-center items-center shrink-0",
            props.disabled
              ? "bg-onpe-gray"
              : colorClasses[colorBgIcon ?? color],
          ].join(" ")}
        >
          {icon}
        </div>
      )}

      {srOnlyText ? (
        <>
          <span className="sr-only">{srOnlyText}</span>
          <span className="flex-1 text-center" aria-hidden="true">
            {title}
          </span>
        </>
      ) : (
        <span className="flex-1 text-center">{title}</span>
      )}
    </button>
  );
}

export default Button;
