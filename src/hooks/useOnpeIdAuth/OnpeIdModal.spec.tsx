import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi, beforeEach } from "vitest";

import { OnpeIdModal } from "./OnpeIdModal";

vi.mock("../../components/Modal", () => ({
  Modal: ({
    isOpen,
    onClose,
    closeButton,
    closeDisabled,
    children,
    "aria-label": ariaLabel,
    existTabIndex,
  }: {
    isOpen: boolean;
    onClose: () => void;
    closeButton: boolean;
    closeDisabled?: boolean;
    children: React.ReactNode;
    "aria-label"?: string;
    existTabIndex?: boolean;
  }) => {
    if (!isOpen) return null;
    return (
      <div
        data-testid="modal"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={existTabIndex ? 0 : undefined}
      >
        {closeButton && (
          <button data-testid="modal-close" onClick={onClose} disabled={closeDisabled}>
            Close
          </button>
        )}
        {children}
      </div>
    );
  },
}));

describe("OnpeIdModal", () => {
  const defaultProps = {
    modalUrl: "http://test.url",
    isOpenModal: false,
    isOpenLaunchApp: false,
    isOnline: true,
    onClose: vi.fn(),
    iframeRef: { current: null },
    preloadIframeRef: { current: null },
    handlePreloadIframeReady: vi.fn(),
    handleModalIframeReady: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("no renderiza nada si isOnline es false", () => {
    const { container } = render(
      <OnpeIdModal {...defaultProps} isOnline={false} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("renderiza el iframe de precarga cuando hay modalUrl y el modal no está abierto", () => {
    render(<OnpeIdModal {...defaultProps} />);

    const iframe = screen.getByTitle("Precarga ONPE ID");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "http://test.url");
    expect(iframe).toHaveClass("oui:hidden");

    fireEvent.load(iframe);
    expect(defaultProps.handlePreloadIframeReady).toHaveBeenCalled();
  });

  test("no renderiza el iframe de precarga si el modal está abierto", () => {
    render(<OnpeIdModal {...defaultProps} isOpenModal={true} />);
    expect(screen.queryByTitle("Precarga ONPE ID")).not.toBeInTheDocument();
  });

  test("renderiza el modal con iframe cuando isOpenModal es true", () => {
    render(<OnpeIdModal {...defaultProps} isOpenModal={true} />);

    expect(screen.getByTestId("modal")).toBeInTheDocument();

    const iframe = screen.getByTitle("Aplicativo ONPEID para autenticación y registro");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "http://test.url");

    // Botón de cerrar visible pero deshabilitado hasta que cargue el iframe
    const closeBtn = screen.getByTestId("modal-close");
    expect(closeBtn).toBeDisabled();

    fireEvent.load(iframe);
    expect(defaultProps.handleModalIframeReady).toHaveBeenCalled();

    // Botón habilitado tras cargar
    expect(closeBtn).toBeEnabled();
  });

  test("el modal tiene aria-label y tabIndex para accesibilidad con lectores de pantalla", () => {
    render(<OnpeIdModal {...defaultProps} isOpenModal={true} />);

    const modal = screen.getByTestId("modal");
    expect(modal).toHaveAttribute("role", "dialog");
    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("aria-label", "Autenticación ONPE ID");
    expect(modal).toHaveAttribute("tabindex", "0");
  });

  test("oculta el botón cerrar si isOpenLaunchApp es true aunque el iframe ya cargó", () => {
    render(
      <OnpeIdModal {...defaultProps} isOpenModal={true} isOpenLaunchApp={true} />,
    );

    const iframe = screen.getByTitle("Aplicativo ONPEID para autenticación y registro");
    fireEvent.load(iframe);

    expect(screen.queryByTestId("modal-close")).not.toBeInTheDocument();
  });
});
