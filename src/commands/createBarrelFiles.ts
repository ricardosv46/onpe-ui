import * as fs from "fs-extra";
import * as path from "path";

/**
 * Crea archivos de barril (barrel exports) para simplificar las importaciones
 */
export async function createBarrelFiles() {
  const componentsDir = path.join(process.cwd(), "src", "components", "onpe");

  // Crear estructura de carpetas si no existe
  await fs.ensureDir(path.join(componentsDir, "ui"));
  await fs.ensureDir(path.join(componentsDir, "modals"));
  await fs.ensureDir(path.join(componentsDir, "icons", "actions"));
  await fs.ensureDir(path.join(componentsDir, "icons", "browsers"));
  await fs.ensureDir(path.join(componentsDir, "icons", "systems"));
  await fs.ensureDir(path.join(componentsDir, "icons", "onpe"));

  // 1. Crear index.ts principal en onpe/
  const mainIndexContent = `// ONPE UI - Punto de entrada principal
export * from './ui';
export * from './modals';
export * from './icons';

// Re-exportar todo para importaciones fáciles
export * from './ui/index';
export * from './modals/index';
export * from './icons/index';
`;

  await fs.writeFile(path.join(componentsDir, "index.ts"), mainIndexContent);

  // 2. Crear index.ts para UI
  const uiIndexContent = `// Componentes UI básicos
export * from './Button';
export * from './Modal';
export * from './Overlay';
export * from './Portal';
export * from './Show';
`;

  await fs.writeFile(path.join(componentsDir, "ui", "index.ts"), uiIndexContent);

  // 3. Crear index.ts para Modals
  const modalsIndexContent = `// Modales especializados
export * from './ModalConfirm';
export * from './ModalLoading';
export * from './ModalBrowserIncompatible';
export * from './ModalSystemIncompatible';
`;

  await fs.writeFile(path.join(componentsDir, "modals", "index.ts"), modalsIndexContent);

  // 4. Crear index.ts para Icons
  const iconsIndexContent = `// Todos los iconos organizados por categorías
export * from './actions';
export * from './browsers';
export * from './systems';
export * from './onpe';
`;

  await fs.writeFile(path.join(componentsDir, "icons", "index.ts"), iconsIndexContent);

  // 5. Crear index.ts para cada categoría de iconos
  const actionsIndexContent = `// Iconos de Acciones
export * from './IconCheck';
export * from './IconClose';
export * from './IconWarning';
export * from './IconSpinnerDesktop';
export * from './IconSpinnerMobile';
export * from './IconHome';
`;

  await fs.writeFile(path.join(componentsDir, "icons", "actions", "index.ts"), actionsIndexContent);

  const browsersIndexContent = `// Iconos de Navegadores
export * from './IconChrome';
export * from './IconChromeColor';
export * from './IconEdge';
export * from './IconEdgeColor';
export * from './IconMozilla';
export * from './IconMozillaColor';
export * from './IconSafari';
export * from './IconSafariColor';
`;

  await fs.writeFile(path.join(componentsDir, "icons", "browsers", "index.ts"), browsersIndexContent);

  const systemsIndexContent = `// Iconos de Sistemas Operativos
export * from './IconAndroid';
export * from './IconApple';
export * from './IconWindow';
`;

  await fs.writeFile(path.join(componentsDir, "icons", "systems", "index.ts"), systemsIndexContent);

  const onpeIndexContent = `// Iconos de ONPE
export * from './IconVotoDigital';
export * from './IconElectionsGeneral';
export * from './IconElections';
`;

  await fs.writeFile(path.join(componentsDir, "icons", "onpe", "index.ts"), onpeIndexContent);

  console.log("✅ Archivos de barril creados exitosamente!");
  console.log("📁 Estructura creada:");
  console.log("   onpe/");
  console.log("   ├── index.ts (principal)");
  console.log("   ├── ui/index.ts");
  console.log("   ├── modals/index.ts");
  console.log("   └── icons/");
  console.log("       ├── index.ts");
  console.log("       ├── actions/index.ts");
  console.log("       ├── browsers/index.ts");
  console.log("       ├── systems/index.ts");
  console.log("       └── onpe/index.ts");
}
