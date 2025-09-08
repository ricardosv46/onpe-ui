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
      extract: true,
      minimize: true,
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

// CSS standalone build configuration
const cssStandaloneConfig = {
  input: 'src/styles.css',
  output: {
    file: 'dist/index.css',
    format: 'es',
  },
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
  ],
};

export default [
  // Build main index
  buildConfig('src/index.ts', 'index'),
  // Build components
  buildConfig('src/components.ts', 'components'),
  // Build hooks
  buildConfig('src/hooks.ts', 'hooks'),
  // Build utils
  buildConfig('src/utils.ts', 'utils'),
  // Build lib
  buildConfig('src/lib.ts', 'lib'),
  // Build CLI
  buildConfig('src/cli.ts', 'cli'),
  
  // Build standalone CSS
  cssStandaloneConfig,
  
  // Generate type definitions
  dtsConfig('src/index.ts', 'index'),
  dtsConfig('src/components.ts', 'components'),
  dtsConfig('src/hooks.ts', 'hooks'),
  dtsConfig('src/utils.ts', 'utils'),
  dtsConfig('src/lib.ts', 'lib'),
  dtsConfig('src/cli.ts', 'cli'),
];
