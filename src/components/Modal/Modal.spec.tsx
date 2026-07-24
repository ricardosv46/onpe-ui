import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { Modal } from "./Modal";

// Portal renderiza directamente en document.body ÿÿÿ no hace falta mockear
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
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.style.touchAction = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.touchAction = "";
  });

  describe("renderizado b?sico", () => {
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

  describe("bot?n de cierre", () => {
    test("no muestra bot?n de cierre por defecto", () => {
      render(<Modal {...defaultProps} animated={false} />);
      expect(screen.queryByRole("button", { name: "Cerrar" })).not.toBeInTheDocument();
    });

    test("muestra bot?n de cierre cuando closeButton es true", () => {
      render(<Modal {...defaultProps} animated={false} closeButton />);
      expect(screen.getByRole("button", { name: "Cerrar" })).toBeInTheDocument();
    });

    test("llama onClose al hacer clic en el bot?n cerrar", () => {
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

  describe("focus trap", () => {
    test("enfoca el dialog al abrirse aunque exista bot?n de cierre", async () => {
      render(
        <Modal {...defaultProps} animated={false} closeButton existTabIndex>
          <button type="button">Acci?n</button>
        </Modal>
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toHaveFocus();
      });
    });

    test("reencierra el foco si un elemento externo intenta recibirlo", async () => {
      render(
        <>
          <button type="button">Elemento externo</button>
          <Modal {...defaultProps} animated={false} closeButton existTabIndex>
            <button type="button">Acci?n interna</button>
          </Modal>
        </>
      );

      const dialog = screen.getByRole("dialog");
      const outsideButton = screen.getByRole("button", { name: "Elemento externo" });

      await waitFor(() => {
        expect(dialog).toHaveFocus();
      });

      act(() => {
        outsideButton.focus();
      });

      await waitFor(() => {
        expect(dialog.contains(document.activeElement)).toBe(true);
      });
    });

    test("restaura el foco previo sin desplazar el scroll", async () => {
      const { rerender } = render(
        <>
          <button type="button">Elemento externo</button>
          <Modal {...defaultProps} isOpen={false} animated={false} existTabIndex>
            <button type="button">Acci?n interna</button>
          </Modal>
        </>
      );

      const outsideButton = screen.getByRole("button", { name: "Elemento externo" });
      outsideButton.focus();

      const focusSpy = vi.spyOn(outsideButton, "focus");

      rerender(
        <>
          <button type="button">Elemento externo</button>
          <Modal {...defaultProps} isOpen animated={false} existTabIndex>
            <button type="button">Acci?n interna</button>
          </Modal>
        </>
      );

      await waitFor(() => {
        expect(screen.getByRole("dialog")).toHaveFocus();
      });

      rerender(
        <>
          <button type="button">Elemento externo</button>
          <Modal {...defaultProps} isOpen={false} animated={false} existTabIndex>
            <button type="button">Acci?n interna</button>
          </Modal>
        </>
      );

      await waitFor(() => {
        expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
      });
    });
  });

  describe("backdrop", () => {
    test("llama onClose al hacer clic en el backdrop", () => {
      const onClose = vi.fn();
      const { container } = render(
        <Modal {...defaultProps} animated={false} onClose={onClose} />
      );
      // El primer div fixed es el backdrop
      const backdrop = container.querySelector(".oui\\:fixed.oui\\:inset-0");
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
      expect(document.documentElement.style.overflow).toBe("hidden");
      expect(document.body.style.touchAction).toBe("none");
      expect(document.documentElement.style.touchAction).toBe("none");
    });

    test("no bloquea el scroll cuando preventBodyScroll es false", () => {
      document.body.style.overflow = "";
      render(<Modal {...defaultProps} animated={false} preventBodyScroll={false} />);
      expect(document.body.style.overflow).toBe("");
      expect(document.documentElement.style.overflow).toBe("");
    });

    test("restaura estilos de scroll al cerrar el modal", () => {
      const { rerender } = render(<Modal {...defaultProps} animated={false} preventBodyScroll />);

      expect(document.body.style.overflow).toBe("hidden");
      expect(document.documentElement.style.overflow).toBe("hidden");

      rerender(<Modal {...defaultProps} isOpen={false} animated={false} preventBodyScroll />);

      expect(document.body.style.overflow).toBe("");
      expect(document.documentElement.style.overflow).toBe("");
      expect(document.body.style.touchAction).toBe("");
      expect(document.documentElement.style.touchAction).toBe("");
    });
  });
});
