import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '../../');

export class FileManager {
  constructor() {
    this.projectRoot = PROJECT_ROOT;
    this.vaultDir = path.join(this.projectRoot, 'vault');
    this.mediaDir = path.join(this.projectRoot, 'media');
    this.configDir = path.join(this.projectRoot, 'config');
  }

  // Directorios de proyecto
  getProjectDir(projectName) {
    return path.join(this.vaultDir, 'projects', projectName);
  }

  getProjectMediaDir(projectName) {
    return path.join(this.mediaDir, projectName);
  }

  getShotDir(projectName, shotId) {
    return path.join(this.getProjectMediaDir(projectName), 'shots', shotId);
  }

  // Crear proyecto
  async createProjectStructure(projectName) {
    const projectDir = this.getProjectDir(projectName);
    const mediaDir = this.getProjectMediaDir(projectName);

    // Crear directorios
    await fs.ensureDir(projectDir);
    await fs.ensureDir(path.join(mediaDir, 'art-direction'));
    await fs.ensureDir(path.join(mediaDir, 'shots'));
    await fs.ensureDir(path.join(mediaDir, 'final'));

    return { projectDir, mediaDir };
  }

  // Leer archivos
  async readFile(filePath) {
    return fs.readFile(filePath, 'utf-8');
  }

  async readJSON(filePath) {
    const content = await this.readFile(filePath);
    return JSON.parse(content);
  }

  // Escribir archivos
  async writeFile(filePath, content) {
    await fs.ensureDir(path.dirname(filePath));
    return fs.writeFile(filePath, content, 'utf-8');
  }

  async writeJSON(filePath, data) {
    return this.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  // Copiar archivos
  async copyTemplate(templateName, destPath, replacements = {}) {
    const templatePath = path.join(this.vaultDir, 'templates', templateName);
    let content = await this.readFile(templatePath);

    // Reemplazar variables
    Object.entries(replacements).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{ ${key} }}`, 'g'), value);
    });

    await this.writeFile(destPath, content);
  }

  // Verificar si existe
  async fileExists(filePath) {
    return fs.pathExists(filePath);
  }

  // Listar archivos
  async listDir(dirPath) {
    return fs.readdir(dirPath);
  }

  // Metadata de proyecto
  async createProjectMetadata(projectName, data) {
    const metadataPath = path.join(
      this.getProjectDir(projectName),
      'project.json'
    );
    return this.writeJSON(metadataPath, {
      name: projectName,
      createdAt: new Date().toISOString(),
      ...data
    });
  }

  async readProjectMetadata(projectName) {
    const metadataPath = path.join(
      this.getProjectDir(projectName),
      'project.json'
    );
    return this.readJSON(metadataPath);
  }
}

export default FileManager;
