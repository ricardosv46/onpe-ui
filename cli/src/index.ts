#!/usr/bin/env node

import { Command } from "commander";
import { addComponent } from "./commands/add";
import chalk from "chalk";

const program = new Command();

program.name("onpe-ui").description("CLI para instalar componentes ONPE UI").version("1.0.0");

program
  .command("add <component>")
  .description("Agregar un componente ONPE UI al proyecto")
  .action(async (component: string) => {
    try {
      console.log(chalk.blue(`🚀 Instalando componente: ${component}`));
      await addComponent(component);
      console.log(chalk.green(`✅ Componente ${component} instalado exitosamente!`));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error}`));
      process.exit(1);
    }
  });

program.parse();
