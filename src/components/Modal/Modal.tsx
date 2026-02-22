import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { Portal } from "../Portal/Portal";
import { IconCloseRadius } from "../../icons/Actions/IconCloseRadius";

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

export const Modal = ({
  isOpen,
  onClose,
  children,
  whitoutBackground = false,
  closeButton = false,
  closeDisabled = false,
  escapeToClose = true,
  disableFocus = false,
  disableFocusRestore = false,
  existTabIndex = true,
  zIndexLevel = 100,
  onCloseComplete,
  overlayColor: _overlayColor = "blue",
  ...props
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // CSS animation state (replaces framer-motion AnimatePresence)
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

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
  }, [isOpen, onCloseComplete]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
    const isElementVisible = (element: HTMLElement) => {
      const style = window.getComputedStyle(element);
      return (
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        element.offsetParent !== null
      );
    };

    const getFocusableElements = (wrapper: HTMLElement) => {
      const selector = [
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

      let focusable = Array.from(
        wrapper.querySelectorAll<HTMLElement>(selector)
      ).filter((el) => isElementVisible(el) && el.tabIndex !== -1);

      if (wrapper.tabIndex >= 0) {
        focusable = [wrapper, ...focusable];
      }
      return focusable;
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (!isOpen || disableFocus) return;
      const wrapper = modalRef.current;
      if (!wrapper) return;
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (relatedTarget && !wrapper.contains(relatedTarget)) {
        setTimeout(() => {
          const currentActive = document.activeElement as HTMLElement;
          if (!currentActive || !wrapper.contains(currentActive)) {
            const focusable = getFocusableElements(wrapper);
            if (focusable.length > 0) {
              focusable[focusable.length - 1].focus();
            } else {
              wrapper.focus();
            }
          }
        }, 0);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && escapeToClose && !closeDisabled) {
        onClose();
        return;
      }

      if (!isOpen || disableFocus) return;
      const wrapper = modalRef.current;
      if (!wrapper) return;

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
            if (focusable.length > 1) focusable[focusable.length - 1].focus();
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
              focusable[focusable.length - 1].focus();
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
      const last = focusable[focusable.length - 1];
      const isShift = e.shiftKey;

      if (!active || !wrapper.contains(active)) {
        e.preventDefault();
        (isShift ? last : first).focus();
        return;
      }

      const activeIndex = focusable.indexOf(active);
      if (!isShift && (active === last || activeIndex === focusable.length - 1)) {
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
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.addEventListener("keydown", handleKeyDown);
      const wrapper = modalRef.current;
      if (wrapper) wrapper.addEventListener("focusout", handleFocusOut);
    } else if (isOpen && disableFocus) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const wrapper = modalRef.current;
      if (wrapper) wrapper.removeEventListener("focusout", handleFocusOut);
      if (!disableFocus && !disableFocusRestore && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose, closeDisabled, escapeToClose, disableFocus, disableFocusRestore]);

  if (!mounted) return null;

  const contentClass = [
    "relative flex flex-col items-center justify-start",
    whitoutBackground
      ? "bg-transparent"
      : [
          "bg-white",
          "pt-[25px] px-4 pb-[50px]",
          "min-w-[320px] w-[95vw] max-w-[95vw] max-h-[90vh]",
          "overflow-y-auto scroll-smooth",
          "md:pt-[35px] md:px-8 md:pb-[54px] md:max-w-[1000px]",
        ].join(" "),
    props.className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Portal>
      {/* Backdrop */}
      <div
        style={{ zIndex: zIndexLevel }}
        className={[
          "fixed inset-0 bg-onpe-blue transition-opacity duration-200",
          visible ? "opacity-80" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Container */}
      <div
        style={{ zIndex: zIndexLevel + 10 }}
        className={[
          "fixed top-0 w-full h-screen grid place-items-center",
          "transition-all duration-200",
          visible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-[0.2] scale-95 -translate-y-5",
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
            <div ref={contentRef} className={contentClass}>
              {cachedChildren}
            </div>
            {closeButton && (
              <button
                onClick={onClose}
                className="absolute top-2.5 right-2.5 text-onpe-red cursor-pointer w-4 h-4 border-none bg-transparent p-0 md:w-8 md:h-8"
                aria-label="Cerrar"
                type="button"
              >
                <IconCloseRadius aria-hidden="true" className="w-full h-full" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
