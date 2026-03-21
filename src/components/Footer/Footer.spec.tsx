import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Footer } from "./Footer";

vi.mock("../BrowserRecommended/BrowserRecommended", () => ({
  BrowserRecommended: () => <div data-testid="browser-recommended">Navegadores</div>,
}));
vi.mock("../../icons/Redes/FaceBookIcon", () => ({ FaceBookIcon: () => <svg /> }));
vi.mock("../../icons/Redes/XIcon", () => ({ XIcon: () => <svg /> }));
vi.mock("../../icons/Redes/TikTokIcon", () => ({ TikTokIcon: () => <svg /> }));
vi.mock("../../icons/Redes/YoutubeIcon", () => ({ YoutubeIcon: () => <svg /> }));
vi.mock("../../icons/Redes/InstagramIcon", () => ({ InstagramIcon: () => <svg /> }));

describe("Footer", () => {
  test("renderiza el elemento footer", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("muestra BrowserRecommended por defecto", () => {
    render(<Footer />);
    expect(screen.getByTestId("browser-recommended")).toBeInTheDocument();
  });

  test("oculta BrowserRecommended cuando showBrowserInfo es false", () => {
    render(<Footer showBrowserInfo={false} />);
    expect(screen.queryByTestId("browser-recommended")).not.toBeInTheDocument();
  });

  test("muestra sección de contacto por defecto", () => {
    render(<Footer />);
    expect(screen.getByText(/jr. washington/i)).toBeInTheDocument();
  });

  test("oculta sección de contacto cuando showContactInfo es false", () => {
    render(<Footer showContactInfo={false} />);
    expect(screen.queryByText(/jr. washington/i)).not.toBeInTheDocument();
  });

  test("muestra banner de desarrollo cuando isDevelopment es true", () => {
    render(<Footer isDevelopment={true} />);
    expect(screen.getByText(/versión en desarrollo/i)).toBeInTheDocument();
  });

  test("oculta banner de desarrollo cuando isDevelopment es false", () => {
    render(<Footer isDevelopment={false} />);
    expect(screen.queryByText(/versión en desarrollo/i)).not.toBeInTheDocument();
  });

  test("oculta todo el contenido del footer cuando showFooterContent es false", () => {
    render(<Footer showFooterContent={false} />);
    expect(screen.queryByTestId("browser-recommended")).not.toBeInTheDocument();
    expect(screen.queryByText(/jr. washington/i)).not.toBeInTheDocument();
  });

  test("renderiza children dentro del footer", () => {
    render(<Footer><div data-testid="custom-child">Contenido custom</div></Footer>);
    expect(screen.getByTestId("custom-child")).toBeInTheDocument();
  });

  test("muestra los links de redes sociales", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /facebook/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /youtube/i })).toBeInTheDocument();
  });

  test("pasa atributos HTML al footer", () => {
    render(<Footer data-testid="mi-footer" />);
    expect(screen.getByTestId("mi-footer")).toBeInTheDocument();
  });
});
