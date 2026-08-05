import type { InputHTMLAttributes, ReactElement, SVGProps } from "react";
import { useEffect, useId, useState } from "react";

import { IconShowPassword } from "../../icons/Actions/IconShowPassword";
import { IconShowPasswordSlash } from "../../icons/Actions/IconShowPasswordSlash";
import { classNames } from "../../utils/classNames";
import { useToggle } from "../../utils/useToggle";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: (props: SVGProps<SVGSVGElement>) => ReactElement;
  classInput?: string;
  error?: string;
  autoBlur?: boolean;
}

export function Input({
  icon: Icon,
  classInput,
  error = "",
  autoBlur = false,
  ...props
}: InputProps) {
  const uid = useId();
  const [blur, setBlur] = useState(false);
  const { className, ...resprops } = props;
  const [isShow, , , toggleShow] = useToggle();

  const getInputType = () => {
    if (props.type === "password") {
      return isShow ? "text" : "password";
    }
    return props.type;
  };

  useEffect(() => {
    if (!autoBlur) return;
    const timer = setTimeout(() => setBlur(true), 100);
    return () => {
      clearTimeout(timer);
      setBlur(false);
    };
  }, [autoBlur]);

  return (
    <div className={className}>
      <div
        className={classNames([
          typeof Icon === "function" ? "oui:flex" : "",
          "oui:relative",
        ])}
      >
        {typeof Icon === "function" && (
          <div className="oui:bg-onpe-blue oui:text-white oui:w-12 oui:h-12 oui:flex oui:justify-center oui:items-center oui:shrink-0">
            <Icon className="oui:w-8 oui:h-8" />
          </div>
        )}

        <input
          {...resprops}
          onFocus={() => setBlur(true)}
          type={getInputType()}
          id={`input-${uid}`}
          autoComplete="off"
          className={classNames([
            classInput,
            props.type === "password" ? "oui:pl-5 oui:pr-12" : "oui:px-5",
            "oui:border-onpe-gray oui:outline-none oui:border oui:flex-1 oui:h-12 oui:placeholder:normal-case",
          ])}
        />

        {props.type === "password" &&
          (isShow ? (
            <IconShowPassword
              onClick={toggleShow}
              className="oui:cursor-pointer oui:absolute oui:top-2.5 oui:right-4"
            />
          ) : (
            <IconShowPasswordSlash
              onClick={toggleShow}
              className="oui:cursor-pointer oui:absolute oui:top-2.5 oui:right-4"
            />
          ))}
      </div>
      {blur && error && (
        <div className="oui:relative oui:h-6">
          <p
            className={classNames([
              Icon ? "oui:ml-12" : "",
              "oui:text-onpe-dark-gray oui:absolute oui:left-0 oui:top-0 oui:text-nowrap oui:normal-case",
            ])}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default Input;
