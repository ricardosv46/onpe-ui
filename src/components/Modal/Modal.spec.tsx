import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Modal } from "./Modal";

// Portal renderiza directamente en document.body — no hace falta mockear
vi.mock("../Portal/Portal", () => ({
  Portal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../../components/ModalGlobal/ModalGlobalContext", () => ({
  useModalGlobalContext: () => null,
}));

vi.mock("../../icons/Actions/IconCloseRadius", () => ({
  IconCloseRadius: () => <svg data-testid="icon-close" />,
}));

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  children: <div>Contenido del modal</div>,
};

describe("Modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("renderizado básico", () => {
    test("renderiza el contenido cuando isOpen es true y animated es false", () => {
      render(<Modal {...defaultProps} animated={false} />);
      expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
    });

    test("no renderiza nada cuando isOpen es false y animated es false", () => {
      render(
        <Modal {...defaultProps} isOpen={false} animated={false}>
          <div>Oculto</div>
        </Modal>
      );
      expect(screen.queryByText("Oculto")).not.toBeInTheDocument();
    });

    test("renderiza con role dialog", () => {
      render(<Modal {...defaultProps} animated={false} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    test("el dialog tiene aria-modal=true", () => {
      render(<Modal {...defaultProps} animated={false} />);
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });
  });

  describe("botón de cierre", () => {
    test("no muestra botón de cierre por defecto", () => {
      render(<Modal {...defaultProps} animated={false} />);
      expect(screen.queryByRole("button", { name: "Cerrar" })).not.toBeInTheDocument();
    });

    test("muestra botón de cierre cuando closeButton es true", () => {
      render(<Modal {...defaultProps} animated={false} closeButton />);
      expect(screen.getByRole("button", { name: "Cerrar" })).toBeInTheDocument();
    });

    test("llama onClose al hacer clic en el botón cerrar", () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} animated={false} closeButton onClose={onClose} />);
      fireEvent.click(screen.getByRole("button", { name: "Cerrar" }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("teclado", () => {
    test("llama onClose al presionar Escape", () => {
      const onClose = vi.fn();
      render(<Modal {...defaultProps} animated={false} onClose={onClose} />);
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    test("no llama onClose con Escape cuando escapeToClose es false", () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} animated={false} onClose={onClose} escapeToClose={false} />
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).not.toHaveBeenCalled();
    });

    test("no llama onClose con Escape cuando closeDisabled es true", () => {
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} animated={false} onClose={onClose} closeDisabled />
      );
      fireEvent.keyDown(document, { key: "Escape" });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("backdrop", () => {
    test("llama onClose al hacer clic en el backdrop", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal {...defaultProps} animated={false} onClose={onClose} />
      );
      // El primer div fixed es el backdrop
      const backdrop = container.querySelector(".fixed.inset-0");
      expect(backdrop).toBeTruthy();
      fireEvent.click(backdrop!);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("aria attributes", () => {
    test("aplica aria-labelledby correctamente", () => {
      render(
        <Modal {...defaultProps} animated={false} aria-labelledby="titulo-modal" />
      );
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby", "titulo-modal");
    });

    test("aplica aria-label correctamente", () => {
      render(
        <Modal {...defaultProps} animated={false} aria-label="Modal de prueba" />
      );
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Modal de prueba");
    });
  });

  describe("scroll del body", () => {
    test("bloquea el scroll del body cuando isOpen es true", () => {
      render(<Modal {...defaultProps} animated={false} preventBodyScroll />);
      expect(document.body.style.overflow).toBe("hidden");
    });

    test("no bloquea el scroll cuando preventBodyScroll es false", () => {
      document.body.style.overflow = "";
      render(<Modal {...defaultProps} animated={false} preventBodyScroll={false} />);
      expect(document.body.style.overflow).toBe("");
    });
  });
});
