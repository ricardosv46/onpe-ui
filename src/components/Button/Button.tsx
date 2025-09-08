import React from "react";
import { clsx } from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante del botón
   */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /**
   * Tamaño del botón
   */
  size?: "sm" | "md" | "lg";
  /**
   * Si el botón está en estado de carga
   */
  loading?: boolean;
  /**
   * Contenido del botón
   */
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", loading = false, children, className, disabled, ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-blue text-white hover:bg-skyblue focus:ring-skyblue-light",
    secondary: "bg-gray text-white hover:bg-dark-gray focus:ring-gray-light",
    outline: "border border-blue text-blue hover:bg-light-skyblue focus:ring-skyblue-light",
    ghost: "text-blue hover:bg-light-skyblue focus:ring-skyblue-light",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], className)} disabled={disabled || loading} {...props}>
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export { Button };
export default Button;
