/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: 'onpe-', // Prefijo único para todas las clases
  theme: {
    extend: {
      colors: {
        'onpe-ui-blue': 'var(--onpe-ui-blue)',
        'onpe-ui-skyblue': 'var(--onpe-ui-skyblue)',
        'onpe-ui-skyblue-light': 'var(--onpe-ui-skyblue-light)',
        'onpe-ui-yellow': 'var(--onpe-ui-yellow)',
        'onpe-ui-light-skyblue': 'var(--onpe-ui-light-skyblue)',
        'onpe-ui-gray': 'var(--onpe-ui-gray)',
        'onpe-ui-gray-light': 'var(--onpe-ui-gray-light)',
        'onpe-ui-gray-extra-light': 'var(--onpe-ui-gray-extra-light)',
        'onpe-ui-red': 'var(--onpe-ui-red)',
        'onpe-ui-dark-gray': 'var(--onpe-ui-dark-gray)',
        'onpe-ui-green': 'var(--onpe-ui-green)',
        'onpe-ui-yellow-light': 'var(--onpe-ui-yellow-light)',
      },
      animation: {
        'fast-blink': 'fastBlink 0.8s ease-in-out infinite',
      },
      keyframes: {
        fastBlink: {
          '0%': { opacity: '1' },
          '25%': { opacity: '0.8' },
          '50%': { opacity: '0.4' },
          '75%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  // Importante: No incluir base, components, utilities para evitar conflictos
  corePlugins: {
    preflight: false, // Deshabilitar reset de Tailwind
  },
}


