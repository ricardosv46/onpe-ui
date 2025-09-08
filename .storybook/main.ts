import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    // Configurar PostCSS para usar @tailwindcss/postcss
    if (config.css?.postcss) {
      config.css.postcss.plugins = [require("@tailwindcss/postcss"), require("autoprefixer")];
    } else {
      config.css = config.css || {};
      config.css.postcss = {
        plugins: [require("@tailwindcss/postcss"), require("autoprefixer")],
      };
    }

    return config;
  },
};

export default config;
