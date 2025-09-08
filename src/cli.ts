#!/usr/bin/env node

import { Command } from "commander";
import { addComponent } from "./commands/add.js";
import { createBarrelFiles } from "./commands/createBarrelFiles.js";

const program = new Command();

program.name("onpe-ui").description("CLI para instalar componentes ONPE UI").version("1.0.44");

program
  .command("add <component>")
  .description("Agregar un componente ONPE UI al proyecto")
  .action(async (component: string) => {
    try {
      console.log(`🚀 Instalando componente: ${component}`);
      await addComponent(component);
      console.log(`✅ Componente ${component} instalado exitosamente!`);
    } catch (error) {
      console.error(`❌ Error: ${error}`);
      process.exit(1);
    }
  });

program
  .command("init")
  .description("Crear la estructura inicial de carpetas y archivos de barril")
  .action(async () => {
    try {
      console.log(`🚀 Creando estructura inicial de ONPE UI...`);
      await createBarrelFiles();
      console.log(`✅ Estructura inicial creada exitosamente!`);
      console.log(`📁 Estructura creada en: src/components/onpe/`);
    } catch (error) {
      console.error(`❌ Error: ${error}`);
      process.exit(1);
    }
  });

program.parse();
