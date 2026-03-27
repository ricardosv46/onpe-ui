import { useEffect } from "react";

let lockCount = 0;
let savedStyles: {
  htmlOverflow?: string;
  bodyOverflow?: string;
  bodyPaddingRight?: string;
  htmlTouchAction?: string;
  bodyTouchAction?: string;
} | null = null;

const getScrollbarWidth = () => {
  return globalThis.window.innerWidth - document.documentElement.clientWidth;
};

const lockBodyScroll = () => {
  if (lockCount === 0) {
    const html = document.documentElement;
    const body = document.body;

    savedStyles = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      htmlTouchAction: html.style.touchAction,
      bodyTouchAction: body.style.touchAction,
    };

    const scrollbarWidth = getScrollbarWidth();
    if (scrollbarWidth > 0) {
      const paddingRight = getComputedStyle(body).paddingRight || "0";
      const currentPadding = Number.parseInt(paddingRight, 10) || 0;
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    // Ayuda a evitar overscroll/bounce en Safari iOS.
    html.style.touchAction = "none";
    body.style.touchAction = "none";
  }

  lockCount++;
};

const unlockBodyScroll = () => {
  if (lockCount <= 0) return;

  lockCount--;
  if (lockCount > 0) return;

  const html = document.documentElement;
  const body = document.body;

  if (savedStyles) {
    html.style.overflow = savedStyles.htmlOverflow ?? "";
    body.style.overflow = savedStyles.bodyOverflow ?? "";
    body.style.paddingRight = savedStyles.bodyPaddingRight ?? "";
    html.style.touchAction = savedStyles.htmlTouchAction ?? "";
    body.style.touchAction = savedStyles.bodyTouchAction ?? "";
  } else {
    html.style.overflow = "";
    body.style.overflow = "";
    body.style.paddingRight = "";
    html.style.touchAction = "";
    body.style.touchAction = "";
  }

  savedStyles = null;
};

export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    if (locked) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }

    unlockBodyScroll();
  }, [locked]);
};
