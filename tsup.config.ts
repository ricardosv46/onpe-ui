import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    components: "src/components/index.ts",
    icons: "src/icons/index.ts",
    hooks: "src/hooks/index.ts",
    modal: "src/modal/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "zustand", "socket.io-client"],
  treeshake: true,
});
