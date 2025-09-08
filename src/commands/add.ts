import * as fs from "fs-extra";
import * as path from "path";

const COMPONENTS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/components";
const ICONS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/icons";

export async function addComponent(componentName: string) {
  // Determinar si es un icono o componente
  const isIcon = componentName.toLowerCase().startsWith("icon-");
  const componentPath = path.join(process.cwd(), "src", "components", isIcon ? "onpe-icons" : "onpe-ui");

  // Crear directorio si no existe
  await fs.ensureDir(componentPath);

  // Definir dependencias de componentes
  const componentDependencies = {
    "modal-browser-incompatible": ["modal", "icon-warning", "icon-chrome-color", "icon-safari-color", "icon-mozilla-color", "icon-edge-color"],
    "modal-system-incompatible": ["modal", "icon-warning"],
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
    const fileName = `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.tsx`;
    const filePath = path.join(componentPath, fileName);

    await fs.writeFile(filePath, personalizedCode);

    console.log(`📁 ${isIcon ? "Icono" : "Componente"} guardado en: ${filePath}`);

    // Mostrar instrucciones
    console.log("\n📋 Próximos pasos:");
    console.log(`1. Importa el ${isIcon ? "icono" : "componente"}:`);
    const importPath = isIcon ? `./components/onpe-icons/${fileName.replace(".tsx", "")}` : `./components/onpe-ui/${fileName.replace(".tsx", "")}`;
    console.log(`   import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from '${importPath}'`);
    console.log(`2. Usa el ${isIcon ? "icono" : "componente"}:`);
    console.log(`   <${componentName.charAt(0).toUpperCase() + componentName.slice(1)} />`);
  } catch (error) {
    throw new Error(`Error al instalar el ${isIcon ? "icono" : "componente"}: ${error.message}`);
  }
}

function personalizeComponent(code: string, componentName: string): string {
  // Solo agregar comentario, sin cambiar nada
  const personalizedCode = `// Componente ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} copiado tal cual
// Puedes modificar los colores y estilos según tus necesidades

${code}`;

  return personalizedCode;
}
