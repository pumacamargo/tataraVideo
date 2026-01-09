#!/usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { FileManager } from '../utils/file-manager.js';
import { PromptBuilder } from '../utils/prompt-builder.js';
import N8nClient from '../utils/n8n-client.js';
import path from 'path';

const fileManager = new FileManager();
const promptBuilder = new PromptBuilder();
const n8nClient = new N8nClient();

program
  .argument('<projectName>', 'Nombre del proyecto')
  .argument('<shotId>', 'ID del shot (ej: shot-01)')
  .argument('<type>', 'Tipo de media (first-frame|last-frame|video|audio|music)')
  .option('-p, --prompt <text>', 'Prompt personalizado')
  .option('-d, --dry-run', 'Mostrar prompt sin enviar a n8n')
  .action(async (projectName, shotId, type, options) => {
    try {
      console.log(chalk.blue(`\n🚀 Generando ${type} para ${shotId}...\n`));

      // Validar tipos
      const validTypes = ['first-frame', 'last-frame', 'video', 'audio', 'music'];
      if (!validTypes.includes(type)) {
        throw new Error(`Tipo inválido. Debe ser: ${validTypes.join(', ')}`);
      }

      const projectDir = fileManager.getProjectDir(projectName);
      const shotPath = path.join(projectDir, `${shotId}.md`);

      // Verificar que el shot existe
      if (!(await fileManager.fileExists(shotPath))) {
        throw new Error(`${shotId}.md no encontrado en ${projectDir}`);
      }

      // Leer shot
      const shotContent = await fileManager.readFile(shotPath);

      // Extraer datos del shot
      const shotData = {
        enunciado: extractField(shotContent, 'Enunciado:'),
        duracion: extractField(shotContent, 'Duración:'),
        script: ''
      };

      // Leer dirección de arte
      const artPath = path.join(projectDir, 'Direccion-Arte.md');
      const artContent = await fileManager.readFile(artPath);

      const artDirection = {
        style: extractField(artContent, 'Referencia:'),
        mood: extractField(artContent, 'Sentimiento:'),
        colors: extractField(artContent, 'Paleta de Colores:')
      };

      // Construir prompt
      let prompt = options.prompt || await promptBuilder.buildCompletePrompt(
        type,
        shotData,
        artDirection
      );

      // Validar prompt
      promptBuilder.validatePrompt(prompt);

      console.log(chalk.cyan('📋 Prompt generado:\n'));
      console.log(chalk.gray('---'));
      console.log(prompt);
      console.log(chalk.gray('---\n'));

      if (options.dryRun) {
        console.log(chalk.yellow('⚠️  Modo dry-run: No se envió a n8n'));
        return;
      }

      // Enviar a n8n
      console.log(chalk.cyan('📤 Enviando a n8n...\n'));

      const requestBody = {
        type,
        project: projectName,
        shotId,
        prompt,
        artDirection,
        params: {
          width: 1920,
          height: 1080,
          duration: parseFloat(shotData.duracion) || 5,
          fps: 24
        }
      };

      let response;
      switch (type) {
        case 'first-frame':
        case 'last-frame':
          response = await n8nClient.generateImage(prompt, requestBody.params);
          break;
        case 'video':
          response = await n8nClient.generateVideo(prompt, requestBody.params);
          break;
        case 'audio':
          response = await n8nClient.generateAudio(prompt, requestBody.params);
          break;
        case 'music':
          response = await n8nClient.generateMusic(prompt, requestBody.params);
          break;
      }

      if (response.success) {
        console.log(chalk.green('✅ Enviado correctamente'));
        console.log(chalk.cyan(`   Job ID: ${response.jobId}`));
        console.log(chalk.cyan(`   Status: ${response.status}\n`));

        if (response.result?.url) {
          console.log(chalk.cyan(`   URL: ${response.result.url}\n`));
        }
      } else {
        throw new Error('Error al procesar la solicitud en n8n');
      }

    } catch (error) {
      console.error(chalk.red(`❌ Error: ${error.message}`));
      process.exit(1);
    }
  });

// Helper para extraer campos
function extractField(content, fieldName) {
  const regex = new RegExp(`${fieldName}\\s*(.+?)(?=\\n|-\\s\\*\\*|$)`, 's');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

program.parse(process.argv);
