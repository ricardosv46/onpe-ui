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

  // Componentes disponibles
  const availableComponents = {
    button: "Button/Button.tsx",
    modal: "Modal/Modal.tsx",
    overlay: "Overlay/Overlay.tsx",
    portal: "Portal/Portal.tsx",
    show: "Show/Show.tsx",
  };

  // Iconos disponibles
  const availableIcons = {
    "icon-check": "Actions/IconCheck/IconCheck.tsx",
    "icon-close": "Actions/IconClose/IconClose.tsx",
    "icon-warning": "Actions/IconWarning/IconWarning.tsx",
    "icon-spinner-desktop": "Actions/IconSpinnerDesktop/IconSpinnerDesktop.tsx",
    "icon-spinner-mobile": "Actions/IconSpinnerMobile/IconSpinnerMobile.tsx",
    "icon-chrome": "Browsers/IconChrome/IconChrome.tsx",
    "icon-edge": "Browsers/IconEdge/IconEdge.tsx",
    "icon-mozilla": "Browsers/IconMozilla/IconMozilla.tsx",
    "icon-safari": "Browsers/IconSafari/IconSafari.tsx",
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
