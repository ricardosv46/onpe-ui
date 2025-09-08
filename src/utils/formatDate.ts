/**
 * Formatea una fecha según el formato especificado
 * @param date - Fecha a formatear
 * @param format - Formato deseado ('short', 'long', 'time')
 * @returns Fecha formateada
 */
export function formatDate(date: Date | string, format: "short" | "long" | "time" = "short"): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "Fecha inválida";
  }

  const options: Intl.DateTimeFormatOptions = {
    short: {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    },
    time: {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    },
  }[format] as Intl.DateTimeFormatOptions;

  return new Intl.DateTimeFormat("es-PE", options).format(dateObj);
}
