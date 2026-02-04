export type RobustFocusByIdOptions = {
  ids: string[];
  scrollToTop?: boolean;
  intervalMs?: number;
  timeoutMs?: number;
};

type FocusWithPreventScroll = (options?: { preventScroll?: boolean }) => void;

const isVisible = (el: HTMLElement) => el.getClientRects().length > 0;

const focusElement = (el: HTMLElement) => {
  // `focus({ preventScroll: true })` no está soportado en todos los navegadores.
  const focusFn = el.focus as unknown as FocusWithPreventScroll;
  try {
    focusFn?.({ preventScroll: true });
  } catch {
    try {
      el.focus();
    } catch {
      // noop
    }
  }
};

/**
 * Enfoca de forma robusta (con reintentos) el primer elemento visible entre los IDs.
 * Retorna una función de cleanup para limpiar interval/timeout.
 */
export const setupRobustFocusById = ({
  ids,
  scrollToTop = false,
  intervalMs = 100,
  timeoutMs = 2000,
}: RobustFocusByIdOptions): (() => void) => {
  if (
    scrollToTop &&
    typeof globalThis !== 'undefined' &&
    typeof globalThis.scrollTo === 'function'
  ) {
    try {
      globalThis.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // Fallback para navegadores antiguos
      try {
        globalThis.scrollTo(0, 0);
      } catch {
        // noop
      }
    }
  }

  const focusOnce = () => {
    if (typeof document === 'undefined') {
      return false;
    }

    const candidates = ids
      .map((id) => document.getElementById(id))
      .filter(
        (el): el is HTMLElement =>
          el instanceof HTMLElement && isVisible(el)
      );

    if (candidates.length === 0) {
      return false;
    }

    for (const el of candidates) {
      focusElement(el);
      if (document.activeElement === el) {
        return true;
      }
    }

    return false;
  };

  // Intento inmediato + reintentos (hidratación/responsive/render tardío)
  focusOnce();

  const intervalId = globalThis.setInterval(() => {
    const focused = focusOnce();
    if (focused) {
      globalThis.clearInterval(intervalId);
    }
  }, intervalMs);

  const stopId = globalThis.setTimeout(() => {
    globalThis.clearInterval(intervalId);
  }, timeoutMs);

  return () => {
    globalThis.clearInterval(intervalId);
    globalThis.clearTimeout(stopId);
  };
};

