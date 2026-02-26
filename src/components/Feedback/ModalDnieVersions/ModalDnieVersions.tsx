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
      className={`!max-w-[590px] !pt-[30px] !pb-[38px] ${className}`}
      closeButton={true}
    >
      <h2
        className="text-center text-onpe-blue font-bold mb-2 text-lg sm:text-xl"
        tabIndex={0}
      >
        <span className="sr-only">Versiones del DNI electrónico</span>
        <span aria-hidden="true">Versiones del DNIe</span>
      </h2>

      <section className="flex flex-col gap-5 sm:gap-8 items-center mt-[18px] sm:mt-6 text-sm">
        {/* DNIe versión 1 */}
        <article className="flex flex-col sm:flex-row items-center sm:items-start gap-10 w-full">
          <div className="w-[233px]">
            <p className="flex-1 mb-4" tabIndex={0}>
              <span className="font-bold">
                <span className="sr-only">DNI electrónico versión 1</span>
                <span aria-hidden="true">DNIe versión 1</span>
              </span>
            </p>
            <ul role="none" className="text-sm list-disc text-justify self-start pl-8">
              <li role="none" className="mb-2">
                <p tabIndex={0}>
                  <span className="sr-only">Chip en la parte delantera del DNI electrónico.</span>
                  <span aria-hidden="true">Chip en la parte delantera del DNIe.</span>
                </p>
              </li>
              <li role="none" className="mb-2">
                <p tabIndex={0}>
                  <span className="sr-only">Compatible solo con el lector del DNI electrónico en PC, Mac o laptop.</span>
                  <span aria-hidden="true">Compatible solo con el lector del DNIe en <strong>PC, Mac o laptop</strong>.</span>
                </p>
              </li>
            </ul>
          </div>
          <div className="w-[240px] sm:w-[200px] relative">
            {iconDnie1}
          </div>
        </article>

        {/* DNIe versión 2 y 3 */}
        <article className="flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-[52px] w-full">
          <div className="w-[233px]">
            <p className="flex-1 mb-4" tabIndex={0}>
              <span className="font-bold">
                <span className="sr-only">DNI electrónico versión 2 y 3</span>
                <span aria-hidden="true">DNIe versión 2 y 3</span>
              </span>
            </p>
            <ul role="none" className="text-sm list-disc text-justify self-start pl-8">
              <li role="none" className="mb-2">
                <p tabIndex={0}>
                  <span className="sr-only">Chip en la parte posterior del DNI electrónico.</span>
                  <span aria-hidden="true">Chip en la parte posterior del DNIe.</span>
                </p>
              </li>
              <li role="none" className="mb-2">
                <p tabIndex={0}>
                  <span className="sr-only">
                    Compatibles con el lector del DNI electrónico en PC, Mac o laptop y tecnología NFC (ISO 14443-B) en móviles.
                  </span>
                  <span aria-hidden="true">
                    Compatibles con el lector del DNIe en <strong> PC, Mac o laptop y tecnología NFC (ISO 14443-B) en móviles</strong>.
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="w-[240px] sm:w-[200px] h-[181px] relative">
            {iconDnie2}
            {iconDnie3}
          </div>
        </article>
      </section>
    </Modal>
  );
};

export default ModalDnieVersions;
