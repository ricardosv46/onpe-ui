import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi, beforeEach } from "vitest";

import { OnpeIdModal } from "./OnpeIdModal";

vi.mock("../../components/Modal", () => ({
  Modal: ({
    isOpen,
    onClose,
    closeButton,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    closeButton: boolean;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;
    return (
      <div data-testid="modal">
        {closeButton && (
          <button data-testid="modal-close" onClick={onClose}>
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
    expect(iframe).toHaveClass("hidden");

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

    // Botón de cerrar oculto hasta que cargue el iframe
    expect(screen.queryByTestId("modal-close")).not.toBeInTheDocument();

    fireEvent.load(iframe);
    expect(defaultProps.handleModalIframeReady).toHaveBeenCalled();

    // Aparece el botón tras cargar
    expect(screen.getByTestId("modal-close")).toBeInTheDocument();
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
