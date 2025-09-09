import * as fs from "fs-extra";
import * as path from "path";

/**
 * Crea archivos de barril (barrel exports) para simplificar las importaciones
 * Solo crea las carpetas y archivos que realmente existen
 */
export async function createBarrelFiles() {
  const componentsDir = path.join(process.cwd(), "src", "components", "onpe");

  // Solo crear la carpeta principal si no existe
  await fs.ensureDir(componentsDir);

  // Función para verificar si una carpeta existe y tiene archivos
  const folderExists = async (folderPath: string): Promise<boolean> => {
    try {
      const exists = await fs.pathExists(folderPath);
      if (!exists) return false;

      const files = await fs.readdir(folderPath);
      return files.some((file) => file.endsWith(".tsx") && !file.includes(".stories"));
    } catch {
      return false;
    }
  };

  // Función para obtener archivos de una carpeta
  const getFilesInFolder = async (folderPath: string): Promise<string[]> => {
    try {
      const files = await fs.readdir(folderPath);
      return files.filter((file) => file.endsWith(".tsx") && !file.includes(".stories")).map((file) => file.replace(".tsx", ""));
    } catch {
      return [];
    }
  };

  // 1. Crear index.ts principal en onpe/ solo si hay carpetas
  const mainExports: string[] = [];

  if (await folderExists(path.join(componentsDir, "ui"))) {
    mainExports.push("export * from './ui';");
  }
  if (await folderExists(path.join(componentsDir, "modals"))) {
    mainExports.push("export * from './modals';");
  }
  if (await folderExists(path.join(componentsDir, "icons"))) {
    mainExports.push("export * from './icons';");
  }

  if (mainExports.length > 0) {
    const mainIndexContent = `// ONPE UI - Punto de entrada principal
${mainExports.join("\n")}`;
    await fs.writeFile(path.join(componentsDir, "index.ts"), mainIndexContent);
  }

  // 2. Crear index.ts para ui/ solo si existe y tiene archivos
  const uiPath = path.join(componentsDir, "ui");
  if (await folderExists(uiPath)) {
    const uiFiles = await getFilesInFolder(uiPath);
    if (uiFiles.length > 0) {
      const uiExports = uiFiles.map((file) => `export * from './${file}';`).join("\n");
      const uiIndexContent = `// Componentes básicos ONPE UI
${uiExports}`;
      await fs.writeFile(path.join(uiPath, "index.ts"), uiIndexContent);
    }
  }

  // 3. Crear index.ts para modals/ solo si existe y tiene archivos
  const modalsPath = path.join(componentsDir, "modals");
  if (await folderExists(modalsPath)) {
    const modalFiles = await getFilesInFolder(modalsPath);
    if (modalFiles.length > 0) {
      const modalExports = modalFiles.map((file) => `export * from './${file}';`).join("\n");
      const modalsIndexContent = `// Modales especializados ONPE
${modalExports}`;
      await fs.writeFile(path.join(modalsPath, "index.ts"), modalsIndexContent);
    }
  }

  // 4. Crear index.ts para icons/ solo si existe
  const iconsPath = path.join(componentsDir, "icons");
  if (await folderExists(iconsPath)) {
    const iconExports: string[] = [];

    if (await folderExists(path.join(iconsPath, "actions"))) {
      iconExports.push("export * from './actions';");
    }
    if (await folderExists(path.join(iconsPath, "browsers"))) {
      iconExports.push("export * from './browsers';");
    }
    if (await folderExists(path.join(iconsPath, "systems"))) {
      iconExports.push("export * from './systems';");
    }
    if (await folderExists(path.join(iconsPath, "onpe"))) {
      iconExports.push("export * from './onpe';");
    }

    if (iconExports.length > 0) {
      const iconsIndexContent = `// Iconos ONPE organizados por categorías
${iconExports.join("\n")}`;
      await fs.writeFile(path.join(iconsPath, "index.ts"), iconsIndexContent);
    }

    // 5. Crear index.ts para cada categoría de iconos que exista
    const iconCategories = ["actions", "browsers", "systems", "onpe"];

    for (const category of iconCategories) {
      const categoryPath = path.join(iconsPath, category);
      if (await folderExists(categoryPath)) {
        const categoryFiles = await getFilesInFolder(categoryPath);
        if (categoryFiles.length > 0) {
          const categoryExports = categoryFiles.map((file) => `export * from './${file}';`).join("\n");
          const categoryIndexContent = `// Iconos de ${category}
${categoryExports}`;
          await fs.writeFile(path.join(categoryPath, "index.ts"), categoryIndexContent);
        }
      }
    }
  }

  console.log("✅ Archivos de barril actualizados exitosamente!");
  console.log("📁 Solo se crearon archivos para carpetas que existen");
}

/**
 * Crea archivos de barril solo para una carpeta específica
 */
export async function createBarrelForFolder(folderPath: string) {
  try {
    const exists = await fs.pathExists(folderPath);
    if (!exists) return;

    const files = await fs.readdir(folderPath);
    const componentFiles = files.filter((file) => file.endsWith(".tsx") && !file.includes(".stories")).map((file) => file.replace(".tsx", ""));

    if (componentFiles.length === 0) return;

    const exports = componentFiles.map((file) => `export * from './${file}';`).join("\n");
    const indexContent = `// Componentes en esta carpeta
${exports}`;

    await fs.writeFile(path.join(folderPath, "index.ts"), indexContent);
    console.log(`✅ Archivo de barril creado para: ${path.basename(folderPath)}`);
  } catch (error) {
    console.warn(`⚠️  No se pudo crear el archivo de barril: ${error.message}`);
  }
}
