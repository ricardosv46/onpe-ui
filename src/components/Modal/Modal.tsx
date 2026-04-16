import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "../Portal/Portal";
import { IconCloseRadius } from "../../icons/Actions/IconCloseRadius";
import { useModalGlobalContext } from "../ModalGlobal/ModalGlobalContext";
import { useScrollLock } from "./useScrollLock";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  whitoutBackground?: boolean;
  closeButton?: boolean;
  closeDisabled?: boolean;
  escapeToClose?: boolean;
  disableFocus?: boolean;
  disableFocusRestore?: boolean;
  existTabIndex?: boolean;
  zIndexLevel?: number;
  onCloseComplete?: () => void;
  /** Alinea el modal al tope de la pantalla en vez de al centro */
  alignTop?: boolean;
  /** Habilita animación de entrada/salida (default: true) */
  animated?: boolean;
  /** Bloquea el scroll del body mientras el modal está abierto (default: true) */
  preventBodyScroll?: boolean;
  overlayColor?:
    | "blue"
    | "skyblue"
    | "skyblue-light"
    | "yellow"
    | "light-skyblue"
    | "gray"
    | "gray-light"
    | "gray-extra-light"
    | "red"
    | "dark-gray"
    | "green"
    | "yellow-light"
    | "primary";
}

// Registry: modalId -> assigned zIndexLevel (backdrop level)
const openModals: Map<string, number> =
  ((globalThis as unknown as Record<string, unknown>).__openModals as Map<
    string,
    number
  >) ||
  ((globalThis as unknown as Record<string, Map<string, number>>).__openModals =
    new Map<string, number>());

/**
 * Calcula el z-index a usar para el nuevo modal.
 * Si el zIndexLevel solicitado quedaría por debajo del contenido del modal
 * más alto abierto actualmente (assigned + 10), lo eleva automáticamente.
 */
const computeZIndex = (requested: number): number => {
  if (openModals.size === 0) return requested;
  const maxAssigned = Math.max(...openModals.values());
  // El contenido del modal más alto está en maxAssigned + 10.
  // El backdrop del nuevo modal debe estar por encima de eso.
  return Math.max(requested, maxAssigned + 20);
};

const registerModal = (id: string, zIndex: number) => {
  openModals.set(id, zIndex);
};

