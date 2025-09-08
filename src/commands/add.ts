import * as fs from "fs-extra";
import * as path from "path";

const COMPONENTS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/components";
const ICONS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/icons";

export async function addComponent(componentName: string) {
  // Determinar si es un icono, modal o componente básico
  const isIcon = componentName.toLowerCase().startsWith("icon-");
  const isModal = componentName.toLowerCase().startsWith("modal");

  let folderName = "onpe-ui"; // Por defecto
  if (isIcon) {
    folderName = "onpe-icons";
  } else if (isModal) {
    folderName = "onpe-modals";
  }

  const componentPath = path.join(process.cwd(), "src", "components", folderName);

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

    // Mostrar instrucciones
    console.log("\n📋 Próximos pasos:");
    console.log(`1. Importa el ${isIcon ? "icono" : "componente"}:`);
    const componentNamePascal = convertToPascalCase(componentName);
    const importPath = `./components/${folderName}/${fileName.replace(".tsx", "")}`;
    console.log(`   import { ${componentNamePascal} } from '${importPath}'`);

    // Mostrar dependencias si las hay
    if (!isIcon && componentDependencies[componentName.toLowerCase()]) {
      const dependencies = componentDependencies[componentName.toLowerCase()];
      console.log(`2. También se instalaron las dependencias:`);
      dependencies.forEach((dep) => {
        const depPascal = convertToPascalCase(dep);
        const depFolder = dep.startsWith("icon-") ? "onpe-icons" : dep.startsWith("modal") ? "onpe-modals" : "onpe-ui";
        console.log(`   import { ${depPascal} } from './components/${depFolder}/${depPascal}'`);
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

  // Mapeo de componentes y sus nuevas ubicaciones
  const componentPaths = {
    // Componentes básicos → onpe-ui
    Button: "./components/onpe-ui/Button",
    Overlay: "./components/onpe-ui/Overlay",
    Portal: "./components/onpe-ui/Portal",
    Show: "./components/onpe-ui/Show",

    // Modales → onpe-modals
    Modal: "./components/onpe-modals/Modal",
    ModalConfirm: "./components/onpe-modals/ModalConfirm",
    ModalLoading: "./components/onpe-modals/ModalLoading",
    ModalBrowserIncompatible: "./components/onpe-modals/ModalBrowserIncompatible",
    ModalSystemIncompatible: "./components/onpe-modals/ModalSystemIncompatible",

    // Iconos → onpe-icons
    IconCheck: "./components/onpe-icons/IconCheck",
    IconClose: "./components/onpe-icons/IconClose",
    IconWarning: "./components/onpe-icons/IconWarning",
    IconSpinnerDesktop: "./components/onpe-icons/IconSpinnerDesktop",
    IconSpinnerMobile: "./components/onpe-icons/IconSpinnerMobile",
    IconChrome: "./components/onpe-icons/IconChrome",
    IconChromeColor: "./components/onpe-icons/IconChromeColor",
    IconEdge: "./components/onpe-icons/IconEdge",
    IconEdgeColor: "./components/onpe-icons/IconEdgeColor",
    IconMozilla: "./components/onpe-icons/IconMozilla",
    IconMozillaColor: "./components/onpe-icons/IconMozillaColor",
    IconSafari: "./components/onpe-icons/IconSafari",
    IconSafariColor: "./components/onpe-icons/IconSafariColor",
    IconAndroid: "./components/onpe-icons/IconAndroid",
    IconApple: "./components/onpe-icons/IconApple",
    IconWindow: "./components/onpe-icons/IconWindow",
  };

  // Reemplazar las rutas de importación
  let personalizedCode = code;

  // Reemplazar imports relativos con las nuevas rutas
  Object.entries(componentPaths).forEach(([component, newPath]) => {
    const oldPatterns = [
      `from "../${component}/${component}"`,
      `from "../${component}"`,
      `from "../../icons/Actions/${component}"`,
      `from "../../icons/Browsers/${component}"`,
      `from "../../icons/OperatingSystems/${component}"`,
      `from "../../icons/ONPE/${component}"`,
    ];

    oldPatterns.forEach((pattern) => {
      personalizedCode = personalizedCode.replace(pattern, `from "${newPath}"`);
    });
  });

  const finalCode = `// Componente ${componentNamePascal} copiado y ajustado para la nueva estructura
// Las rutas de importación han sido actualizadas automáticamente

${personalizedCode}`;

  return finalCode;
}
