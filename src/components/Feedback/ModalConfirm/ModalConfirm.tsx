import React from "react";
import { Modal } from "../../Modal/Modal";
import { Button } from "../../Button/Button";
import { IconWarning } from "../../../icons/Actions/IconWarning/IconWarning";
import { IconCheck } from "../../../icons/Actions/IconCheck/IconCheck";

export interface ModalConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: "warning" | "success";
  onConfirm?: () => void;
  onCancel?: () => void;
  textButtonConfirm?: string;
  textButtonCancel?: string;
  twoButtons?: boolean;
  className?: string;
}

export const ModalConfirm = ({
  isOpen = false,
  onClose = () => {},
  title,
  message,
  icon = "warning",
  onConfirm = () => {},
  onCancel = () => {},
  textButtonConfirm = "Confirmar",
  textButtonCancel = "Cancelar",
  twoButtons = true,
  className = "",
}: ModalConfirmProps) => {
  const handleConfirm = async () => {
    try {
      onConfirm();
      onClose();
    } catch (error) {
      console.error("Error en handleConfirm:", error);
      onClose();
    }
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`max-w-[680px] pt-5 pb-8 ${className}`} closeButton={true} closeDisabled topAbsolute={true}>
      <div className="flex items-center justify-center">
        {icon === "warning" && <IconWarning className="w-16 h-16 text-skyblue" />}
        {icon === "success" && <IconCheck className="w-16 h-16 text-skyblue" />}
      </div>

      <p className="mt-3 text-lg font-medium text-center lg:mt-4 lg:text-2xl text-skyblue">{title}</p>

      <p className="mt-7 text-sm lg:text-lg text-center max-w-full lg:max-w-[576px]">{message}</p>

      <div className="flex flex-col-reverse items-center justify-center w-full gap-5 mt-11 lg:mt-20 lg:flex-row">
        {twoButtons && <Button className="w-full max-w-[200px] lg:w-[200px]" color="blue" title={textButtonCancel} onClick={handleCancel} />}
        <Button className="w-full max-w-[200px] lg:w-[200px]" color="red" title={textButtonConfirm} onClick={handleConfirm} />
      </div>
    </Modal>
  );
};

export default ModalConfirm;
