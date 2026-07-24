import { useState } from "react";
import { IconWarningNotRecommended } from "../../../icons/Actions/IconWarningNotRecommended";
import { IconCloseRadius } from "../../../icons/Actions/IconCloseRadius";

export interface NotRecommendedProps {
  isOpenBrowserError?: boolean;
  isOpenDeviceError?: boolean;
  bottom?: number | string;
  right?: number | string;
}

export const NotRecommended = ({
  isOpenBrowserError = false,
  isOpenDeviceError = false,
  bottom = 40,
  right = 20,
}: NotRecommendedProps) => {
  const [isWarningClosed, setIsWarningClosed] = useState(false);

  const handleOpenWarning = () => setIsWarningClosed(false);
  const handleCloseWarning = () => setIsWarningClosed(true);

  const getContainerWidth = () => {
    if (isWarningClosed) return "60px";
    if (isOpenDeviceError) return "365px";
    return "315px";
  };

  const getMessageWidth = () => {
    if (isWarningClosed) return "0";
    if (isOpenDeviceError) return "335px";
    return "285px";
  };

  const getBottomValue = () =>
    typeof bottom === "string" ? bottom : `${bottom}px`;

  const getRightValue = () =>
    typeof right === "string" ? right : `${right}px`;

  return (
    <div
      className="oui:fixed oui:z-[99]"
      style={{ bottom: getBottomValue(), right: getRightValue() }}
    >
      <div
        className="oui:relative oui:h-[75px] oui:transition-all oui:duration-300"
        style={{ width: getContainerWidth() }}
      >
        {/* Warning icon */}
        {isWarningClosed ? (
          <button
            onClick={handleOpenWarning}
            className="oui:absolute oui:left-0 oui:top-0 oui:pb-2 oui:h-[60px] oui:w-[60px] oui:flex oui:items-center oui:justify-center oui:bg-onpe-yellow oui:rounded-full oui:z-10 oui:cursor-pointer oui:border-none oui:transition-transform oui:duration-200 oui:hover:scale-110"
            aria-label="Abrir advertencia"
            type="button"
          >
            <IconWarningNotRecommended className="oui:w-10 oui:h-[35px] oui:text-black" />
          </button>
        ) : (
          <div className="oui:absolute oui:left-0 oui:top-0 oui:pb-2 oui:h-[60px] oui:w-[60px] oui:flex oui:items-center oui:justify-center oui:bg-onpe-yellow oui:rounded-full oui:z-10">
            <IconWarningNotRecommended className="oui:w-10 oui:h-[35px] oui:text-black" />
          </div>
        )}

        {/* Message */}
        <div
          className={[
            "oui:absolute oui:bg-white oui:left-[30px] oui:top-0 oui:flex oui:flex-col oui:justify-center oui:items-center oui:gap-2",
            "oui:border-2 oui:border-onpe-yellow oui:rounded-[10px] oui:h-[60px] oui:text-sm",
            "oui:transition-all oui:duration-300 oui:overflow-hidden",
            isWarningClosed ? "oui:opacity-0 oui:border-0 oui:pointer-events-none" : "oui:opacity-100",
          ].join(" ")}
          style={{ width: getMessageWidth() }}
        >
          <div className="oui:whitespace-nowrap oui:pl-6">
            <p className="oui:font-bold oui:text-onpe-yellow oui:m-0">Estás usando un</p>
            {isOpenDeviceError && (
              <p className="oui:m-0 oui:text-onpe-dark-gray">
                sistema operativo no recomendado
              </p>
            )}
            {isOpenBrowserError && !isOpenDeviceError && (
              <p className="oui:m-0 oui:text-onpe-dark-gray">navegador no recomendado</p>
            )}
          </div>
        </div>

        {/* Close button */}
        {!isWarningClosed && (
          <button
            onClick={handleCloseWarning}
            className="oui:absolute oui:-top-2 oui:-right-2 oui:z-20 oui:rounded-full oui:cursor-pointer oui:border-none oui:bg-transparent oui:p-0 oui:transition-opacity oui:duration-200 oui:hover:opacity-80"
            aria-label="Cerrar advertencia"
            type="button"
          >
            <IconCloseRadius className="oui:w-[23px] oui:h-[23px] oui:text-onpe-yellow oui:bg-white oui:rounded-full" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotRecommended;
