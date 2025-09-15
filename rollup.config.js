import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
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
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
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
  // Build icons by category
  buildConfig('src/icons-actions.ts', 'icons-actions'),
  buildConfig('src/icons-browsers.ts', 'icons-browsers'),
  buildConfig('src/icons-onpe.ts', 'icons-onpe'),
  buildConfig('src/icons-os.ts', 'icons-os'),
  // Generate type definitions
  dtsConfig('src/index.ts', 'index'),
  dtsConfig('src/components.ts', 'components'),
  dtsConfig('src/icons.ts', 'icons'),
  dtsConfig('src/icons-actions.ts', 'icons-actions'),
  dtsConfig('src/icons-browsers.ts', 'icons-browsers'),
  dtsConfig('src/icons-onpe.ts', 'icons-onpe'),
  dtsConfig('src/icons-os.ts', 'icons-os'),
];
