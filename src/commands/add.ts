import * as fs from "fs-extra";
import * as path from "path";
import { createBarrelFiles, createBarrelForFolder } from "./createBarrelFiles";

const COMPONENTS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/components";
const ICONS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/icons";

export async function addComponent(componentName: string) {
  // Determinar el tipo de componente
  const isIcon = componentName.toLowerCase().startsWith("icon-");
  const isHook = componentName.toLowerCase().startsWith("use-");
  const isModalComponent = componentName.toLowerCase().startsWith("modal") && componentName !== "modal";

  let componentPath;
  if (isIcon) {
    // Determinar la categoría del icono - NUEVA ESTRUCTURA
    const iconCategory = getIconCategory(componentName);
    componentPath = path.join(process.cwd(), "src", "components", "onpe", "icons", iconCategory);
  } else if (isHook) {
    // Los hooks van en src/hooks/
    componentPath = path.join(process.cwd(), "src", "hooks");
  } else if (isModalComponent) {
    // Los modales específicos van en src/components/onpe/modals/
    componentPath = path.join(process.cwd(), "src", "components", "onpe", "modals");
  } else {
    // Los componentes básicos (incluyendo Modal base) van en src/components/onpe/ui/
    componentPath = path.join(process.cwd(), "src", "components", "onpe", "ui");
  }

  // Crear directorio si no existe
  await fs.ensureDir(componentPath);

  // Definir dependencias de componentes
  const componentDependencies = {
    // Modales especializados
    "modal-browser-incompatible": ["modal", "icon-warning", "icon-chrome-color", "icon-safari-color", "icon-mozilla-color", "icon-edge-color"],
    "modal-system-incompatible": ["modal", "icon-warning", "icon-window", "icon-android", "icon-apple"],
    "modal-confirm": ["modal"],
    "modal-loading": ["modal"],

    // Componentes complejos - ORDEN IMPORTANTE: primero las dependencias, luego el componente principal
    "browser-recommended": ["icon-chrome", "icon-safari", "icon-mozilla", "icon-edge"],
    footer: ["browser-recommended", "icon-info", "use-toggle"],
  };

  // Componentes disponibles
  const availableComponents = {
    // Componentes básicos
    button: "Button/Button.tsx",
    modal: "Modal/Modal.tsx",
    overlay: "Overlay/Overlay.tsx",
    portal: "Portal/Portal.tsx",
    show: "Show/Show.tsx",
    footer: "Footer/Footer.tsx",
    "browser-recommended": "BrowserRecommended/BrowserRecommended.tsx",

    // Componentes de ErrorHandling
    "modal-system-incompatible": "ErrorHandling/ModalSystemIncompatible/ModalSystemIncompatible.tsx",
    "modal-browser-incompatible": "ErrorHandling/ModalBrowserIncompatible/ModalBrowserIncompatible.tsx",

    // Componentes de Feedback
    "modal-confirm": "Feedback/ModalConfirm/ModalConfirm.tsx",
    "modal-loading": "Feedback/ModalLoading/ModalLoading.tsx",
  };

  // Hooks disponibles
  const availableHooks = {
    "use-toggle": "useToggle/useToggle.ts",
    "use-debounce": "useDebounce/useDebounce.ts",
    "use-local-storage": "useLocalStorage/useLocalStorage.ts",
  };

  // Iconos disponibles
  const availableIcons = {
    "icon-check": "Actions/IconCheck/IconCheck.tsx",
    "icon-close": "Actions/IconClose/IconClose.tsx",
    "icon-warning": "Actions/IconWarning/IconWarning.tsx",
    "icon-spinner-desktop": "Actions/IconSpinnerDesktop/IconSpinnerDesktop.tsx",
    "icon-spinner-mobile": "Actions/IconSpinnerMobile/IconSpinnerMobile.tsx",
    "icon-home": "Actions/IconHome/IconHome.tsx",
    "icon-info": "Actions/IconInfo/IconInfo.tsx",
    "icon-chrome": "Browsers/IconChrome/IconChrome.tsx",
    "icon-chrome-color": "Browsers/IconChromeColor/IconChromeColor.tsx",
    "icon-edge": "Browsers/IconEdge/IconEdge.tsx",
    "icon-edge-color": "Browsers/IconEdgeColor/IconEdgeColor.tsx",
    "icon-mozilla": "Browsers/IconMozilla/IconMozilla.tsx",
    "icon-mozilla-color": "Browsers/IconMozillaColor/IconMozillaColor.tsx",
    "icon-safari": "Browsers/IconSafari/IconSafari.tsx",
    "icon-safari-color": "Browsers/IconSafariColor/IconSafariColor.tsx",
    "icon-elections": "ONPE/ElectionsIcon/ElectionsIcon.tsx",
    "icon-voto-digital": "ONPE/IconVotoDigital/IconVotoDigital.tsx",
    "icon-android": "OperatingSystems/IconAndroid/IconAndroid.tsx",
    "icon-apple": "OperatingSystems/IconApple/IconApple.tsx",
    "icon-window": "OperatingSystems/IconWindow/IconWindow.tsx",
  };

  let componentFile;
  if (isIcon) {
    componentFile = availableIcons[componentName.toLowerCase()];
  } else if (isHook) {
    componentFile = availableHooks[componentName.toLowerCase()];
  } else {
    componentFile = availableComponents[componentName.toLowerCase()];
  }

  if (!componentFile) {
    let availableItems;
    let itemType;
    if (isIcon) {
      availableItems = Object.keys(availableIcons);
      itemType = "Icono";
    } else if (isHook) {
      availableItems = Object.keys(availableHooks);
      itemType = "Hook";
    } else {
      availableItems = Object.keys(availableComponents);
      itemType = "Componente";
    }
    throw new Error(`${itemType} '${componentName}' no encontrado. ${itemType}s disponibles: ${availableItems.join(", ")}`);
  }

  try {
    // Instalar dependencias si es un componente que las tiene
    if (!isIcon && !isHook && componentDependencies[componentName.toLowerCase()]) {
      const dependencies = componentDependencies[componentName.toLowerCase()];
      console.log(`🔗 Instalando dependencias: ${dependencies.join(", ")}`);

      // Instalar dependencias en orden secuencial para evitar conflictos
      for (const dependency of dependencies) {
        try {
          console.log(`   📦 Instalando: ${dependency}`);
          await addComponent(dependency);
          console.log(`   ✅ ${dependency} instalado correctamente`);
        } catch (depError) {
          console.warn(`⚠️  No se pudo instalar la dependencia '${dependency}': ${depError.message}`);
        }
      }
    }

    // Descargar el componente, icono o hook
    let downloadUrl;
    if (isIcon) {
      downloadUrl = `${ICONS_URL}/${componentFile}`;
    } else if (isHook) {
      downloadUrl = `https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/hooks/${componentFile}`;
    } else {
      downloadUrl = `${COMPONENTS_URL}/${componentFile}`;
    }
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`No se pudo descargar el componente: ${response.statusText}`);
    }

    const componentCode = await response.text();

    // Personalizar el componente para el proyecto
    const personalizedCode = personalizeComponent(componentCode, componentName);

    // Guardar el componente
    const fileName = isHook ? `${convertToPascalCase(componentName)}.ts` : `${convertToPascalCase(componentName)}.tsx`;
    const filePath = path.join(componentPath, fileName);

    await fs.writeFile(filePath, personalizedCode);

    const itemType = isIcon ? "Icono" : isHook ? "Hook" : "Componente";
    console.log(`📁 ${itemType} guardado en: ${filePath}`);

    // Crear/actualizar archivos de barril solo para la carpeta actual
    try {
      await createBarrelForFolder(componentPath);
      // También actualizar el archivo de barril principal si existe
      await createBarrelFiles();
    } catch (barrelError) {
      console.warn(`⚠️  No se pudieron actualizar los archivos de barril: ${barrelError.message}`);
    }

    // Mostrar instrucciones
    console.log("\n📋 Próximos pasos:");
    console.log(`1. Importa el ${itemType.toLowerCase()}:`);
    const componentNamePascal = convertToPascalCase(componentName);

    // Mostrar opciones de importación
    if (isIcon) {
      const iconCategory = getIconCategory(componentName);
      console.log(`   // Opción 1: Importación directa`);
      console.log(`   import { ${componentNamePascal} } from '../onpe/icons/${iconCategory}/${componentNamePascal}';`);
      console.log(`   // Opción 2: Importación con barril (recomendado)`);
      console.log(`   import { ${componentNamePascal} } from '../onpe/icons/${iconCategory}';`);
      console.log(`   // Opción 3: Importación desde raíz`);
      console.log(`   import { ${componentNamePascal} } from '../onpe';`);
    } else if (isHook) {
      console.log(`   // Opción 1: Importación directa`);
      console.log(`   import { ${componentNamePascal} } from '../hooks/${componentNamePascal}';`);
      console.log(`   // Opción 2: Importación con barril (recomendado)`);
      console.log(`   import { ${componentNamePascal} } from '../hooks';`);
    } else {
      if (componentName.toLowerCase().startsWith("modal") && componentName !== "modal") {
        console.log(`   // Opción 1: Importación directa`);
        console.log(`   import { ${componentNamePascal} } from '../onpe/modals/${componentNamePascal}';`);
        console.log(`   // Opción 2: Importación con barril (recomendado)`);
        console.log(`   import { ${componentNamePascal} } from '../onpe/modals';`);
        console.log(`   // Opción 3: Importación desde raíz`);
        console.log(`   import { ${componentNamePascal} } from '../onpe';`);
      } else {
        console.log(`   // Opción 1: Importación directa`);
        console.log(`   import { ${componentNamePascal} } from '../onpe/ui/${componentNamePascal}';`);
        console.log(`   // Opción 2: Importación con barril (recomendado)`);
        console.log(`   import { ${componentNamePascal} } from '../onpe/ui';`);
        console.log(`   // Opción 3: Importación desde raíz`);
        console.log(`   import { ${componentNamePascal} } from '../onpe';`);
      }
    }

    // Mostrar dependencias si las hay
    if (!isIcon && !isHook && componentDependencies[componentName.toLowerCase()]) {
      const dependencies = componentDependencies[componentName.toLowerCase()];
      console.log(`2. También se instalaron las dependencias:`);
      dependencies.forEach((dep) => {
        const depPascal = convertToPascalCase(dep);
        let depPath;
        if (dep.startsWith("icon-")) {
          const iconCategory = getIconCategory(dep);
          depPath = `../onpe/icons/${iconCategory}/${depPascal}`;
        } else if (dep.startsWith("use-")) {
          depPath = `../hooks/${depPascal}`;
        } else if (dep.startsWith("modal") && dep !== "modal") {
          depPath = `../onpe/modals/${depPascal}`;
        } else {
          depPath = `../onpe/ui/${depPascal}`;
        }
        console.log(`   import { ${depPascal} } from '${depPath}'`);
      });
      console.log(`3. Usa el ${itemType.toLowerCase()}:`);
    } else {
      console.log(`2. Usa el ${itemType.toLowerCase()}:`);
    }

    if (isHook) {
      console.log(`   const [state, toggle, open, close] = ${componentNamePascal}();`);
    } else {
      console.log(`   <${componentNamePascal} />`);
    }
  } catch (error) {
    throw new Error(`Error al instalar el ${isIcon ? "icono" : "componente"}: ${error.message}`);
  }
}

