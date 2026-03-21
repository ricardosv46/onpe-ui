import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**"],
      exclude: [
        // Barrel exports — solo re-exportan, no hay lógica testeable
        "src/**/index.ts",
        // Storybook — no son código de producción
        "src/**/*.stories.tsx",
        // Setup de tests y specs
        "src/__tests__/**",
        "src/**/*.spec.ts",
        "src/**/*.spec.tsx",
      ],
    },
  },
});
