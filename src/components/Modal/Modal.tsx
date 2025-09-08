import React, { HTMLAttributes, ReactNode } from "react";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import { IconClose } from "../../icons/Actions/IconClose";

const classNames = (cln: Array<string | undefined>) => {
  return cln.join(" ").trim();
};

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  whitoutBackground?: boolean;
  topAbsolute?: boolean;
  closeButton?: boolean;
  closeDisabled?: boolean;
  overlayColor?:
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
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  whitoutBackground = false,
  topAbsolute = false,
  closeButton = false,
  closeDisabled = false,
  overlayColor = "blue",
  ...props
}: ModalProps) => {
  return (
    <Portal>
      <div
        className={classNames([
          isOpen ? (topAbsolute ? "opacity-100 z-100" : "opacity-100 z-50") : "opacity-0 -z-10",
          "fixed top-0 w-full h-screen grid place-items-center ",
        ])}
      >
        <Overlay show={isOpen} onClick={closeDisabled ? undefined : onClose} color={overlayColor} />
        <div className="z-20 grid place-items-center relative">
          <div
            className={classNames([
              "relative",
              whitoutBackground
                ? "flex flex-col items-center justify-center"
                : "bg-white flex flex-col items-center justify-center  md:px-auto px-1 lg:px-5 min-w-[320px] w-[98vw] md:w-[500px] lg:w-[1024px] max-w-[95vw] max-h-[90vh] overflow-y-auto",
              props.className ? props.className : "py-10 lg:py-16",
            ])}
          >
            {children}
          </div>
          {closeButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full bg-onpe-ui-red p-[7px] flex items-center justify-center z-30"
              aria-label="Cerrar"
            >
              <IconClose className="h-[10px]  w-[10px] text-white" />
            </button>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
