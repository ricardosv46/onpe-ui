// Icons
export * from "./icons";

// Core UI components
export { Button } from "./components/Button";
export type { ButtonProps } from "./components/Button";

export { Select } from "./components/Select";
export type { SelectProps, SelectOption, Option } from "./components/Select";

export { Input, InputArea, Radio } from "./components/Input";
export type {
  InputProps,
  InputAreaProps,
  RadioProps,
} from "./components/Input";

export { Spinner } from "./components/Spinner";
export type { SpinnerProps } from "./components/Spinner";

export { Stepper } from "./components/Stepper";
export type { StepperProps } from "./components/Stepper";

export {
  PaginatorNumbers,
  PaginatorSelectPerPage,
} from "./components/Paginator";
export type {
  PaginatorNumbersProps,
  PaginatorSelectPerPageProps,
} from "./components/Paginator";

export { Footer } from "./components/Footer";
export type { FooterProps } from "./components/Footer";

export { BrowserRecommended } from "./components/BrowserRecommended";

// Utilities
export { Portal } from "./components/Portal";
export type { PortalProps } from "./components/Portal";

export { Overlay } from "./components/Overlay";
export type { OverlayProps } from "./components/Overlay";

export { Show } from "./components/Show";
export type { ShowProps } from "./components/Show";

// Modal base
export { Modal } from "./components/Modal";
export type { ModalProps } from "./components/Modal";

// Error Handling
export { ModalBrowserIncompatible } from "./components/ErrorHandling/ModalBrowserIncompatible";
export type { ModalBrowserIncompatibleProps } from "./components/ErrorHandling/ModalBrowserIncompatible";

export { ModalSystemIncompatible } from "./components/ErrorHandling/ModalSystemIncompatible";
export type { ModalSystemIncompatibleProps } from "./components/ErrorHandling/ModalSystemIncompatible";

export { NotRecommended } from "./components/ErrorHandling/NotRecommended";
export type { NotRecommendedProps } from "./components/ErrorHandling/NotRecommended";

// Feedback modals
export { ModalConfirm } from "./components/Feedback/ModalConfirm";
export type { ModalConfirmProps } from "./components/Feedback/ModalConfirm";

export { ModalLoading } from "./components/Feedback/ModalLoading";
export type { ModalLoadingProps } from "./components/Feedback/ModalLoading";

export { ModalDnieVersions } from "./components/Feedback/ModalDnieVersions";
export type { ModalDnieVersionsProps } from "./components/Feedback/ModalDnieVersions";

export { ModalNfc } from "./components/Feedback/ModalNfc";
export type { ModalNfcProps } from "./components/Feedback/ModalNfc";

// ONPE ID hooks
export * from "./hooks";
