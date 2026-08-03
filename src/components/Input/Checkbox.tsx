import type { InputHTMLAttributes } from "react";
import { useId } from "react";

import { classNames } from "../../utils/classNames";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classInput?: string;
  checked?: boolean;
}

export function Checkbox({ label, checked, classInput, ...props }: CheckboxProps) {
  const uid = useId();
  const { className, disabled, ...resprops } = props;

  return (
    <label
      htmlFor={`input-${uid}`}
      className={classNames([
        "oui:inline-flex oui:items-center oui:gap-2",
        disabled ? "oui:cursor-not-allowed oui:opacity-50" : "oui:cursor-pointer",
        className,
      ])}
    >
      <span className="oui:relative oui:grid oui:place-items-center oui:w-5 oui:h-5 oui:shrink-0">
        <input
          type="checkbox"
          {...resprops}
          id={`input-${uid}`}
          checked={checked}
          disabled={disabled}
          autoComplete="off"
          className={classNames([classInput, "oui:peer oui:sr-only"])}
        />
        <span
          className={classNames([
            "oui:col-start-1 oui:row-start-1 oui:w-5 oui:h-5 oui:rounded oui:border oui:border-onpe-gray oui:pointer-events-none oui:transition-colors",
            "oui:peer-checked:bg-onpe-skyblue oui:peer-checked:border-onpe-skyblue",
            "oui:peer-focus-visible:ring-2 oui:peer-focus-visible:ring-onpe-skyblue oui:peer-focus-visible:ring-offset-1",
          ])}
        />
        <svg
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="oui:col-start-1 oui:row-start-1 oui:w-3 oui:h-3 oui:text-onpe-white oui:opacity-0 oui:peer-checked:opacity-100 oui:pointer-events-none oui:transition-opacity"
        >
          <path
            d="M13.5 4L6 11.5L2.5 8"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && <span className="oui:leading-none">{label}</span>}
    </label>
  );
}

export default Checkbox;
