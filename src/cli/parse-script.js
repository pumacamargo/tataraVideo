#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { FileManager } from '../utils/file-manager.js';
import path from 'path';
import fs from 'fs-extra';

const fileManager = new FileManager();

program
  .argument('<projectName>', 'Nombre del proyecto')
  .action(async (projectName) => {
    try {
      console.log(chalk.blue('\n📝 Parseando script en shots...\n'));

      const projectDir = fileManager.getProjectDir(projectName);
      const scriptPath = path.join(projectDir, 'Script.md');

      // Verificar que Script.md existe
      if (!(await fileManager.fileExists(scriptPath))) {
        throw new Error(`Script.md no encontrado en ${projectDir}`);
      }

      // Leer Script.md
      const scriptContent = await fileManager.readFile(scriptPath);

      // Parsear shots (buscar "### Shot XX")
      const shotRegex = /### Shot (\d+)\n([\s\S]*?)(?=### Shot \d+|$)/g;
      const shots = [];
      let match;

      while ((match = shotRegex.exec(scriptContent)) !== null) {
        const shotNumber = match[1].padStart(2, '0');
        const shotContent = match[2].trim();

        // Extraer duración y descripción
        const durationMatch = shotContent.match(/- \*\*Duración:\*\*\s*([\d.]+)/);
        const descriptionMatch = shotContent.match(/- \*\*Descripción:\*\*\s*([\s\S]*?)(?=- \*\*|$)/);

        const duration = durationMatch ? durationMatch[1] : '5';
        const description = descriptionMatch ? descriptionMatch[1].trim() : '';

        shots.push({
          number: shotNumber,
          duration,
          description
        });
      }

      if (shots.length === 0) {
        throw new Error('No se encontraron shots en el script (busca "### Shot XX")');
      }

      console.log(chalk.green(`✅ ${shots.length} shots encontrados\n`));

      // Crear archivo para cada shot
      const shotsCreated = [];
      for (const shot of shots) {
        const shotId = `shot-${shot.number}`;
        const shotPath = path.join(projectDir, `${shotId}.md`);

        // Crear Shot.md desde template
        await fileManager.copyTemplate('03-Shot.md', shotPath, {
          SHOT_NUMBER: shot.number,
          SHOT_NUMBER_PADDED: shot.number,
          DURATION: shot.duration,
          SHOT_DESCRIPTION: shot.description,
          BASE_PROMPT: `Shot: ${shot.description}`,
          DATE: new Date().toISOString().split('T')[0]
        });

        // Crear carpeta de media para este shot
        const shotMediaDir = fileManager.getShotDir(projectName, shotId);
        await fs.ensureDir(shotMediaDir);

        shotsCreated.push(shotId);
        console.log(chalk.green(`  ✅ ${shotId}.md creado`));
      }

      // Actualizar metadata
      const metadata = await fileManager.readProjectMetadata(projectName);
      metadata.shots = shotsCreated;
      metadata.status = 'parseado';
      await fileManager.createProjectMetadata(projectName, metadata);

      console.log(chalk.cyan('\n✨ Script parseado correctamente\n'));
      console.log(chalk.yellow(`Siguiente paso: Edita los shots en Obsidian`));
      console.log(chalk.yellow(`Ruta: ${fileManager.vaultDir}\n`));

    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse(process.argv);
