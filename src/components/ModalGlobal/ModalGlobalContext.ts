import { createContext, useContext } from "react";

interface ModalGlobalContextValue {
  animated: boolean;
}

export const ModalGlobalContext = createContext<ModalGlobalContextValue | null>(null);

export const useModalGlobalContext = () => useContext(ModalGlobalContext);
