/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
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
        'onpe-ui-yellow-light': '#FFF1D2',
      },
    },
  },
  corePlugins: {
    preflight: false, // Deshabilitamos preflight para evitar conflictos
  },
  plugins: [],
}
