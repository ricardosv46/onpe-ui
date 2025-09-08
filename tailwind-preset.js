/* Preset para Tailwind CSS v4 */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'onpe-ui-blue': 'var(--color-onpe-ui-blue)',
        'onpe-ui-skyblue': 'var(--color-onpe-ui-skyblue)',
        'onpe-ui-skyblue-light': 'var(--color-onpe-ui-skyblue-light)',
        'onpe-ui-yellow': 'var(--color-onpe-ui-yellow)',
        'onpe-ui-light-skyblue': 'var(--color-onpe-ui-light-skyblue)',
        'onpe-ui-gray': 'var(--color-onpe-ui-gray)',
        'onpe-ui-gray-light': 'var(--color-onpe-ui-gray-light)',
        'onpe-ui-gray-extra-light': 'var(--color-onpe-ui-gray-extra-light)',
        'onpe-ui-red': 'var(--color-onpe-ui-red)',
        'onpe-ui-dark-gray': 'var(--color-onpe-ui-dark-gray)',
        'onpe-ui-green': 'var(--color-onpe-ui-green)',
        'onpe-ui-yellow-light': 'var(--color-onpe-ui-yellow-light)',
      },
    },
  },
  corePlugins: {
    preflight: false, // Deshabilitamos preflight para evitar conflictos
  },
}
