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
    
    // Leer todos los archivos CSS de componentes
    const componentCssFiles = [];
    
    // Buscar todos los archivos .css en src/components
    const componentsDir = './src/components';
    if (fs.existsSync(componentsDir)) {
      const readDir = (dir) => {
        const items = fs.readdirSync(dir);
        items.forEach(item => {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            readDir(fullPath);
          } else if (item.endsWith('.css')) {
            componentCssFiles.push(fs.readFileSync(fullPath, 'utf8'));
            console.log(`📄 Incluyendo CSS: ${fullPath}`);
          }
        });
      };
      readDir(componentsDir);
    }
    
    // Combinar todos los archivos CSS
    const allCss = cssFile + '\n\n' + componentCssFiles.join('\n\n');
    
    // Generar CSS compilado SIN Tailwind para preservar variables CSS
    // Solo usar PostCSS básico para mantener las variables intactas
    const result = await postcss([
      // Sin Tailwind para preservar variables CSS
    ]).process(allCss, {
      from: './src/styles.css',
      to: './dist/index.css',
    });
    
    // Escribir archivo CSS compilado
    fs.writeFileSync('./dist/index.css', result.css);
    
    console.log('✅ CSS compilado generado exitosamente:');
    console.log(`   📁 dist/index.css (incluye ${componentCssFiles.length + 1} archivos CSS)`);
    console.log('   🚀 Listo para importar sin conflictos con CSP');
    
  } catch (error) {
    console.error('❌ Error generando CSS:', error);
    process.exit(1);
  }
};

// Ejecutar si se llama directamente
buildCSS();

export default buildCSS;

