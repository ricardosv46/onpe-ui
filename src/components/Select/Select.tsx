import type { HTMLAttributes } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { IconArrowDown } from "../../icons/Actions/IconArrowDown";
import { IconSpinnerMobile } from "../../icons/Loading/IconSpinnerMobile";
import { classNames } from "../../utils/classNames";
import { useToggle } from "../../utils/useToggle";

export interface SelectOption {
  label: string;
  value: string;
}

/** Alias legacy compatible con apps VENP / VOTO ADM */
export type Option = SelectOption;

export interface SelectProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  options: readonly SelectOption[];
  onChange: (value: string) => void;
  value?: string;
  name: string;
  placeHolder: string;
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  /** Callback que retorna un Set de values deshabilitados */
  optionsDisabled?: () => Set<string> | ReadonlySet<string> | null | undefined;
  error?: string;
  classNameParentElement?: string;
  showIcon?: boolean;
}

export function Select({
  options,
  value,
  onChange,
  name,
  className,
  classNameParentElement,
  placeHolder,
  disabled,
  loading,
  optionsDisabled,
  label,
  error,
  showIcon = true,
}: SelectProps) {
  const [isOpenOption, , closeOption, toggleOption] = useToggle();

  const selected = useMemo(() => {
    if (value && options?.length > 0) {
      return options.find((option) => option.value === value);
    }
    return undefined;
  }, [value, options]);

  const handleChange = (option: SelectOption) => {
    if (onChange && option?.value !== value) {
      onChange(option.value);
    }
    closeOption();
  };

  const optionRef = useRef<HTMLDivElement>(null);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (optionRef.current && !optionRef.current.contains(event.target as Node)) {
        closeOption();
      }
    };

    if (isOpenOption) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenOption, disabled, closeOption]);

  return (
    <div ref={optionRef} className={classNameParentElement ?? "oui:w-full"}>
      {label && (
        <label
          className="oui:block oui:mb-1 oui:text-sm oui:font-medium oui:text-onpe-dark-gray"
          htmlFor={`select-${name}`}
        >
          {label}
        </label>
      )}

      <div className="oui:relative">
        <input type="hidden" name={name} value={value ?? ""} />

        {loading && (
          <i
            data-testid="loading-spin"
            className="oui:absolute oui:z-10 oui:flex oui:items-center oui:justify-center oui:w-full oui:h-full oui:pl-2 oui:m-0 oui:opacity-100"
          >
            <IconSpinnerMobile className="oui:w-5 oui:h-5 oui:animate-spin oui:text-onpe-skyblue" />
          </i>
        )}

        <button
          type="button"
          id={`select-${name}`}
          data-testid="select-component-id"
          disabled={disabled || loading}
          aria-haspopup="listbox"
          aria-expanded={isOpenOption}
          aria-labelledby={`select-${name}`}
          className={classNames([
            "oui:w-full oui:flex oui:cursor-pointer oui:border-onpe-gray oui:outline-none oui:border oui:flex-1 oui:h-12 oui:items-center oui:pl-5 oui:bg-transparent oui:text-left",
            disabled || loading
              ? "oui:bg-onpe-gray-extra-light oui:border-onpe-gray oui:text-onpe-dark-gray oui:pointer-events-none"
              : "",
            error && blur ? "oui:border-onpe-red" : "",
            className ?? "",
          ])}
          onFocus={() => setBlur(true)}
          onBlur={() => setBlur(false)}
          onClick={() => {
            if (!disabled && !loading) {
              toggleOption();
            }
          }}
          onKeyDown={(event_) => {
            if (event_.key === "Enter" || event_.key === " ") {
              event_.preventDefault();
              if (!disabled && !loading) {
                toggleOption();
              }
            }
          }}
        >
          <p className="oui:flex-1 oui:truncate" title={selected?.label}>
            {selected?.label ? (
              selected.label
            ) : (
              <span className="oui:text-onpe-gray oui:select-none">{placeHolder}</span>
            )}
          </p>
          {showIcon && (
            <div
              className={classNames([
                "oui:flex oui:items-center oui:justify-center oui:w-12 oui:h-12 oui:shrink-0",
                disabled || loading ? "oui:bg-onpe-gray-light" : "oui:bg-onpe-blue",
              ])}
            >
              <IconArrowDown
                className={
                  disabled || loading
                    ? "oui:text-onpe-dark-gray oui:w-10 oui:h-10"
                    : "oui:text-onpe-white oui:w-10 oui:h-10"
                }
              />
            </div>
          )}
        </button>

        {isOpenOption && !loading && options?.length > 0 && (
          <div
            role="listbox"
            aria-labelledby={`select-${name}`}
            data-testid="select-options-component-id"
            className="oui:absolute oui:w-full oui:z-20 oui:py-1 oui:mt-1 oui:bg-onpe-white oui:border oui:rounded-lg oui:shadow-lg oui:border-onpe-gray"
            style={{ maxHeight: 250, overflowY: "auto" }}
          >
            {options.map((option) => {
              const disables = optionsDisabled ? optionsDisabled() : null;
              const isDisabled = disables ? disables.has(option.value) : false;
              const isSelected = value === option.value;

              return (
                <button
                  disabled={isDisabled}
                  role="option"
                  aria-selected={isSelected}
                  className={classNames([
                    "oui:px-4 oui:py-2 oui:w-full oui:text-center oui:whitespace-normal oui:transition-colors",
                    "oui:disabled:bg-onpe-gray-extra-light oui:disabled:text-onpe-black oui:disabled:cursor-default",
                    isSelected
                      ? "oui:bg-onpe-skyblue oui:text-onpe-white oui:cursor-default"
                      : "oui:cursor-pointer oui:hover:bg-onpe-skyblue/15",
                  ])}
                  key={option.value}
                  type="button"
                  title={option.label}
                  onClick={(event_) => {
                    event_.stopPropagation();
                    if (!isDisabled) {
                      handleChange(option);
                    }
                  }}
                  onKeyDown={(event_) => {
                    if (event_.key === "Enter" && !isDisabled) {
                      event_.stopPropagation();
                      handleChange(option);
                    }
                  }}
                >
                  {option.label.length > 100
                    ? `${option.label.slice(0, 100)}…`
                    : option.label}
                </button>
              );
            })}
          </div>
        )}

        {isOpenOption && !loading && options?.length === 0 && (
          <div className="oui:absolute oui:w-full oui:z-20 oui:py-1 oui:mt-1 oui:bg-onpe-white oui:border oui:rounded-lg oui:shadow-lg oui:border-onpe-gray">
            <div className="oui:px-4 oui:py-3 oui:w-full oui:text-center oui:text-onpe-dark-gray">
              No hay opciones disponibles
            </div>
          </div>
        )}
      </div>

      {error && blur && (
        <p className="oui:mt-1 oui:text-sm oui:text-onpe-red">{error}</p>
      )}
    </div>
  );
}

export default Select;
