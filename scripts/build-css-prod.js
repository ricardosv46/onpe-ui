import fs from 'fs-extra';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔨 Compilando CSS para producción con prefijo único...');

// Crear directorio dist si no existe
const distDir = path.join(__dirname, '../dist');
fs.ensureDirSync(distDir);

try {
  // Compilar CSS usando el script existente que ya funciona
  execSync('node scripts/build-css.js', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  console.log('✅ CSS compilado exitosamente en dist/index.css');
  console.log('📦 Archivo listo para distribución con prefijo onpe-');
  
} catch (error) {
  console.error('❌ Error compilando CSS:', error.message);
  process.exit(1);
}
