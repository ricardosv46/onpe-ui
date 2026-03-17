import { useModalGlobalStore } from "../store/modalGlobal/useModalGlobalStore";
import { useModalLoadingStore } from "../store/modalGlobal/useModalLoadingStore";
import type { ModalPayload, ModalResult } from "../store/modalGlobal/useModalGlobalStore";

/**
 * Open the global modal. Returns a promise that resolves to `true` if the user
 * confirmed, or `false` if they cancelled/closed.
 *
 * @example
 * const confirmed = await showGlobalModal({
 *   type: "question",
 *   title: "¿Eliminar votante?",
 *   message: "Esta acción no se puede deshacer.",
 *   buttonMode: "double",
 * });
 *
 * @example — with custom JSX content
 * await showGlobalModal({
 *   type: "error",
 *   title: "Error de sesión",
 *   content: <SesionExpiredDetails />,
 * });
 */
export const showGlobalModal = (payload: ModalPayload): Promise<boolean> =>
  useModalGlobalStore.getState().openModal(payload);

/**
 * Like `showGlobalModal` but resolves to `"confirm"`, `"cancel"`, or `"close"`,
 * letting you distinguish between the three ways a modal can be dismissed.
 *
 * @example
 * const result = await showGlobalModalWithClose({
 *   type: "warning",
 *   title: "Guardar cambios",
 *   buttonMode: "double",
 * });
 * if (result === "confirm") save();
 * if (result === "close")   navigateAway();
 */
export const showGlobalModalWithClose = (payload: ModalPayload): Promise<ModalResult> =>
  useModalGlobalStore.getState().openModalWithClose(payload);

/**
 * Programmatically close the global modal (resolves as cancelled).
 * Useful for layout/route-change handlers.
 *
 * ⚠️  Always check `isAlreadyHandled()` before calling this from a route handler
 * to avoid closing axios-controlled modals.
 */
export const closeGlobalModal = (): void =>
  useModalGlobalStore.getState().closeModal(false);

/** Returns true if the global modal is currently open. */
export const isGlobalModalOpen = (): boolean =>
  useModalGlobalStore.getState().isOpen;

/**
 * Returns true if the currently open modal was opened by an axios interceptor
 * (i.e. `alreadyHandled: true` was set). Use this to skip auto-close on
 * route changes.
 *
 * @example — in a Next.js layout
 * router.events.on("routeChangeStart", () => {
 *   if (isGlobalModalOpen() && !isAlreadyHandled()) {
 *     closeGlobalModal();
 *   }
 * });
 */
export const isAlreadyHandled = (): boolean =>
  useModalGlobalStore.getState().payload?.alreadyHandled ?? false;

// ---------------------------------------------------------------------------
// Loading helpers
// ---------------------------------------------------------------------------

/**
 * Show the global loading modal.
 *
 * @example
 * showGlobalLoading("Guardando cambios...");
 * await api.save(data);
 * closeGlobalLoading();
 */
export const showGlobalLoading = (message?: string): void =>
  useModalLoadingStore.getState().openLoading(message);

/** Close the global loading modal. */
export const closeGlobalLoading = (): void =>
  useModalLoadingStore.getState().closeLoading();

/** Returns true if the global loading modal is currently visible. */
export const isGlobalLoadingOpen = (): boolean =>
  useModalLoadingStore.getState().isOpen;

// ---------------------------------------------------------------------------
// Loading percentage helpers
// ---------------------------------------------------------------------------

import { useModalLoadingPercentageStore } from "../store/modalGlobal/useModalLoadingPercentageStore";

/**
 * Show the global loading modal with a percentage progress bar.
 *
 * @example
 * showGlobalLoadingPercentage("Subiendo archivo...");
 * for (const chunk of chunks) {
 *   await upload(chunk);
 *   updateGlobalLoadingPercentage(Math.round((i / chunks.length) * 100));
 * }
 * closeGlobalLoadingPercentage();
 */
/**
 * Abre el modal de loading con porcentaje. Retorna un sessionId para evitar
 * interferencias si se abre otro modal del mismo tipo antes de cerrar el actual.
 * Pasar el sessionId a updateGlobalLoadingPercentage y closeGlobalLoadingPercentage
 * garantiza que solo la instancia activa pueda actualizar o cerrar el modal.
 */
export const showGlobalLoadingPercentage = (message?: string): number =>
  useModalLoadingPercentageStore.getState().openLoadingPercentage(message);

/** Update the percentage value (0–100). Si se pasa sessionId y no coincide con la sesión activa, se ignora. */
export const updateGlobalLoadingPercentage = (percentage: number, sessionId?: number): void =>
  useModalLoadingPercentageStore.getState().updatePercentage(percentage, sessionId);

/** Close the global loading percentage modal. Si se pasa sessionId y no coincide con la sesión activa, se ignora. */
export const closeGlobalLoadingPercentage = (sessionId?: number): void =>
  useModalLoadingPercentageStore.getState().closeLoadingPercentage(sessionId);

/** Returns true if the global loading percentage modal is currently visible. */
export const isGlobalLoadingPercentageOpen = (): boolean =>
  useModalLoadingPercentageStore.getState().isOpen;