const unregisterModal = (id: string) => {
  openModals.delete(id);
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  "object",
  "embed",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(",");

const FOCUS_GUARD_ATTRIBUTE = "data-focus-guard";

const focusGuardStyle = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

const isElementVisible = (element: HTMLElement) => {
  const style = globalThis.getComputedStyle(element);
  return (
    style.visibility !== "hidden" &&
    style.display !== "none" &&
    element.offsetParent !== null
  );
};

const getFocusableElements = (wrapper: HTMLElement, includeWrapper = true) => {
  let focusable = Array.from(
    wrapper.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  ).filter(
    (el) =>
      !el.hasAttribute(FOCUS_GUARD_ATTRIBUTE) &&
      isElementVisible(el) &&
      el.tabIndex !== -1,
  );

  if (includeWrapper && wrapper.tabIndex >= 0) {
    focusable = [wrapper, ...focusable];
  }

  return focusable;
};

const focusWrapper = (wrapper: HTMLElement, options?: FocusOptions) => {
  if (wrapper.tabIndex >= 0) {
    wrapper.focus(options);
    return;
  }

  const focusable = getFocusableElements(wrapper, false);
  if (focusable.length > 0) {
    focusable[0].focus(options);
  } else {
    // Sin elementos focusables: enfocar el wrapper directamente
    // (igual que hace el handler de Tab cuando focusable está vacío).
    wrapper.focus(options);
  }
};

const focusEdgeElement = (
  wrapper: HTMLElement,
  position: "first" | "last",
  options?: FocusOptions,
) => {
  const focusable = getFocusableElements(wrapper, false);
  const target = position === "last" ? focusable.at(-1) : focusable[0];

  if (target) {
    target.focus(options);
    return;
  }

  focusWrapper(wrapper, options);
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  whitoutBackground = false,
  closeButton = false,
  closeDisabled = false,
  escapeToClose = true,
  disableFocus: disableFocusProp,
  disableFocusRestore = false,
  existTabIndex = false,
  zIndexLevel = 100,
  onCloseComplete,
  alignTop = false,
  animated: animatedProp,
  preventBodyScroll = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- overlayColor reservado para uso futuro
  overlayColor: _overlayColor = "blue",
  ...props
}: ModalProps) => {
  const modalId = useId();
  const ctx = useModalGlobalContext();
  const animated = animatedProp ?? ctx?.animated ?? true;
  const disableFocus = disableFocusProp ?? ctx?.disableFocus ?? false;
  const [assignedZIndex, setAssignedZIndex] = useState(zIndexLevel);
  const ariaLabelledBy = props["aria-labelledby"];
  const modalRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const prevIsOpenRef = useRef(isOpen);

  useScrollLock(isOpen && preventBodyScroll);

  // Restaura el foco al elemento previo solo cuando el modal realmente cierra
  // (isOpen: true → false). No corre si el efecto se re-ejecuta por otras deps.
  useEffect(() => {
    const wasOpen = prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (
      wasOpen &&
      !isOpen &&
      !disableFocus &&
      !disableFocusRestore &&
      previousActiveElement.current
    ) {
      try {
        previousActiveElement.current.focus({ preventScroll: true });
      } catch {
        previousActiveElement.current.focus();
      }
    }
  }, [isOpen, disableFocus, disableFocusRestore]);

  const handleStartFocusGuard = () => {
    const wrapper = modalRef.current;
    if (!wrapper) return;
    focusEdgeElement(wrapper, "last", { preventScroll: true });
  };
  const handleEndFocusGuard = () => {
    const wrapper = modalRef.current;
    if (!wrapper) return;
    focusEdgeElement(wrapper, "first", { preventScroll: true });
  };

  // CSS animation state (replaces framer-motion AnimatePresence)
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  // Foco inicial al abrir el modal. Si modalRef.current aún es null
  // (Portal tiene un ciclo de montaje extra), reintenta hasta encontrarlo.
  useEffect(() => {
    const domReady = animated ? mounted : isOpen;
    if (!domReady || !isOpen || disableFocus) return;

    const tryFocus = () => {
      const wrapper = modalRef.current;
      if (!wrapper) return false;
      previousActiveElement.current = document.activeElement as HTMLElement;
      focusWrapper(wrapper, { preventScroll: true });
      return true;
    };

    if (tryFocus()) return;

    const retryTimers = [0, 16, 50].map((delay) =>
      setTimeout(() => tryFocus(), delay),
    );
    return () => retryTimers.forEach(clearTimeout);
  }, [mounted, isOpen, animated, disableFocus]);

  // Cache children during exit animation (replicates AnimatePresence behavior):
  // when global state clears data before the modal finishes closing, the cached
  // children keep the content visible throughout the exit animation.
  const [cachedChildren, setCachedChildren] = useState<ReactNode>(children);
  useEffect(() => {
    if (isOpen) {
      setCachedChildren(children);
    }
  }, [isOpen, children]);

  useEffect(() => {
    if (!animated) return;
    if (isOpen) {
      setMounted(true);
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timer = setTimeout(() => {
        setMounted(false);
        onCloseComplete?.();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen, animated, onCloseComplete]);

  // Body scroll lock + z-index auto-stacking
  useLayoutEffect(() => {
    if (isOpen) {
      const computed = computeZIndex(zIndexLevel);
      setAssignedZIndex(computed);
      registerModal(modalId, computed);
    }
    return () => {
      if (isOpen) unregisterModal(modalId);
    };
  }, [isOpen, modalId, zIndexLevel]);

  // Scroll reset when opening
  useEffect(() => {
    if (!isOpen) return;
    const resetScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      el.style.scrollBehavior = "auto";
      el.scrollTop = 0;
      requestAnimationFrame(() => {
        el.scrollTop = 0;
        setTimeout(() => {
          el.style.scrollBehavior = "smooth";
        }, 10);
      });
    };
    resetScroll();
    [10, 50, 100, 200].forEach((d) => setTimeout(resetScroll, d));
  }, [isOpen]);

  // Keyboard handling and focus trap
  useEffect(() => {
    const pendingTasks: Array<ReturnType<typeof globalThis.setTimeout>> = [];
    const pendingRafs: number[] = [];

    const handleDocumentFocusIn = (e: FocusEvent) => {
      if (!isOpen || disableFocus) return;
      const wrapper = modalRef.current;
      const target = e.target;

      if (
        !wrapper ||
        !(target instanceof HTMLElement) ||
        wrapper.contains(target)
      ) {
        return;
      }

      requestAnimationFrame(() => {
        const currentActive = document.activeElement;
        if (
          currentActive instanceof HTMLElement &&
          wrapper.contains(currentActive)
        ) {
          return;
        }

        focusWrapper(wrapper, { preventScroll: true });
      });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && escapeToClose && !closeDisabled) {
        onCloseRef.current();
        return;
      }

      if (!isOpen) return;
      if (disableFocus) {
        // Modal sin interacción (ej. loading): bloquear Tab para que
        // no se pueda navegar a elementos detrás del overlay.
        if (e.key === "Tab") {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
        return;
      }
      const wrapper = modalRef.current;
      if (!wrapper) {
        // DOM del modal aún no está montado (animación de entrada):
        // bloquear Tab para que no navegue fuera durante la inicialización.
        if (e.key === "Tab") e.preventDefault();
        return;
      }

      const focusable = getFocusableElements(wrapper);
      const active = (document.activeElement as HTMLElement) || null;

      const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (arrowKeys.includes(e.key)) {
        if (active && wrapper.contains(active)) {
          const activeIndex = focusable.indexOf(active);
          if (
            (e.key === "ArrowUp" || e.key === "ArrowLeft") &&
            activeIndex === 0
          ) {
            e.preventDefault();
            e.stopPropagation();
            if (focusable.length > 1) focusable.at(-1)?.focus();
            else active.focus();
            return;
          }
          if (
            (e.key === "ArrowDown" || e.key === "ArrowRight") &&
            activeIndex === focusable.length - 1
          ) {
            e.preventDefault();
            e.stopPropagation();
            if (focusable.length > 1) focusable[0].focus();
            else active.focus();
            return;
          }
          requestAnimationFrame(() => {
            const currentActive = document.activeElement as HTMLElement;
            if (!currentActive || !wrapper.contains(currentActive)) {
              if (activeIndex !== -1 && focusable[activeIndex])
                focusable[activeIndex].focus();
              else if (focusable.length > 0) focusable[0].focus();
              else wrapper.focus();
            }
          });
        } else {
          e.preventDefault();
          if (focusable.length > 0) {
            if (e.key === "ArrowUp" || e.key === "ArrowLeft")
              focusable.at(-1)?.focus();
            else focusable[0].focus();
          } else {
            wrapper.focus();
          }
        }
        return;
      }

      if (e.key !== "Tab") return;
      if (focusable.length === 0) {
        e.preventDefault();
        wrapper.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable.at(-1);
      const isShift = e.shiftKey;

      if (!first || !last) {
        e.preventDefault();
        wrapper.focus();
        return;
      }

      if (!active || !wrapper.contains(active)) {
        e.preventDefault();
        (isShift ? last : first).focus();
        return;
      }

      const activeIndex = focusable.indexOf(active);
      if (
        !isShift &&
        (active === last || activeIndex === focusable.length - 1)
      ) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (isShift) {
        e.preventDefault();
        if (active === first || active === wrapper || activeIndex === 0)
          last.focus();
        else if (activeIndex > 0) focusable[activeIndex - 1].focus();
        else last.focus();
      }
    };

    if (isOpen && !disableFocus) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("focusin", handleDocumentFocusIn, true);
    } else if (isOpen && disableFocus) {
      // Quitar foco del elemento activo para que nada quede enfocado
      // mientras el modal de carga está abierto.
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      // Capture para interceptar Tab antes que el navegador mueva el foco.
      document.addEventListener("keydown", handleKeyDown, true);
    }

    return () => {
      pendingTasks.forEach((task) => globalThis.clearTimeout(task));
      pendingRafs.forEach((raf) => cancelAnimationFrame(raf));
      if (disableFocus) {
        document.removeEventListener("keydown", handleKeyDown, true);
      } else {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("focusin", handleDocumentFocusIn, true);
      }
    };
  }, [
    isOpen,
    closeDisabled,
    escapeToClose,
    disableFocus,
    ariaLabelledBy,
  ]);

  // Sin animación: renderizar directo desde isOpen (sin delay de useEffect)
  if (!animated && !isOpen) return null;
  // Con animación: usar mounted para controlar enter/exit transitions
  if (animated && !mounted) return null;

  const contentClass = [
    "relative flex flex-col items-center justify-start",
    whitoutBackground
      ? "bg-transparent"
      : [
          "min-w-[320px] w-[95vw] max-w-[95vw] max-h-[90vh]",
          "overflow-y-auto scroll-smooth",
          "md:max-w-[1000px]",
        ].join(" "),
    props.className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Portal>
      {/* Backdrop */}
      <div
        style={{ zIndex: assignedZIndex }}
        className={[
          "fixed inset-0 bg-onpe-blue",
          animated ? "transition-opacity duration-200" : "",
          animated ? (visible ? "opacity-80" : "opacity-0") : "opacity-80",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Container */}
      <div
        style={{ zIndex: assignedZIndex + 10 }}
        className={[
          "fixed top-0 w-full h-screen grid",
          alignTop ? "place-items-start pt-8" : "place-items-center",
          animated ? "transition-all duration-200" : "",
          animated
            ? visible
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-[0.2] scale-95 -translate-y-5"
            : "opacity-100 scale-100 translate-y-0",
        ].join(" ")}
      >
        <div className="relative grid place-items-center">
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            {...(existTabIndex && { tabIndex: disableFocus ? -1 : 0 })}
            role="dialog"
            aria-modal="true"
            aria-labelledby={props["aria-labelledby"]}
            aria-describedby={props["aria-describedby"]}
            aria-label={props["aria-label"]}
          >
            <span
              tabIndex={disableFocus ? -1 : 0}
              aria-hidden="true"
              {...{ [FOCUS_GUARD_ATTRIBUTE]: "start" }}
              style={focusGuardStyle}
              onFocus={handleStartFocusGuard}
            />
            <div ref={contentRef} className={contentClass}>
              {isOpen ? children : cachedChildren}
            </div>
            {closeButton && (
              <button
                onClick={onClose}
                className="absolute top-2.5 right-2.5 text-onpe-red cursor-pointer w-4 h-4 border-none bg-transparent p-0 md:w-6 md:h-6"
                aria-label="Cerrar"
                type="button"
              >
                <IconCloseRadius aria-hidden="true" className="w-full h-full" />
              </button>
            )}
            <span
              tabIndex={disableFocus ? -1 : 0}
              aria-hidden="true"
              {...{ [FOCUS_GUARD_ATTRIBUTE]: "end" }}
              style={focusGuardStyle}
              onFocus={handleEndFocusGuard}
            />
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
