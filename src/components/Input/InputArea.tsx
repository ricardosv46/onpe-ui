import type { InputHTMLAttributes, ReactElement, SVGProps } from "react";
import { useEffect, useId, useState } from "react";

import { classNames } from "../../utils/classNames";

export interface InputAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  icon?: (props: SVGProps<SVGSVGElement>) => ReactElement;
  classInput?: string;
  error?: string;
  autoBlur?: boolean;
}

export function InputArea({
  icon: Icon,
  classInput,
  error = "",
  autoBlur = false,
  ...props
}: InputAreaProps) {
  const uid = useId();
  const [blur, setBlur] = useState(false);
  const { className, disabled, ...resprops } = props;

  useEffect(() => {
    if (!autoBlur) return;
    const timer = setTimeout(() => setBlur(true), 100);
    return () => {
      clearTimeout(timer);
      setBlur(false);
    };
  }, [autoBlur]);

  useEffect(() => {
    const textarea = document.getElementById(`input-${uid}`) as HTMLTextAreaElement | null;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [resprops.value, uid]);

  return (
    <div className={className}>
      <div className="oui:relative">
        <textarea
          {...resprops}
          onFocus={() => setBlur(true)}
          id={`input-${uid}`}
          rows={1}
          onInput={(event_) => {
            const target = event_.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${target.scrollHeight}px`;
          }}
          style={{ overflow: "hidden", resize: "none" }}
          className={classNames([
            classInput,
            "oui:py-2.5 oui:px-5 oui:border-onpe-gray oui:outline-none oui:border oui:flex-1 oui:w-full",
          ])}
          disabled={disabled}
        />
      </div>
      {blur && error && (
        <div className="oui:relative oui:h-6">
          <p
            className={classNames([
              Icon ? "oui:ml-12" : "",
              "oui:text-onpe-dark-gray oui:absolute oui:left-0 oui:top-0 oui:text-nowrap",
            ])}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default InputArea;
