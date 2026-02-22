import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children?: ReactNode;
  container?: Element | DocumentFragment | null;
}

export const Portal = ({ children, container }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  let portalElement = container || document.querySelector("#portal");
  if (!portalElement) {
    portalElement = document.body;
  }

  return createPortal(children, portalElement);
};

export default Portal;
