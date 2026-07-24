/** Une clases truthy (estilo classnames ligero). */
export const classNames = (classes: Array<string | false | null | undefined>): string =>
  classes.filter(Boolean).join(" ");
