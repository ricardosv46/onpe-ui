/**
 * Utilidades para manejo de almacenamiento
 */
export class StorageManager {
  /**
   * Guarda un valor en localStorage
   */
  static setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }

  /**
   * Obtiene un valor de localStorage
   */
  static getItem<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return defaultValue || null;
    }
  }

  /**
   * Elimina un valor de localStorage
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }

  /**
   * Limpia todo el localStorage
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}
