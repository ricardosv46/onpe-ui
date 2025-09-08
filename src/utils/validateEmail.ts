/**
 * Valida si un email tiene formato válido
 * @param email - Email a validar
 * @returns true si es válido, false si no
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida si un DNI peruano es válido
 * @param dni - DNI a validar
 * @returns true si es válido, false si no
 */
export function validateDNI(dni: string): boolean {
  // DNI peruano debe tener 8 dígitos
  const dniRegex = /^\d{8}$/;
  return dniRegex.test(dni);
}
