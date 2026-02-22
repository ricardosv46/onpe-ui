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
      className="fixed z-[99]"
      style={{ bottom: getBottomValue(), right: getRightValue() }}
    >
      <div
        className="relative h-[75px] transition-all duration-300"
        style={{ width: getContainerWidth() }}
      >
        {/* Warning icon */}
        {isWarningClosed ? (
          <button
            onClick={handleOpenWarning}
            className="absolute left-0 top-0 pb-2 h-[60px] w-[60px] flex items-center justify-center bg-onpe-yellow rounded-full z-10 cursor-pointer border-none transition-transform duration-200 hover:scale-110"
            aria-label="Abrir advertencia"
            type="button"
          >
            <IconWarningNotRecommended className="w-10 h-[35px] text-black" />
          </button>
        ) : (
          <div className="absolute left-0 top-0 pb-2 h-[60px] w-[60px] flex items-center justify-center bg-onpe-yellow rounded-full z-10">
            <IconWarningNotRecommended className="w-10 h-[35px] text-black" />
          </div>
        )}

        {/* Message */}
        <div
          className={[
            "absolute bg-white left-[30px] top-0 flex flex-col justify-center items-center gap-2",
            "border-2 border-onpe-yellow rounded-[10px] h-[60px] text-sm",
            "transition-all duration-300 overflow-hidden",
            isWarningClosed ? "opacity-0 border-0 pointer-events-none" : "opacity-100",
          ].join(" ")}
          style={{ width: getMessageWidth() }}
        >
          <div className="whitespace-nowrap pl-6">
            <p className="font-bold text-onpe-yellow m-0">Estás usando un</p>
            {isOpenDeviceError && (
              <p className="m-0 text-onpe-dark-gray">
                sistema operativo no recomendado
              </p>
            )}
            {isOpenBrowserError && !isOpenDeviceError && (
              <p className="m-0 text-onpe-dark-gray">navegador no recomendado</p>
            )}
          </div>
        </div>

        {/* Close button */}
        {!isWarningClosed && (
          <button
            onClick={handleCloseWarning}
            className="absolute -top-2 -right-2 z-20 rounded-full cursor-pointer border-none bg-transparent p-0 transition-opacity duration-200 hover:opacity-80"
            aria-label="Cerrar advertencia"
            type="button"
          >
            <IconCloseRadius className="w-[23px] h-[23px] text-onpe-yellow bg-white rounded-full" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NotRecommended;
