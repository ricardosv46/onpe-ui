import { classNames } from "../../utils/classNames";

export interface StepperProps {
  active: number;
  total: number;
  className?: string;
  onSelectItem?: (value: number) => void;
}

export function Stepper({ active, total, className = "", onSelectItem }: StepperProps) {
  const elements = Array.from({ length: Math.max(total - 1, 0) }, (_, index) => index);

  const onClick = (index: number) => {
    onSelectItem?.(index);
  };

  let lastActive = "oui:text-onpe-blue";
  if (total <= active) {
    lastActive = "oui:bg-onpe-blue oui:text-onpe-white";
  }

  return (
    <div className={classNames([className, "oui:flex oui:justify-center oui:w-full"])}>
      <ol className="oui:flex oui:items-center oui:w-4/6">
        {elements.map((index) => {
          const n = index + 1;
          const hasLine =
            n < total
              ? "oui:after:content-[''] oui:after:w-full oui:after:border-onpe-skyblue oui:after:border oui:after:inline-block"
              : "";
          const circleActive =
            n <= active ? "oui:bg-onpe-blue oui:text-onpe-white" : "oui:text-onpe-blue";

          return (
            <button
              data-testid={`page-number-${n}`}
              key={`stepper-${n}`}
              type="button"
              className={classNames([
                "oui:flex oui:w-full oui:items-center oui:bg-transparent oui:border-none oui:p-0 oui:cursor-default",
                hasLine,
              ])}
              onClick={() => onClick(n)}
            >
              <span
                className={classNames([
                  "oui:flex oui:items-center oui:justify-center oui:w-8 oui:h-8 oui:border oui:rounded-full oui:lg:h-9 oui:lg:w-9 oui:shrink-0 oui:border-onpe-skyblue oui:cursor-default oui:font-bold",
                  circleActive,
                ])}
              >
                {n}
              </span>
            </button>
          );
        })}
      </ol>
      <span
        className={classNames([
          "oui:flex oui:items-center oui:justify-center oui:w-8 oui:h-8 oui:border oui:rounded-full oui:lg:h-9 oui:lg:w-9 oui:shrink-0 oui:border-onpe-skyblue oui:cursor-default oui:font-bold",
          lastActive,
        ])}
      >
        {total}
      </span>
    </div>
  );
}

export default Stepper;
