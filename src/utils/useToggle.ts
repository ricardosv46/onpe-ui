import { useState } from "react";

type ToggleReturnType = [boolean, () => void, () => void, () => void];

/** Hook interno del DS para abrir/cerrar (Select, menús, etc.). */
export const useToggle = (initialState = false): ToggleReturnType => {
  const [value, setValue] = useState(initialState);

  const open = () => setValue(true);
  const close = () => setValue(false);
  const toggle = () => setValue((current) => !current);

  return [value, open, close, toggle];
};
