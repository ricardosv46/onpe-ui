import { useState, useCallback } from "react";

export const useToggle = (initialValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);

  const openTooltip = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeTooltip = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return [isOpen, openTooltip, closeTooltip, toggle] as const;
};
