import fs from 'fs-extra';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔨 Compilando CSS limpio para producción...');

const distDir = path.join(__dirname, '../dist');
fs.ensureDirSync(distDir);

// Crear un archivo CSS temporal solo con los estilos específicos de ONPE
const onpeOnlyCSS = `
/* Estilos ONPE UI - Solo colores y utilidades específicas */

/* Variables CSS con prefijo único */
:root {
  --onpe-ui-blue: #003770;
  --onpe-ui-skyblue: #0073cf;
  --onpe-ui-skyblue-light: #69b2e8;
  --onpe-ui-yellow: #ffb81c;
  --onpe-ui-light-skyblue: #aaeff6;
  --onpe-ui-gray: #bcbcbc;
  --onpe-ui-gray-light: #bdbdbd;
  --onpe-ui-gray-extra-light: #f2f2f2;
  --onpe-ui-red: #e3002b;
  --onpe-ui-dark-gray: #4f4f4f;
  --onpe-ui-green: #76bd43;
  --onpe-ui-yellow-light: #fff1d2;
}

/* Solo estilos específicos de componentes ONPE */
.onpe-bg-onpe-ui-blue { background-color: var(--onpe-ui-blue); }
.onpe-bg-onpe-ui-blue\\/30 { background-color: rgba(0, 55, 112, 0.3); }
.onpe-bg-onpe-ui-blue\\/80 { background-color: rgba(0, 55, 112, 0.8); }
.onpe-bg-onpe-ui-skyblue { background-color: var(--onpe-ui-skyblue); }
.onpe-bg-onpe-ui-skyblue-light { background-color: var(--onpe-ui-skyblue-light); }
.onpe-bg-onpe-ui-skyblue\\/15 { background-color: rgba(0, 115, 207, 0.15); }
.onpe-bg-onpe-ui-skyblue\\/30 { background-color: rgba(0, 115, 207, 0.3); }
.onpe-bg-onpe-ui-skyblue\\/80 { background-color: rgba(0, 115, 207, 0.8); }
.onpe-bg-onpe-ui-yellow { background-color: var(--onpe-ui-yellow); }
.onpe-bg-onpe-ui-yellow\\/30 { background-color: rgba(255, 184, 28, 0.3); }
.onpe-bg-onpe-ui-yellow\\/80 { background-color: rgba(255, 184, 28, 0.8); }
.onpe-bg-onpe-ui-yellow-light { background-color: var(--onpe-ui-yellow-light); }
.onpe-bg-onpe-ui-yellow-light\\/30 { background-color: rgba(255, 241, 210, 0.3); }
.onpe-bg-onpe-ui-yellow-light\\/75 { background-color: rgba(255, 241, 210, 0.75); }
.onpe-bg-onpe-ui-yellow-light\\/80 { background-color: rgba(255, 241, 210, 0.8); }
.onpe-bg-onpe-ui-light-skyblue { background-color: var(--onpe-ui-light-skyblue); }
.onpe-bg-onpe-ui-light-skyblue\\/30 { background-color: rgba(170, 239, 246, 0.3); }
.onpe-bg-onpe-ui-light-skyblue\\/80 { background-color: rgba(170, 239, 246, 0.8); }
.onpe-bg-onpe-ui-gray { background-color: var(--onpe-ui-gray); }
.onpe-bg-onpe-ui-gray\\/30 { background-color: rgba(188, 188, 188, 0.3); }
.onpe-bg-onpe-ui-gray\\/80 { background-color: rgba(188, 188, 188, 0.8); }
.onpe-bg-onpe-ui-gray-light { background-color: var(--onpe-ui-gray-light); }
.onpe-bg-onpe-ui-gray-light\\/30 { background-color: rgba(189, 189, 189, 0.3); }
.onpe-bg-onpe-ui-gray-light\\/80 { background-color: rgba(189, 189, 189, 0.8); }
.onpe-bg-onpe-ui-gray-extra-light { background-color: var(--onpe-ui-gray-extra-light); }
.onpe-bg-onpe-ui-gray-extra-light\\/30 { background-color: rgba(242, 242, 242, 0.3); }
.onpe-bg-onpe-ui-gray-extra-light\\/80 { background-color: rgba(242, 242, 242, 0.8); }
.onpe-bg-onpe-ui-red { background-color: var(--onpe-ui-red); }
.onpe-bg-onpe-ui-red\\/30 { background-color: rgba(227, 0, 43, 0.3); }
.onpe-bg-onpe-ui-red\\/80 { background-color: rgba(227, 0, 43, 0.8); }
.onpe-bg-onpe-ui-dark-gray { background-color: var(--onpe-ui-dark-gray); }
.onpe-bg-onpe-ui-dark-gray\\/30 { background-color: rgba(79, 79, 79, 0.3); }
.onpe-bg-onpe-ui-dark-gray\\/80 { background-color: rgba(79, 79, 79, 0.8); }
.onpe-bg-onpe-ui-green { background-color: var(--onpe-ui-green); }
.onpe-bg-onpe-ui-green\\/30 { background-color: rgba(118, 189, 67, 0.3); }
.onpe-bg-onpe-ui-green\\/80 { background-color: rgba(118, 189, 67, 0.8); }

.onpe-text-onpe-ui-blue { color: var(--onpe-ui-blue); }
.onpe-text-onpe-ui-skyblue { color: var(--onpe-ui-skyblue); }
.onpe-text-onpe-ui-yellow { color: var(--onpe-ui-yellow); }
.onpe-text-onpe-ui-gray { color: var(--onpe-ui-gray); }
.onpe-text-onpe-ui-gray-light { color: var(--onpe-ui-gray-light); }
.onpe-text-onpe-ui-red { color: var(--onpe-ui-red); }
.onpe-text-onpe-ui-dark-gray { color: var(--onpe-ui-dark-gray); }
.onpe-text-onpe-ui-green { color: var(--onpe-ui-green); }

.onpe-border-onpe-ui-blue { border-color: var(--onpe-ui-blue); }

/* Utilidades básicas necesarias */
.onpe-flex { display: flex; }
.onpe-inline-flex { display: inline-flex; }
.onpe-block { display: block; }
.onpe-hidden { display: none; }
.onpe-grid { display: grid; }

.onpe-flex-col { flex-direction: column; }
.onpe-flex-col-reverse { flex-direction: column-reverse; }
.onpe-flex-wrap { flex-wrap: wrap; }
.onpe-items-center { align-items: center; }
.onpe-justify-center { justify-content: center; }
.onpe-justify-between { justify-content: space-between; }
.onpe-justify-end { justify-content: flex-end; }

.onpe-h-10 { height: 2.5rem; }
.onpe-h-12 { height: 3rem; }
.onpe-h-14 { height: 3.5rem; }
.onpe-h-16 { height: 4rem; }
.onpe-h-20 { height: 5rem; }
.onpe-h-22 { height: 5.5rem; }
.onpe-h-\\[10px\\] { height: 10px; }
.onpe-h-\\[32px\\] { height: 32px; }
.onpe-h-\\[46px\\] { height: 46px; }
.onpe-h-\\[48px\\] { height: 48px; }
.onpe-h-\\[93px\\] { height: 93px; }
.onpe-h-screen { height: 100vh; }
.onpe-max-h-\\[90vh\\] { max-height: 90vh; }
.onpe-min-h-screen { min-height: 100vh; }

.onpe-w-4 { width: 1rem; }
.onpe-w-6 { width: 1.5rem; }
.onpe-w-8 { width: 2rem; }
.onpe-w-12 { width: 3rem; }
.onpe-w-16 { width: 4rem; }
.onpe-w-22 { width: 5.5rem; }
.onpe-w-\\[10px\\] { width: 10px; }
.onpe-w-\\[32px\\] { width: 32px; }
.onpe-w-\\[48px\\] { width: 48px; }
.onpe-w-\\[98vw\\] { width: 98vw; }
.onpe-w-\\[200px\\] { width: 200px; }
.onpe-w-\\[320px\\] { width: 320px; }
.onpe-w-\\[500px\\] { width: 500px; }
.onpe-w-\\[576px\\] { width: 576px; }
.onpe-w-\\[680px\\] { width: 680px; }
.onpe-w-\\[1024px\\] { width: 1024px; }
.onpe-w-\\[1400px\\] { width: 1400px; }
.onpe-w-full { width: 100%; }
.onpe-min-w-\\[200px\\] { min-width: 200px; }
.onpe-min-w-\\[320px\\] { min-width: 320px; }
.onpe-min-w-full { min-width: 100%; }
.onpe-max-w-\\[95vw\\] { max-width: 95vw; }
.onpe-max-w-\\[200px\\] { max-width: 200px; }
.onpe-max-w-\\[680px\\] { max-width: 680px; }
.onpe-max-w-\\[1400px\\] { max-width: 1400px; }
.onpe-max-w-full { max-width: 100%; }

.onpe-text-white { color: white; }
.onpe-text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.onpe-text-base { font-size: 1rem; line-height: 1.5rem; }
.onpe-text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.onpe-text-2xl { font-size: 1.5rem; line-height: 2rem; }
.onpe-text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
.onpe-text-4xl { font-size: 2.25rem; line-height: 2.5rem; }

.onpe-font-semibold { font-weight: 600; }
.onpe-font-bold { font-weight: 700; }

.onpe-cursor-pointer { cursor: pointer; }
.onpe-cursor-not-allowed { cursor: not-allowed; }

.onpe-text-center { text-align: center; }
.onpe-text-left { text-align: left; }

.onpe-opacity-50 { opacity: 0.5; }
.onpe-opacity-100 { opacity: 1; }

.onpe-transition-all { transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.onpe-duration-300 { transition-duration: 300ms; }
.onpe-ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }

.onpe-p-2 { padding: 0.5rem; }
.onpe-p-3 { padding: 0.75rem; }
.onpe-p-4 { padding: 1rem; }
.onpe-p-6 { padding: 1.5rem; }
.onpe-p-8 { padding: 2rem; }
.onpe-p-\\[7px\\] { padding: 7px; }
.onpe-px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
.onpe-px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.onpe-px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.onpe-px-4 { padding-left: 1rem; padding-right: 1rem; }
.onpe-px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
.onpe-px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.onpe-px-8 { padding-left: 2rem; padding-right: 2rem; }
.onpe-px-12 { padding-left: 3rem; padding-right: 3rem; }
.onpe-py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.onpe-py-1\\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
.onpe-py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.onpe-py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.onpe-py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.onpe-py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.onpe-py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
.onpe-py-14 { padding-top: 3.5rem; padding-bottom: 3.5rem; }
.onpe-py-16 { padding-top: 4rem; padding-bottom: 4rem; }
.onpe-pt-3 { padding-top: 0.75rem; }
.onpe-pt-4 { padding-top: 1rem; }
.onpe-pt-5 { padding-top: 1.25rem; }
.onpe-pt-10 { padding-top: 2.5rem; }
.onpe-pt-\\[15px\\] { padding-top: 15px; }
.onpe-pb-2 { padding-bottom: 0.5rem; }
.onpe-pb-6 { padding-bottom: 1.5rem; }
.onpe-pb-8 { padding-bottom: 2rem; }
.onpe-pb-\\[18px\\] { padding-bottom: 18px; }
.onpe-pb-24\\.5 { padding-bottom: 6.125rem; }

.onpe-mt-1 { margin-top: 0.25rem; }
.onpe-mt-2 { margin-top: 0.5rem; }
.onpe-mt-3 { margin-top: 0.75rem; }
.onpe-mt-4 { margin-top: 1rem; }
.onpe-mt-5 { margin-top: 1.25rem; }
.onpe-mt-6 { margin-top: 1.5rem; }
.onpe-mt-7 { margin-top: 1.75rem; }
.onpe-mt-10 { margin-top: 2.5rem; }
.onpe-mt-11 { margin-top: 2.75rem; }
.onpe-mt-16 { margin-top: 4rem; }
.onpe-mt-20 { margin-top: 5rem; }
.onpe-mr-2 { margin-right: 0.5rem; }
.onpe-mb-1 { margin-bottom: 0.25rem; }
.onpe-mb-2 { margin-bottom: 0.5rem; }
.onpe-mb-3 { margin-bottom: 0.75rem; }
.onpe-mb-4 { margin-bottom: 1rem; }
.onpe-mb-6 { margin-bottom: 1.5rem; }
.onpe-mb-8 { margin-bottom: 2rem; }
.onpe-ml-1 { margin-left: 0.25rem; }
.onpe-mx-auto { margin-left: auto; margin-right: auto; }

.onpe-gap-2 { gap: 0.5rem; }
.onpe-gap-4 { gap: 1rem; }
.onpe-gap-5 { gap: 1.25rem; }
.onpe-gap-6 { gap: 1.5rem; }
.onpe-gap-8 { gap: 2rem; }
.onpe-gap-12 { gap: 3rem; }

.onpe-rounded { border-radius: 0.25rem; }
.onpe-rounded-md { border-radius: 0.375rem; }
.onpe-rounded-lg { border-radius: 0.5rem; }
.onpe-rounded-full { border-radius: 9999px; }

.onpe-border { border-width: 1px; }
.onpe-border-2 { border-width: 2px; }
.onpe-border-b { border-bottom-width: 1px; }
.onpe-border-b-2 { border-bottom-width: 2px; }

.onpe-relative { position: relative; }
.onpe-absolute { position: absolute; }
.onpe-fixed { position: fixed; }
.onpe-static { position: static; }

.onpe-inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.onpe-top-0 { top: 0; }
.onpe-top-4 { top: 1rem; }
.onpe-right-0 { right: 0; }
.onpe-right-4 { right: 1rem; }
.onpe-bottom-0 { bottom: 0; }

.onpe-z-10 { z-index: 10; }
.onpe-z-20 { z-index: 20; }
.onpe-z-30 { z-index: 30; }
.onpe-z-50 { z-index: 50; }
.onpe-z-100 { z-index: 100; }
.onpe--z-10 { z-index: -10; }

.onpe-overflow-x-auto { overflow-x: auto; }
.onpe-overflow-y-auto { overflow-y: auto; }

.onpe-whitespace-nowrap { white-space: nowrap; }
.onpe-uppercase { text-transform: uppercase; }

/* Hover states */
.onpe-hover\\:bg-onpe-ui-blue\\/30:hover { background-color: rgba(0, 55, 112, 0.3); }
.onpe-hover\\:bg-onpe-ui-blue\\/80:hover { background-color: rgba(0, 55, 112, 0.8); }
.onpe-hover\\:bg-onpe-ui-gray\\/80:hover { background-color: rgba(188, 188, 188, 0.8); }
.onpe-hover\\:bg-onpe-ui-gray\\/30:hover { background-color: rgba(188, 188, 188, 0.3); }

/* Disabled states */
.onpe-disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
.onpe-disabled\\:bg-onpe-ui-gray:disabled { background-color: var(--onpe-ui-gray); }
.onpe-disabled\\:opacity-50:disabled { opacity: 0.5; }
.onpe-disabled\\:hover\\:bg-onpe-ui-gray:disabled:hover { background-color: var(--onpe-ui-gray); }

/* Animaciones */
@keyframes onpe-fastBlink {
  0% { opacity: 1; }
  25% { opacity: 0.8; }
  50% { opacity: 0.4; }
  75% { opacity: 0.8; }
  100% { opacity: 1; }
}

.onpe-fast-blink { animation: onpe-fastBlink 0.8s ease-in-out infinite; }

/* Responsive */
@media (min-width: 640px) {
  .onpe-sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
}

@media (min-width: 768px) {
  .onpe-md\\:block { display: block; }
  .onpe-md\\:hidden { display: none; }
  .onpe-md\\:gap-12 { gap: 3rem; }
  .onpe-md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .onpe-md\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .onpe-md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .onpe-md\\:h-\\[48px\\] { height: 48px; }
  .onpe-md\\:mt-20 { margin-top: 5rem; }
  .onpe-md\\:py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .onpe-md\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .onpe-md\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .onpe-md\\:text-\\[64px\\] { font-size: 64px; }
  .onpe-md\\:w-\\[48px\\] { width: 48px; }
  .onpe-md\\:w-\\[500px\\] { width: 500px; }
}

@media (min-width: 1024px) {
  .onpe-lg\\:block { display: block; }
  .onpe-lg\\:hidden { display: none; }
  .onpe-lg\\:flex-row { flex-direction: row; }
  .onpe-lg\\:gap-8 { gap: 2rem; }
  .onpe-lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .onpe-lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .onpe-lg\\:h-\\[46px\\] { height: 46px; }
  .onpe-lg\\:max-w-\\[576px\\] { max-width: 576px; }
  .onpe-lg\\:mt-16 { margin-top: 4rem; }
  .onpe-lg\\:mt-20 { margin-top: 5rem; }
  .onpe-lg\\:mt-4 { margin-top: 1rem; }
  .onpe-lg\\:pb-\\[18px\\] { padding-bottom: 18px; }
  .onpe-lg\\:pt-\\[15px\\] { padding-top: 15px; }
  .onpe-lg\\:px-5 { padding-left: 1.25rem; padding-right: 1.25rem; }
  .onpe-lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
  .onpe-lg\\:py-16 { padding-top: 4rem; padding-bottom: 4rem; }
  .onpe-lg\\:text-2xl { font-size: 1.5rem; line-height: 2rem; }
  .onpe-lg\\:text-center { text-align: center; }
  .onpe-lg\\:text-lg { font-size: 1.125rem; line-height: 1.75rem; }
  .onpe-lg\\:w-\\[1024px\\] { width: 1024px; }
  .onpe-lg\\:w-\\[200px\\] { width: 200px; }
}

@media (min-width: 1280px) {
  .onpe-xl\\:px-12 { padding-left: 3rem; padding-right: 3rem; }
}

/* Estilos específicos para botones ONPE */
.onpe-button-onpe {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  transition: all 300ms ease-in-out;
  min-width: 200px;
}

.onpe-button-onpe:disabled {
  cursor: not-allowed;
  background-color: var(--onpe-ui-gray);
}

.onpe-button-onpe:disabled:hover {
  background-color: var(--onpe-ui-gray);
}
`;

try {
  // Escribir el CSS limpio
  const cssPath = path.join(distDir, 'index.css');
  fs.writeFileSync(cssPath, onpeOnlyCSS);
  
  console.log('✅ CSS limpio compilado exitosamente en dist/index.css');
  console.log('📦 Sin resets de Tailwind - Solo estilos ONPE específicos');
  console.log('🎯 Prefijo onpe- aplicado a todas las clases');
  console.log('🔒 No interfiere con los estilos del host');

} catch (error) {
  console.error('❌ Error compilando CSS limpio:', error.message);
  process.exit(1);
}
