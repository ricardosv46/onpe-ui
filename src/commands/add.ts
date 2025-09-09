import * as fs from "fs-extra";
import * as path from "path";
import { createBarrelFiles, createBarrelForFolder } from "./createBarrelFiles";

const COMPONENTS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/components";
const ICONS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/icons";

export async function addComponent(componentName: string) {
  // Determinar si es un icono, modal o componente básico
  const isIcon = componentName.toLowerCase().startsWith("icon-");
  const isModalComponent = componentName.toLowerCase().startsWith("modal") && componentName !== "modal";

  let componentPath;
  if (isIcon) {
    // Determinar la categoría del icono - NUEVA ESTRUCTURA
    const iconCategory = getIconCategory(componentName);
    componentPath = path.join(process.cwd(), "src", "components", "onpe", "icons", iconCategory);
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
    "modal-browser-incompatible": ["modal", "icon-warning", "icon-chrome-color", "icon-safari-color", "icon-mozilla-color", "icon-edge-color"],
    "modal-system-incompatible": ["modal", "icon-warning", "icon-window", "icon-android", "icon-apple"],
    "modal-confirm": ["modal"],
    "modal-loading": ["modal"],
  };

  // Componentes disponibles
  const availableComponents = {
    // Componentes básicos
    button: "Button/Button.tsx",
    modal: "Modal/Modal.tsx",
    overlay: "Overlay/Overlay.tsx",
    portal: "Portal/Portal.tsx",
    show: "Show/Show.tsx",

    // Componentes de ErrorHandling
    "modal-system-incompatible": "ErrorHandling/ModalSystemIncompatible/ModalSystemIncompatible.tsx",
    "modal-browser-incompatible": "ErrorHandling/ModalBrowserIncompatible/ModalBrowserIncompatible.tsx",

    // Componentes de Feedback
    "modal-confirm": "Feedback/ModalConfirm/ModalConfirm.tsx",
    "modal-loading": "Feedback/ModalLoading/ModalLoading.tsx",
  };

  // Iconos disponibles
  const availableIcons = {
    "icon-check": "Actions/IconCheck/IconCheck.tsx",
    "icon-close": "Actions/IconClose/IconClose.tsx",
    "icon-warning": "Actions/IconWarning/IconWarning.tsx",
    "icon-spinner-desktop": "Actions/IconSpinnerDesktop/IconSpinnerDesktop.tsx",
    "icon-spinner-mobile": "Actions/IconSpinnerMobile/IconSpinnerMobile.tsx",
    "icon-home": "Actions/IconHome/IconHome.tsx",
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

  const componentFile = isIcon ? availableIcons[componentName.toLowerCase()] : availableComponents[componentName.toLowerCase()];

  if (!componentFile) {
    const availableItems = isIcon ? Object.keys(availableIcons) : Object.keys(availableComponents);
    throw new Error(
      `${isIcon ? "Icono" : "Componente"} '${componentName}' no encontrado. ${isIcon ? "Iconos" : "Componentes"} disponibles: ${availableItems.join(
        ", "
      )}`
    );
  }

  try {
    // Instalar dependencias si es un componente que las tiene
    if (!isIcon && componentDependencies[componentName.toLowerCase()]) {
      const dependencies = componentDependencies[componentName.toLowerCase()];
      console.log(`🔗 Instalando dependencias: ${dependencies.join(", ")}`);

      for (const dependency of dependencies) {
        try {
          await addComponent(dependency);
        } catch (depError) {
          console.warn(`⚠️  No se pudo instalar la dependencia '${dependency}': ${depError.message}`);
        }
      }
    }

    // Descargar el componente o icono
    const downloadUrl = isIcon ? `${ICONS_URL}/${componentFile}` : `${COMPONENTS_URL}/${componentFile}`;
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`No se pudo descargar el componente: ${response.statusText}`);
    }

    const componentCode = await response.text();

    // Personalizar el componente para el proyecto
    const personalizedCode = personalizeComponent(componentCode, componentName);

    // Guardar el componente
    const fileName = `${convertToPascalCase(componentName)}.tsx`;
    const filePath = path.join(componentPath, fileName);

    await fs.writeFile(filePath, personalizedCode);

    console.log(`📁 ${isIcon ? "Icono" : "Componente"} guardado en: ${filePath}`);

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
    console.log(`1. Importa el ${isIcon ? "icono" : "componente"}:`);
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
    if (!isIcon && componentDependencies[componentName.toLowerCase()]) {
      const dependencies = componentDependencies[componentName.toLowerCase()];
      console.log(`2. También se instalaron las dependencias:`);
      dependencies.forEach((dep) => {
        const depPascal = convertToPascalCase(dep);
        let depPath;
        if (dep.startsWith("icon-")) {
          const iconCategory = getIconCategory(dep);
          depPath = `../onpe-icons-${iconCategory}/${depPascal}`;
        } else if (dep.startsWith("modal") && dep !== "modal") {
          depPath = `../onpe-modals/${depPascal}`;
        } else {
          depPath = `../onpe-ui/${depPascal}`;
        }
        console.log(`   import { ${depPascal} } from '${depPath}'`);
      });
      console.log(`3. Usa el ${isIcon ? "icono" : "componente"}:`);
    } else {
      console.log(`2. Usa el ${isIcon ? "icono" : "componente"}:`);
    }
    console.log(`   <${componentNamePascal} />`);
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

  // Agregar export default si no existe
  if (!personalizedCode.includes("export default")) {
    personalizedCode += `\n\nexport default ${componentNamePascal};`;
  }

  const finalCode = `// Componente ${componentNamePascal} copiado y ajustado para la nueva estructura
// Las rutas de importación han sido actualizadas automáticamente

${personalizedCode}`;

  return finalCode;
}
