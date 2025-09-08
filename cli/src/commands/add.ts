import * as fs from "fs-extra";
import * as path from "path";
import chalk from "chalk";

const COMPONENTS_URL = "https://raw.githubusercontent.com/ricardosv46/onpe-ui/main/src/components";

export async function addComponent(componentName: string) {
  const componentPath = path.join(process.cwd(), "src", "components", "ui");

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

  const componentFile = availableComponents[componentName.toLowerCase()];

  if (!componentFile) {
    throw new Error(`Componente '${componentName}' no encontrado. Componentes disponibles: ${Object.keys(availableComponents).join(", ")}`);
  }

  try {
    // Descargar el componente
    const response = await fetch(`${COMPONENTS_URL}/${componentFile}`);

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

    console.log(chalk.green(`📁 Componente guardado en: ${filePath}`));

    // Mostrar instrucciones
    console.log(chalk.yellow("\n📋 Próximos pasos:"));
    console.log(chalk.white(`1. Importa el componente:`));
    console.log(
      chalk.cyan(
        `   import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from './components/ui/${fileName.replace(".tsx", "")}'`
      )
    );
    console.log(chalk.white(`2. Usa el componente:`));
    console.log(chalk.cyan(`   <${componentName.charAt(0).toUpperCase() + componentName.slice(1)} />`));
  } catch (error) {
    throw new Error(`Error al instalar el componente: ${error.message}`);
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
