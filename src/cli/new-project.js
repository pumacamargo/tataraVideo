#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { FileManager } from '../utils/file-manager.js';
import path from 'path';

const fileManager = new FileManager();

program
  .argument('<projectName>', 'Nombre del proyecto')
  .option('-d, --description <text>', 'Descripción del proyecto')
  .option('-m, --minutes <number>', 'Duración estimada en minutos', '0')
  .action(async (projectName, options) => {
    try {
      console.log(chalk.blue('\n📽️  Creando nuevo proyecto...\n'));

      // Validar nombre
      if (!projectName || projectName.length < 3) {
        throw new Error('El nombre del proyecto debe tener al menos 3 caracteres');
      }

      const projectPath = fileManager.getProjectDir(projectName);

      // Crear estructura
      await fileManager.createProjectStructure(projectName);
      console.log(chalk.green(`✅ Carpetas creadas`));

      // Crear Script.md
      const scriptPath = path.join(projectPath, 'Script.md');
      const today = new Date().toISOString().split('T')[0];

      await fileManager.copyTemplate('01-Script.md', scriptPath, {
        PROJECT_NAME: projectName,
        DATE: today,
        DURATION_MINUTES: options.minutes,
        PROJECT_DESCRIPTION: options.description || 'Descripción del proyecto'
      });
      console.log(chalk.green(`✅ Script.md creado`));

      // Crear Dirección de Arte
      const artPath = path.join(projectPath, 'Direccion-Arte.md');
      await fileManager.copyTemplate('02-Direccion-Arte.md', artPath, {});
      console.log(chalk.green(`✅ Dirección-Arte.md creado`));

      // Crear metadata
      await fileManager.createProjectMetadata(projectName, {
        description: options.description || '',
        durationMinutes: parseInt(options.minutes),
        status: 'creado',
        shots: []
      });
      console.log(chalk.green(`✅ Metadata del proyecto creado`));

      // Output final
      console.log(chalk.cyan('\n📋 Próximos pasos:\n'));
      console.log(`1. Abre el archivo en tu editor:`);
      console.log(chalk.yellow(`   ${scriptPath}`));
      console.log(`\n2. Edita Script.md y agrega tus shots (numerados)`);
      console.log(`\n3. Una vez completo, parsea los shots:`);
      console.log(chalk.yellow(`   npm run parse-script -- ${projectName}`));
      console.log(`\n4. Abre Obsidian en:`);
      console.log(chalk.yellow(`   ${fileManager.vaultDir}`));
      console.log('\n');
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
