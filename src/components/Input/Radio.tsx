import type { InputHTMLAttributes } from "react";
import { useId } from "react";

import { classNames } from "../../utils/classNames";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classInput?: string;
  checked?: boolean;
}

export function Radio({ label, checked, classInput, ...props }: RadioProps) {
  const uid = useId();
  const { className, ...resprops } = props;

  return (
    <div className={classNames(["oui:inline-flex", className])}>
      <input
        type="radio"
        {...resprops}
        id={`input-${uid}`}
        checked={checked}
        autoComplete="off"
        className={classNames([classInput, "oui:m-1"])}
      />
      <label htmlFor={`input-${uid}`}>{label}</label>
    </div>
  );
}

export default Radio;
