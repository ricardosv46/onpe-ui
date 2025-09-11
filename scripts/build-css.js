#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

/**
 * Script para generar CSS compilado con prefijos para producción
 * Este CSS se puede importar sin conflictos en proyectos host
 */

const buildCSS = async () => {
  console.log('🎨 Generando CSS compilado para producción...');
  
  // Configuración sin prefijos para producción
  const configWithPrefix = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    // prefix: 'onpe-', // Sin prefijos para que funcionen las clases normales
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
    corePlugins: {
      preflight: false,
    },
  };

  try {
    // Leer el archivo de estilos base
    const cssFile = fs.readFileSync('./src/styles.css', 'utf8');
    
    // Generar CSS compilado con prefijos
    const result = await postcss([
      tailwindcss(configWithPrefix),
    ]).process(cssFile, {
      from: './src/styles.css',
      to: './dist/index.css',
    });
    
    // Escribir archivo CSS compilado
    fs.writeFileSync('./dist/index.css', result.css);
    
    console.log('✅ CSS compilado generado exitosamente:');
    console.log('   📁 dist/index.css (con prefijos onpe-)');
    console.log('   🚀 Listo para importar sin conflictos');
    
  } catch (error) {
    console.error('❌ Error generando CSS:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
buildCSS();

export default buildCSS;

