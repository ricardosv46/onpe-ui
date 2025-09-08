#!/usr/bin/env node

import { Command } from "commander";
import { addComponent } from "./commands/add.js";

const program = new Command();

program.name("onpe-ui").description("CLI para instalar componentes ONPE UI").version("1.0.38");

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

program.parse();