function getIconCategory(iconName: string): string {
  const icon = iconName.toLowerCase();

  // Iconos de acciones
  if (["icon-check", "icon-close", "icon-warning", "icon-spinner-desktop", "icon-spinner-mobile", "icon-home"].includes(icon)) {
    return "actions";
  }

  // Iconos de navegadores
  if (
    [
      "icon-chrome",
      "icon-chrome-color",
      "icon-edge",
      "icon-edge-color",
      "icon-mozilla",
      "icon-mozilla-color",
      "icon-safari",
      "icon-safari-color",
    ].includes(icon)
  ) {
    return "browsers";
  }

  // Iconos de sistemas operativos
  if (["icon-android", "icon-apple", "icon-window"].includes(icon)) {
    return "systems";
  }

  // Iconos de ONPE
  if (["icon-elections", "icon-voto-digital"].includes(icon)) {
    return "onpe";
  }

  // Por defecto, acciones
  return "actions";
}

function convertToPascalCase(name: string): string {
  // Convertir kebab-case a PascalCase
  // Ejemplo: "icon-android" → "IconAndroid"
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

function personalizeComponent(code: string, componentName: string): string {
  const componentNamePascal = convertToPascalCase(componentName);

  // Mapeo de componentes y sus ubicaciones reales - NUEVA ESTRUCTURA
  const componentPaths = {
    // Componentes básicos - van en onpe/ui/
    Button: "../onpe/ui/Button",
    Overlay: "../onpe/ui/Overlay",
    Portal: "../onpe/ui/Portal",
    Show: "../onpe/ui/Show",
    Modal: "../onpe/ui/Modal",
    Footer: "../onpe/ui/Footer",
    BrowserRecommended: "../onpe/ui/BrowserRecommended",

    // Modales especializados - van en onpe/modals/
    ModalConfirm: "../onpe/modals/ModalConfirm",
    ModalLoading: "../onpe/modals/ModalLoading",
    ModalBrowserIncompatible: "../onpe/modals/ModalBrowserIncompatible",
    ModalSystemIncompatible: "../onpe/modals/ModalSystemIncompatible",

    // Iconos - organizados por categorías en onpe/icons/
    // Actions
    IconCheck: "../onpe/icons/actions/IconCheck",
    IconClose: "../onpe/icons/actions/IconClose",
    IconWarning: "../onpe/icons/actions/IconWarning",
    IconSpinnerDesktop: "../onpe/icons/actions/IconSpinnerDesktop",
    IconSpinnerMobile: "../onpe/icons/actions/IconSpinnerMobile",
    IconHome: "../onpe/icons/actions/IconHome",

    // Browsers
    IconChrome: "../onpe/icons/browsers/IconChrome",
    IconChromeColor: "../onpe/icons/browsers/IconChromeColor",
    IconEdge: "../onpe/icons/browsers/IconEdge",
    IconEdgeColor: "../onpe/icons/browsers/IconEdgeColor",
    IconMozilla: "../onpe/icons/browsers/IconMozilla",
    IconMozillaColor: "../onpe/icons/browsers/IconMozillaColor",
    IconSafari: "../onpe/icons/browsers/IconSafari",
    IconSafariColor: "../onpe/icons/browsers/IconSafariColor",

    // Systems
    IconAndroid: "../onpe/icons/systems/IconAndroid",
    IconApple: "../onpe/icons/systems/IconApple",
    IconWindow: "../onpe/icons/systems/IconWindow",

    // ONPE
    IconVotoDigital: "../onpe/icons/onpe/IconVotoDigital",
    IconElectionsGeneral: "../onpe/icons/onpe/IconElectionsGeneral",
    IconElections: "../onpe/icons/onpe/IconElections",
  };

  // Reemplazar las rutas de importación
  let personalizedCode = code;

  // Reemplazar imports relativos con las nuevas rutas
  Object.entries(componentPaths).forEach(([component, newPath]) => {
    const oldPatterns = [
      // Patrones básicos
      `from "../${component}/${component}"`,
      `from "../${component}"`,

      // Patrones de iconos con rutas completas
      `from "../../icons/Actions/${component}/${component}"`,
      `from "../../icons/Actions/${component}"`,
      `from "../../icons/Browsers/${component}/${component}"`,
      `from "../../icons/Browsers/${component}"`,
      `from "../../icons/OperatingSystems/${component}/${component}"`,
      `from "../../icons/OperatingSystems/${component}"`,
      `from "../../icons/ONPE/${component}/${component}"`,
      `from "../../icons/ONPE/${component}"`,

      // Patrones con más niveles de profundidad
      `from "../../../icons/Actions/${component}/${component}"`,
      `from "../../../icons/Actions/${component}"`,
      `from "../../../icons/Browsers/${component}/${component}"`,
      `from "../../../icons/Browsers/${component}"`,
      `from "../../../icons/OperatingSystems/${component}/${component}"`,
      `from "../../../icons/OperatingSystems/${component}"`,
      `from "../../../icons/ONPE/${component}/${component}"`,
      `from "../../../icons/ONPE/${component}"`,
    ];

    oldPatterns.forEach((pattern) => {
      personalizedCode = personalizedCode.replace(pattern, `from "${newPath}"`);
    });
  });

  // Arreglar importaciones relativas dentro de la misma carpeta
  // Para componentes UI que importan otros componentes UI
  if (componentName.toLowerCase() === "modal") {
    personalizedCode = personalizedCode.replace(/from "\.\.\/onpe\/ui\/(Portal|Overlay)"/g, (match, component) => `from "./${component}"`);
    personalizedCode = personalizedCode.replace(
      /from "\.\.\/onpe\/icons\/actions\/(IconClose)"/g,
      (match, component) => `from "../icons/actions/${component}"`
    );
  }

  // Para iconos que necesitan SVGProps
  if (componentName.toLowerCase().startsWith("icon-")) {
    // Agregar importación de SVGProps si no existe
    if (personalizedCode.includes("SVGProps<SVGSVGElement>") && !personalizedCode.includes("import { SVGProps }")) {
      personalizedCode = personalizedCode.replace(/import React from "react";/, `import React, { SVGProps } from "react";`);
    }

    // Simplificar: eliminar interfaces vacías y usar SVGProps directamente
    if (personalizedCode.includes("export interface") && personalizedCode.includes("extends SVGProps<SVGSVGElement>")) {
      // Eliminar la interfaz vacía y usar SVGProps directamente en el componente
      personalizedCode = personalizedCode.replace(
        /export interface \w+Props extends SVGProps<SVGSVGElement> \{\}\s*\n\s*export const \w+ = \(props: \w+Props\)/,
        (match) => {
          const componentName = match.match(/export const (\w+) =/)?.[1] || "Icon";
          return `export const ${componentName} = (props: SVGProps<SVGSVGElement>)`;
        }
      );
    }
  }

  // Para otros componentes UI
  if (!componentName.toLowerCase().startsWith("icon-") && !componentName.toLowerCase().startsWith("modal")) {
    personalizedCode = personalizedCode.replace(/from "\.\.\/onpe\/ui\/([^"]+)"/g, (match, component) => `from "./${component}"`);
  }

  // Para Footer que importa BrowserRecommended
  if (componentName.toLowerCase() === "footer") {
    // Arreglar importación de BrowserRecommended
    personalizedCode = personalizedCode.replace(/from "\.\.\/BrowserRecommended\/BrowserRecommended"/g, `from "./BrowserRecommended"`);
    personalizedCode = personalizedCode.replace(/from "\.\.\/BrowserRecommended"/g, `from "./BrowserRecommended"`);

    // Arreglar importación de IconInfo
    personalizedCode = personalizedCode.replace(/from "\.\.\/\.\.\/icons\/Actions\/IconInfo\/IconInfo"/g, `from "../icons/actions/IconInfo"`);
    personalizedCode = personalizedCode.replace(/from "\.\.\/\.\.\/icons\/Actions\/IconInfo"/g, `from "../icons/actions/IconInfo"`);

    // Arreglar importación de useToggle
    personalizedCode = personalizedCode.replace(/from "\.\.\/\.\.\/hooks\/useToggle\/useToggle"/g, `from "../../hooks/useToggle"`);
    personalizedCode = personalizedCode.replace(/from "\.\.\/\.\.\/hooks\/useToggle"/g, `from "../../hooks/useToggle"`);
  }

  // Para BrowserRecommended que importa iconos
  if (componentName.toLowerCase() === "browser-recommended") {
    personalizedCode = personalizedCode.replace(/from "\.\.\/\.\.\/icons\/Browsers\/([^"]+)"/g, (match, icon) => `from "../icons/browsers/${icon}"`);
  }

  // Para modales que importan componentes UI
  if (componentName.toLowerCase().startsWith("modal") && componentName !== "modal") {
    // Arreglar importación de Modal específicamente
    personalizedCode = personalizedCode.replace(/from "\.\.\/\.\.\/Modal\/Modal"/g, `from "../ui/Modal"`);
    personalizedCode = personalizedCode.replace(/from "\.\.\/onpe\/ui\/([^"]+)"/g, (match, component) => `from "../ui/${component}"`);
    // Arreglar importaciones de iconos en modales
    personalizedCode = personalizedCode.replace(/from "\.\.\/onpe\/icons\/([^"]+)"/g, (match, path) => `from "../icons/${path}"`);
  }

  // Agregar export default si no existe
  if (!personalizedCode.includes("export default")) {
    personalizedCode += `\n\nexport default ${componentNamePascal};`;
  }

  const finalCode = `// Componente ${componentNamePascal} copiado y ajustado para la nueva estructura
// Las rutas de importación han sido actualizadas automáticamente

${personalizedCode}`;

  return finalCode;
}
