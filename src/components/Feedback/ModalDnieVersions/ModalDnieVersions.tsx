import { ReactNode } from "react";
import { Modal } from "../../Modal/Modal";

export interface ModalDnieVersionsProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  iconDnie1: ReactNode;
  iconDnie2: ReactNode;
  iconDnie3?: ReactNode;
  zIndexLevel?: number;
}

export const ModalDnieVersions = ({
  isOpen = false,
  onClose = () => {},
  className = "",
  iconDnie1,
  iconDnie2,
  iconDnie3,
  zIndexLevel = 100,
}: ModalDnieVersionsProps) => {
  return (
    <Modal
      zIndexLevel={zIndexLevel}
      isOpen={isOpen}
      onClose={onClose}
      className={`oui:bg-white oui:max-w-[590px]! oui:pt-[30px] oui:pb-[38px] oui:md:pt-[35px] oui:px-4 oui:md:pb-[54px] oui:md:px-8 ${className}`}
      closeButton={true}
      aria-label="Versiones del DNI electrónico"
    >
      <h2
        className="oui:text-center oui:text-onpe-blue oui:font-bold oui:mb-2 oui:text-lg oui:sm:text-xl"
        tabIndex={0}
      >
        <span className="oui:sr-only">Versiones del DNI electrónico</span>
        <span aria-hidden="true">Versiones del DNIe</span>
      </h2>

      <section className="oui:flex oui:flex-col oui:gap-5 oui:sm:gap-8 oui:items-center oui:mt-[18px] oui:sm:mt-6 oui:text-sm">
        {/* DNIe versión 1 */}
        <article className="oui:flex oui:flex-col oui:sm:flex-row oui:items-center oui:sm:items-start oui:gap-10 oui:w-full">
          <div className="oui:w-[233px]">
            <p className="oui:flex-1 oui:mb-4" tabIndex={0}>
              <span className="oui:font-bold">
                <span className="oui:sr-only">DNI electrónico versión 1</span>
                <span aria-hidden="true">DNIe versión 1</span>
              </span>
            </p>
            <ul
              role="none"
              className="oui:text-sm oui:list-disc oui:text-justify oui:self-start oui:pl-8"
            >
              <li role="none" className="oui:mb-2">
                <p tabIndex={0}>
                  <span className="oui:sr-only">
                    Chip en la parte delantera del DNI electrónico.
                  </span>
                  <span aria-hidden="true">
                    Chip en la parte delantera del DNIe.
                  </span>
                </p>
              </li>
              <li role="none" className="oui:mb-2">
                <p tabIndex={0}>
                  <span className="oui:sr-only">
                    Compatible solo con el lector del DNI electrónico en PC, Mac
                    o laptop.
                  </span>
                  <span aria-hidden="true">
                    Compatible solo con el lector del DNIe en{" "}
                    <strong>PC, Mac o laptop</strong>.
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="oui:w-[240px] oui:sm:w-[200px] oui:relative oui:flex oui:justify-center">
            {iconDnie1}
          </div>
        </article>

        {/* DNIe versión 2 y 3 */}
        <article className="oui:flex oui:flex-col oui:sm:flex-row oui:items-center oui:sm:items-start oui:gap-10 oui:sm:gap-[52px] oui:w-full">
          <div className="oui:w-[233px]">
            <p className="oui:flex-1 oui:mb-4" tabIndex={0}>
              <span className="oui:font-bold">
                <span className="oui:sr-only">DNI electrónico versión 2 y 3</span>
                <span aria-hidden="true">DNIe versión 2 y 3</span>
              </span>
            </p>
            <ul
              role="none"
              className="oui:text-sm oui:list-disc oui:text-justify oui:self-start oui:pl-8"
            >
              <li role="none" className="oui:mb-2">
                <p tabIndex={0}>
                  <span className="oui:sr-only">
                    Chip en la parte posterior del DNI electrónico.
                  </span>
                  <span aria-hidden="true">
                    Chip en la parte posterior del DNIe.
                  </span>
                </p>
              </li>
              <li role="none" className="oui:mb-2">
                <p tabIndex={0}>
                  <span className="oui:sr-only">
                    Compatibles con el lector del DNI electrónico en PC, Mac o
                    laptop y tecnología NFC (ISO 14443-B) en móviles.
                  </span>
                  <span aria-hidden="true">
                    Compatibles con el lector del DNIe en{" "}
                    <strong>
                      {" "}
                      PC, Mac o laptop y tecnología NFC (ISO 14443-B) en móviles
                    </strong>
                    .
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="oui:w-[240px] oui:sm:w-[200px] oui:h-[181px] oui:relative">
            {iconDnie2}
            {iconDnie3}
          </div>
        </article>
      </section>
    </Modal>
  );
};

export default ModalDnieVersions;
