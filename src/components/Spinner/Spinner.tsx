export interface SpinnerProps {
  full?: boolean;
  absolute?: boolean;
}

export function Spinner({ full = false, absolute = false }: SpinnerProps) {
  const svg = (
    <svg
      className="oui:w-20 oui:h-20 oui:animate-spin oui:text-onpe-skyblue"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="oui:opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path
        className="oui:opacity-100"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (full) {
    return (
      <div
        data-testid="spinner-full"
        className={[
          "oui:flex oui:justify-center oui:items-center oui:h-screen oui:w-screen",
          absolute ? "oui:fixed oui:bg-onpe-white oui:z-[999]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {svg}
      </div>
    );
  }

  return (
    <div data-testid="spinner" className="oui:flex oui:justify-center oui:items-center oui:py-5">
      {svg}
    </div>
  );
}

export default Spinner;
