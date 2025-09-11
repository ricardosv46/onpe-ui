/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // prefix: 'onpe-', // Sin prefijo para que funcionen las clases normales
  theme: {
    extend: {
      colors: {
        'onpe-ui-blue': '#003770',
        'onpe-ui-skyblue': '#0073cf',
        'onpe-ui-skyblue-light': '#69b2e8',
        'onpe-ui-yellow': '#ffb81c',
        'onpe-ui-light-skyblue': '#aaeff6',
        'onpe-ui-gray': '#bcbcbc',
        'onpe-ui-gray-light': '#bdbdbd',
        'onpe-ui-gray-extra-light': '#f2f2f2',
        'onpe-ui-red': '#e3002b',
        'onpe-ui-dark-gray': '#4f4f4f',
        'onpe-ui-green': '#76bd43',
        'onpe-ui-yellow-light': '#fff1d2',
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
  corePlugins: {
    preflight: false, // Deshabilitar reset de Tailwind
  },
}
