import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import { readFileSync } from 'fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

const buildConfig = (input, outputName) => ({
  input,
  output: [
    {
      file: `dist/${outputName}.js`,
      format: 'esm',
      sourcemap: true,
    },
    {
      file: `dist/${outputName}.esm.js`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    postcss({
      extract: true, // Generar archivos CSS externos para CSP
      modules: false,
      autoModules: false,
    }),
  ],
  external: ['react', 'react-dom'],
});

const dtsConfig = (input, outputName) => ({
  input: `dist/${outputName}.d.ts`,
  output: [{ file: `dist/${outputName}.d.ts`, format: 'esm' }],
  plugins: [dts()],
  external: [/\.css$/],
});

// CSS standalone build configuration - REMOVIDO
// El CSS ahora se genera por separado usando el script build-css.js

export default [
  // Build main index
  buildConfig('src/index.ts', 'index'),
  // Build components
  buildConfig('src/components.ts', 'components'),
  // Build icons
  buildConfig('src/icons.ts', 'icons'),
  // Generate type definitions
  dtsConfig('src/index.ts', 'index'),
  dtsConfig('src/components.ts', 'components'),
  dtsConfig('src/icons.ts', 'icons'),
];
