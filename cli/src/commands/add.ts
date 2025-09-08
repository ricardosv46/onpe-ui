import * as fs from "fs-extra";
import * as path from "path";
import chalk from "chalk";

const COMPONENTS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/components";
const ICONS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/icons";

export async function addComponent(componentName: string) {
  // Determinar si es un componente o un icono
  const isIcon = componentName.toLowerCase().startsWith("icon-");

  // Definir rutas según el tipo
  const componentPath = isIcon
    ? path.join(process.cwd(), "src", "components", "onpe-icons")
    : path.join(process.cwd(), "src", "components", "onpe-ui");

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
    "icon-close": "Actions/IconClose/IconClose.tsx",
    "icon-check": "Actions/IconCheck/IconCheck.tsx",
    "icon-warning": "Actions/IconWarning/IconWarning.tsx",
    "icon-chrome": "Browsers/IconChrome/IconChrome.tsx",
    "icon-firefox": "Browsers/IconMozilla/IconMozilla.tsx",
    "icon-safari": "Browsers/IconSafari/IconSafari.tsx",
    "icon-edge": "Browsers/IconEdge/IconEdge.tsx",
    "icon-windows": "OperatingSystems/IconWindow/IconWindow.tsx",
    "icon-apple": "OperatingSystems/IconApple/IconApple.tsx",
    "icon-android": "OperatingSystems/IconAndroid/IconAndroid.tsx",
  };

  const componentFile = isIcon ? availableIcons[componentName.toLowerCase()] : availableComponents[componentName.toLowerCase()];

  if (!componentFile) {
    const availableItems = isIcon ? Object.keys(availableIcons).join(", ") : Object.keys(availableComponents).join(", ");
    throw new Error(
      `${isIcon ? "Icono" : "Componente"} '${componentName}' no encontrado. ${isIcon ? "Iconos" : "Componentes"} disponibles: ${availableItems}`
    );
  }

  try {
    // Determinar URL de descarga
    const downloadUrl = isIcon ? `${ICONS_URL}/${componentFile}` : `${COMPONENTS_URL}/${componentFile}`;

    // Descargar el componente/icono
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`No se pudo descargar el ${isIcon ? "icono" : "componente"}: ${response.statusText}`);
    }

    const componentCode = await response.text();

    // Personalizar el componente/icono para el proyecto
    const personalizedCode = personalizeComponent(componentCode, componentName);

    // Guardar el componente/icono
    const fileName = `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}.tsx`;
    const filePath = path.join(componentPath, fileName);

    await fs.writeFile(filePath, personalizedCode);

    console.log(chalk.green(`📁 ${isIcon ? "Icono" : "Componente"} guardado en: ${filePath}`));

    // Mostrar instrucciones
    console.log(chalk.yellow("\n📋 Próximos pasos:"));
    console.log(chalk.white(`1. Importa el ${isIcon ? "icono" : "componente"}:`));

    const importPath = isIcon
      ? `'./components/onpe-icons/${fileName.replace(".tsx", "")}'`
      : `'./components/onpe-ui/${fileName.replace(".tsx", "")}'`;

    console.log(chalk.cyan(`   import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from ${importPath}`));
    console.log(chalk.white(`2. Usa el ${isIcon ? "icono" : "componente"}:`));
    console.log(chalk.cyan(`   <${componentName.charAt(0).toUpperCase() + componentName.slice(1)} />`));
  } catch (error) {
    throw new Error(`Error al instalar el ${isIcon ? "icono" : "componente"}: ${error.message}`);
  }
}

function personalizeComponent(code: string, componentName: string): string {
  // Personalizar el componente para usar colores del proyecto host
  let personalizedCode = code;

  // Agregar comentario de personalización
  personalizedCode = `// Componente ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} personalizado para tu proyecto
// Puedes modificar los colores y estilos según tus necesidades

${personalizedCode}`;

  return personalizedCode;
}
