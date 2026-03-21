import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { ModalConfirm } from "./ModalConfirm";

vi.mock("../../Modal/Modal", () => ({
  Modal: ({ isOpen, onClose, children, closeButton }: {
    isOpen: boolean; onClose: () => void; children: React.ReactNode; closeButton?: boolean;
  }) => {
    if (!isOpen) return null;
    return (
      <div role="dialog">
        {closeButton && <button onClick={onClose} aria-label="Cerrar">X</button>}
        {children}
      </div>
    );
  },
}));

vi.mock("../../../icons/Actions/IconCheck", () => ({ IconCheck: () => <svg data-testid="icon-check" /> }));
vi.mock("../../../icons/Actions/IconQuestion", () => ({ IconQuestion: () => <svg data-testid="icon-question" /> }));
vi.mock("../../../icons/Actions/IconInfo", () => ({ IconInfo: () => <svg data-testid="icon-info" /> }));
vi.mock("../../../icons", () => ({ IconWarningNotRecommended: () => <svg data-testid="icon-warning" /> }));

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
};

describe("ModalConfirm", () => {
  beforeEach(() => vi.clearAllMocks());

  describe("renderizado básico", () => {
    test("no renderiza nada cuando isOpen es false", () => {
      render(<ModalConfirm {...defaultProps} isOpen={false} />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    test("renderiza el modal cuando isOpen es true", () => {
      render(<ModalConfirm {...defaultProps} />);
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    test("muestra el título personalizado", () => {
      render(<ModalConfirm {...defaultProps} title="Mi título" />);
      expect(screen.getByText("Mi título")).toBeInTheDocument();
    });
  });

  describe("títulos por defecto según type", () => {
    test("success muestra 'Confirmación' por defecto", () => {
      render(<ModalConfirm {...defaultProps} type="success" />);
      expect(screen.getByText("Confirmación")).toBeInTheDocument();
    });

    test("warning muestra 'Advertencia' por defecto", () => {
      render(<ModalConfirm {...defaultProps} type="warning" />);
      expect(screen.getByText("Advertencia")).toBeInTheDocument();
    });

    test("question muestra 'Atención' por defecto", () => {
      render(<ModalConfirm {...defaultProps} type="question" />);
      expect(screen.getByText("Atención")).toBeInTheDocument();
    });

    test("info muestra 'Información' por defecto", () => {
      render(<ModalConfirm {...defaultProps} type="info" />);
      expect(screen.getByText("Información")).toBeInTheDocument();
    });
  });

  describe("iconos según type", () => {
    test("type success muestra icono check", () => {
      render(<ModalConfirm {...defaultProps} type="success" />);
      expect(screen.getByTestId("icon-check")).toBeInTheDocument();
    });

    test("type question muestra icono question", () => {
      render(<ModalConfirm {...defaultProps} type="question" />);
      expect(screen.getByTestId("icon-question")).toBeInTheDocument();
    });

    test("type info muestra icono info", () => {
      render(<ModalConfirm {...defaultProps} type="info" />);
      expect(screen.getByTestId("icon-info")).toBeInTheDocument();
    });

    test("type warning muestra icono warning", () => {
      render(<ModalConfirm {...defaultProps} type="warning" />);
      expect(screen.getByTestId("icon-warning")).toBeInTheDocument();
    });

    test("type none no muestra icono", () => {
      render(<ModalConfirm {...defaultProps} type="none" />);
      expect(screen.queryByTestId("icon-check")).not.toBeInTheDocument();
      expect(screen.queryByTestId("icon-warning")).not.toBeInTheDocument();
    });
  });

  describe("mensaje y contenido", () => {
    test("muestra el mensaje como string", () => {
      render(<ModalConfirm {...defaultProps} message="Este es el mensaje" />);
      expect(screen.getByText("Este es el mensaje")).toBeInTheDocument();
    });

    test("muestra contenido JSX como message", () => {
      render(<ModalConfirm {...defaultProps} message={<span data-testid="jsx-msg">JSX message</span>} />);
      expect(screen.getByTestId("jsx-msg")).toBeInTheDocument();
    });

    test("muestra content (alias de message)", () => {
      render(<ModalConfirm {...defaultProps} content={<div data-testid="content-div">Contenido</div>} />);
      expect(screen.getByTestId("content-div")).toBeInTheDocument();
    });
  });

  describe("modos de botones (buttonMode)", () => {
    test("buttonMode single muestra solo el botón confirmar", () => {
      render(<ModalConfirm {...defaultProps} buttonMode="single" />);
      // Hay dos layouts (mobile + desktop), por eso hay 2 botones "Aceptar"
      expect(screen.getAllByText("Aceptar").length).toBeGreaterThan(0);
      expect(screen.queryByText("Cancelar")).not.toBeInTheDocument();
    });

    test("buttonMode double muestra confirmar y cancelar", () => {
      render(<ModalConfirm {...defaultProps} buttonMode="double" />);
      expect(screen.getAllByText("Confirmar").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Cancelar").length).toBeGreaterThan(0);
    });

    test("buttonMode confirm muestra 'Sí' y 'No'", () => {
      render(<ModalConfirm {...defaultProps} buttonMode="confirm" />);
      expect(screen.getAllByText("Sí").length).toBeGreaterThan(0);
      expect(screen.getAllByText("No").length).toBeGreaterThan(0);
    });

    test("type question usa buttonMode confirm por defecto", () => {
      render(<ModalConfirm {...defaultProps} type="question" />);
      expect(screen.getAllByText("Sí").length).toBeGreaterThan(0);
      expect(screen.getAllByText("No").length).toBeGreaterThan(0);
    });

    test("textos personalizados de botones", () => {
      render(
        <ModalConfirm
          {...defaultProps}
          buttonMode="double"
          textButtonConfirm="Eliminar"
          textButtonCancel="Volver"
        />
      );
      expect(screen.getAllByText("Eliminar").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Volver").length).toBeGreaterThan(0);
    });
  });

  describe("handlers", () => {
    test("onConfirm se llama al hacer clic en confirmar", async () => {
      const onConfirm = vi.fn().mockResolvedValue(undefined);
      render(<ModalConfirm {...defaultProps} buttonMode="single" onConfirm={onConfirm} withoutAutoClose />);
      // Hay dos botones (mobile y desktop), hacemos clic en el primero visible
      const buttons = screen.getAllByText("Aceptar");
      fireEvent.click(buttons[0]);
      await waitFor(() => expect(onConfirm).toHaveBeenCalledTimes(1));
    });

    test("onCancel se llama al hacer clic en cancelar", () => {
      const onCancel = vi.fn();
      render(<ModalConfirm {...defaultProps} buttonMode="double" onCancel={onCancel} withoutAutoClose />);
      const cancelButtons = screen.getAllByText("Cancelar");
      fireEvent.click(cancelButtons[0]);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test("llama onClose después de confirmar cuando withoutAutoClose es false", async () => {
      const onClose = vi.fn();
      render(<ModalConfirm isOpen onClose={onClose} buttonMode="single" onConfirm={vi.fn()} />);
      const buttons = screen.getAllByText("Aceptar");
      fireEvent.click(buttons[0]);
      await waitFor(() => expect(onClose).toHaveBeenCalled());
    });

    test("no llama onClose después de confirmar cuando withoutAutoClose es true", async () => {
      const onClose = vi.fn();
      render(
        <ModalConfirm isOpen onClose={onClose} buttonMode="single" onConfirm={vi.fn()} withoutAutoClose />
      );
      const buttons = screen.getAllByText("Aceptar");
      fireEvent.click(buttons[0]);
      await waitFor(() => expect(onClose).not.toHaveBeenCalled());
    });

    test("disabledConfirmButton desactiva el botón confirmar", () => {
      render(<ModalConfirm {...defaultProps} buttonMode="single" disabledConfirmButton />);
      const buttons = screen.getAllByText("Aceptar").map(el => el.closest("button"));
      expect(buttons.some(b => b?.disabled)).toBe(true);
    });
  });
});
