import * as fs from "fs-extra";
import * as path from "path";

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

    console.log(`📁 Componente guardado en: ${filePath}`);

    // Mostrar instrucciones
    console.log("\n📋 Próximos pasos:");
    console.log(`1. Importa el componente:`);
    console.log(
      `   import { ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} } from './components/ui/${fileName.replace(".tsx", "")}'`
    );
    console.log(`2. Usa el componente:`);
    console.log(`   <${componentName.charAt(0).toUpperCase() + componentName.slice(1)} />`);
  } catch (error) {
    throw new Error(`Error al instalar el componente: ${error.message}`);
  }
}

function personalizeComponent(code: string, componentName: string): string {
  // Personalizar el componente para usar colores del proyecto host
  let personalizedCode = code;

  // Reemplazar colores ONPE con clases Tailwind del host
  personalizedCode = personalizedCode.replace(/bg-onpe-ui-blue/g, "bg-primary");
  personalizedCode = personalizedCode.replace(/bg-onpe-ui-skyblue/g, "bg-sky-500");
  personalizedCode = personalizedCode.replace(/bg-onpe-ui-gray/g, "bg-gray-400");
  personalizedCode = personalizedCode.replace(/bg-onpe-ui-red/g, "bg-red-600");
  personalizedCode = personalizedCode.replace(/bg-onpe-ui-green/g, "bg-green-500");
  personalizedCode = personalizedCode.replace(/bg-onpe-ui-yellow/g, "bg-yellow-500");

  // Agregar comentario de personalización
  personalizedCode = `// Componente ${componentName.charAt(0).toUpperCase() + componentName.slice(1)} personalizado para tu proyecto
// Puedes modificar los colores y estilos según tus necesidades

${personalizedCode}`;

  return personalizedCode;
}
