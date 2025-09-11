import { useMemo } from "react";
import { clsx } from "clsx";

/**
 * Hook para generar clases de Tailwind con prefijo 'onpe-' de manera consistente
 * Esto evita conflictos con otros frameworks CSS como Material UI o Shadcn
 */
export const useOnpeClasses = () => {
  const onpe = useMemo(() => {
    return {
      // Layout
      container: "onpe-ui-container",
      flex: "onpe-flex",
      "flex-col": "onpe-flex-col",
      "flex-row": "onpe-flex-row",
      "justify-center": "onpe-justify-center",
      "justify-start": "onpe-justify-start",
      "justify-end": "onpe-justify-end",
      "justify-between": "onpe-justify-between",
      "items-center": "onpe-items-center",
      "items-start": "onpe-items-start",
      "items-end": "onpe-items-end",
      "items-stretch": "onpe-items-stretch",

      // Spacing
      "p-0": "onpe-p-0",
      "p-1": "onpe-p-1",
      "p-2": "onpe-p-2",
      "p-3": "onpe-p-3",
      "p-4": "onpe-p-4",
      "p-5": "onpe-p-5",
      "p-6": "onpe-p-6",
      "px-2": "onpe-px-2",
      "px-3": "onpe-px-3",
      "px-4": "onpe-px-4",
      "px-5": "onpe-px-5",
      "px-6": "onpe-px-6",
      "py-2": "onpe-py-2",
      "py-3": "onpe-py-3",
      "py-4": "onpe-py-4",
      "py-5": "onpe-py-5",
      "py-6": "onpe-py-6",
      "m-0": "onpe-m-0",
      "m-1": "onpe-m-1",
      "m-2": "onpe-m-2",
      "m-3": "onpe-m-3",
      "m-4": "onpe-m-4",
      "m-5": "onpe-m-5",
      "m-6": "onpe-m-6",
      "mx-auto": "onpe-mx-auto",
      "my-auto": "onpe-my-auto",

      // Sizing
      "w-full": "onpe-w-full",
      "w-auto": "onpe-w-auto",
      "w-fit": "onpe-w-fit",
      "h-full": "onpe-h-full",
      "h-auto": "onpe-h-auto",
      "h-fit": "onpe-h-fit",
      "h-10": "onpe-h-10",
      "h-12": "onpe-h-12",
      "h-14": "onpe-h-14",
      "min-w-[200px]": "onpe-min-w-[200px]",
      "max-w-full": "onpe-max-w-full",
      "max-w-sm": "onpe-max-w-sm",
      "max-w-md": "onpe-max-w-md",
      "max-w-lg": "onpe-max-w-lg",
      "max-w-xl": "onpe-max-w-xl",
      "max-w-2xl": "onpe-max-w-2xl",

      // Typography
      "text-xs": "onpe-text-xs",
      "text-sm": "onpe-text-sm",
      "text-base": "onpe-text-base",
      "text-lg": "onpe-text-lg",
      "text-xl": "onpe-text-xl",
      "text-2xl": "onpe-text-2xl",
      "text-3xl": "onpe-text-3xl",
      "font-normal": "onpe-font-normal",
      "font-medium": "onpe-font-medium",
      "font-semibold": "onpe-font-semibold",
      "font-bold": "onpe-font-bold",
      "text-center": "onpe-text-center",
      "text-left": "onpe-text-left",
      "text-right": "onpe-text-right",
      "text-white": "onpe-text-white",
      "text-black": "onpe-text-black",

      // Colors - Background
      "bg-onpe-ui-blue": "onpe-bg-onpe-ui-blue",
      "bg-onpe-ui-skyblue": "onpe-bg-onpe-ui-skyblue",
      "bg-onpe-ui-skyblue-light": "onpe-bg-onpe-ui-skyblue-light",
      "bg-onpe-ui-yellow": "onpe-bg-onpe-ui-yellow",
      "bg-onpe-ui-light-skyblue": "onpe-bg-onpe-ui-light-skyblue",
      "bg-onpe-ui-gray": "onpe-bg-onpe-ui-gray",
      "bg-onpe-ui-gray-light": "onpe-bg-onpe-ui-gray-light",
      "bg-onpe-ui-gray-extra-light": "onpe-bg-onpe-ui-gray-extra-light",
      "bg-onpe-ui-red": "onpe-bg-onpe-ui-red",
      "bg-onpe-ui-dark-gray": "onpe-bg-onpe-ui-dark-gray",
      "bg-onpe-ui-green": "onpe-bg-onpe-ui-green",
      "bg-onpe-ui-yellow-light": "onpe-bg-onpe-ui-yellow-light",

      // Colors - Text
      "text-onpe-ui-blue": "onpe-text-onpe-ui-blue",
      "text-onpe-ui-skyblue": "onpe-text-onpe-ui-skyblue",
      "text-onpe-ui-skyblue-light": "onpe-text-onpe-ui-skyblue-light",
      "text-onpe-ui-yellow": "onpe-text-onpe-ui-yellow",
      "text-onpe-ui-light-skyblue": "onpe-text-onpe-ui-light-skyblue",
      "text-onpe-ui-gray": "onpe-text-onpe-ui-gray",
      "text-onpe-ui-gray-light": "onpe-text-onpe-ui-gray-light",
      "text-onpe-ui-gray-extra-light": "onpe-text-onpe-ui-gray-extra-light",
      "text-onpe-ui-red": "onpe-text-onpe-ui-red",
      "text-onpe-ui-dark-gray": "onpe-text-onpe-ui-dark-gray",
      "text-onpe-ui-green": "onpe-text-onpe-ui-green",
      "text-onpe-ui-yellow-light": "onpe-text-onpe-ui-yellow-light",

      // Hover states
      "hover:bg-onpe-ui-blue/30": "onpe-hover:bg-onpe-ui-blue/30",
      "hover:bg-onpe-ui-skyblue/30": "onpe-hover:bg-onpe-ui-skyblue/30",
      "hover:bg-onpe-ui-skyblue-light/30": "onpe-hover:bg-onpe-ui-skyblue-light/30",
      "hover:bg-onpe-ui-yellow/30": "onpe-hover:bg-onpe-ui-yellow/30",
      "hover:bg-onpe-ui-light-skyblue/30": "onpe-hover:bg-onpe-ui-light-skyblue/30",
      "hover:bg-onpe-ui-gray/30": "onpe-hover:bg-onpe-ui-gray/30",
      "hover:bg-onpe-ui-gray-light/30": "onpe-hover:bg-onpe-ui-gray-light/30",
      "hover:bg-onpe-ui-gray-extra-light/30": "onpe-hover:bg-onpe-ui-gray-extra-light/30",
      "hover:bg-onpe-ui-red/30": "onpe-hover:bg-onpe-ui-red/30",
      "hover:bg-onpe-ui-dark-gray/30": "onpe-hover:bg-onpe-ui-dark-gray/30",
      "hover:bg-onpe-ui-green/30": "onpe-hover:bg-onpe-ui-green/30",
      "hover:bg-onpe-ui-yellow-light/30": "onpe-hover:bg-onpe-ui-yellow-light/30",

      // Disabled states
      "disabled:bg-onpe-ui-gray": "onpe-disabled:bg-onpe-ui-gray",
      "disabled:hover:bg-onpe-ui-gray": "onpe-disabled:hover:bg-onpe-ui-gray",
      "disabled:cursor-not-allowed": "onpe-disabled:cursor-not-allowed",

      // Cursor
      "cursor-pointer": "onpe-cursor-pointer",
      "cursor-not-allowed": "onpe-cursor-not-allowed",

      // Transitions
      "transition-all": "onpe-transition-all",
      "duration-300": "onpe-duration-300",
      "ease-in-out": "onpe-ease-in-out",

      // Animations
      "fast-blink": "onpe-fast-blink",

      // Border
      border: "onpe-border",
      "border-0": "onpe-border-0",
      "border-2": "onpe-border-2",
      "border-solid": "onpe-border-solid",
      "border-dashed": "onpe-border-dashed",
      "border-dotted": "onpe-border-dotted",
      rounded: "onpe-rounded",
      "rounded-sm": "onpe-rounded-sm",
      "rounded-md": "onpe-rounded-md",
      "rounded-lg": "onpe-rounded-lg",
      "rounded-xl": "onpe-rounded-xl",
      "rounded-full": "onpe-rounded-full",

      // Shadow
      shadow: "onpe-shadow",
      "shadow-sm": "onpe-shadow-sm",
      "shadow-md": "onpe-shadow-md",
      "shadow-lg": "onpe-shadow-lg",
      "shadow-xl": "onpe-shadow-xl",
      "shadow-2xl": "onpe-shadow-2xl",

      // Position
      relative: "onpe-relative",
      absolute: "onpe-absolute",
      fixed: "onpe-fixed",
      sticky: "onpe-sticky",
      static: "onpe-static",

      // Display
      block: "onpe-block",
      "inline-block": "onpe-inline-block",
      inline: "onpe-inline",
      hidden: "onpe-hidden",

      // Overflow
      "overflow-hidden": "onpe-overflow-hidden",
      "overflow-auto": "onpe-overflow-auto",
      "overflow-scroll": "onpe-overflow-scroll",
      "overflow-visible": "onpe-overflow-visible",
    };
  }, []);

  const cn = (...classes: (string | undefined | null | false)[]) => {
    return clsx(classes);
  };

  return { onpe, cn };
};
