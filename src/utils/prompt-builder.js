import { FileManager } from './file-manager.js';

export class PromptBuilder {
  constructor() {
    this.fileManager = new FileManager();
  }

  async buildImagePrompt(shotData, artDirection, params = {}) {
    const { enunciado, duracion } = shotData;
    const { style, mood, colors } = artDirection;

    const prompt = `
Genera una imagen de alta calidad con los siguientes parámetros:

**Descripción:** ${enunciado}

**Estilo Visual:** ${style}
**Atmósfera:** ${mood}
**Paleta de colores:** ${Array.isArray(colors) ? colors.join(', ') : colors}

**Detalles técnicos:**
- Resolución: ${params.width || 1920}x${params.height || 1080}
- Calidad: ${params.quality || 'Ultra HD'}
- Composición: Profesional, cinematográfica
- Iluminación: Naturalista y artística

**Especificaciones:**
- Sin texto
- Sin watermark
- Apto para video profesional
    `.trim();

    return prompt;
  }

  async buildVideoPrompt(shotData, artDirection, params = {}) {
    const { enunciado, duracion } = shotData;
    const { style, mood } = artDirection;

    const prompt = `
Genera un video profesional con estos parámetros:

**Narrativa:** ${enunciado}

**Dirección de Arte:**
- Estilo: ${style}
- Mood: ${mood}
- Duración: ${duracion || params.duration || 5} segundos

**Especificaciones técnicas:**
- Resolución: ${params.width || 1920}x${params.height || 1080}
- FPS: ${params.fps || 24}
- Duración: ${duracion || params.duration || 5}s
- Codec: H.264
- Bitrate: Auto

**Requisitos:**
- Fluido y cinematográfico
- Transiciones naturales
- Sin cortes abruptos
- Audio listo
    `.trim();

    return prompt;
  }

  async buildAudioPrompt(shotData, params = {}) {
    const { enunciado, script } = shotData;

    const prompt = `
Genera un audio/narración profesional:

**Texto a narrar:**
"${script || enunciado}"

**Parámetros:**
- Voz: Profesional, clara
- Tono: Natural y enganchante
- Velocidad: Moderada
- Duración aproximada: ${params.duration || 5}s
- Idioma: Español

**Especificaciones técnicas:**
- Sample rate: 48kHz
- Bitrate: 192kbps
- Formato: MP3
- Sin música de fondo (solo narración)
    `.trim();

    return prompt;
  }

  async buildMusicPrompt(shotData, artDirection, params = {}) {
    const { mood } = artDirection;

    const prompt = `
Genera música de fondo instrumental:

**Parámetros:**
- Mood: ${mood}
- Duración: ${params.duration || 5} segundos
- BPM: ${params.bpm || 120}
- Género: Cinematográfico, orquestal o electrónico según el mood
- Volumen: De fondo, no invasiva

**Especificaciones técnicas:**
- Sample rate: 48kHz
- Bitrate: 192kbps
- Formato: MP3
- Sin voces
- Extensible para loop

**Requisitos:**
- Que complemente la narrativa
- Professional quality
- Royalty-free
    `.trim();

    return prompt;
  }

  async buildCompletePrompt(type, shotData, artDirection, params = {}) {
    switch (type) {
      case 'first-frame':
      case 'last-frame':
        return this.buildImagePrompt(shotData, artDirection, params);
      case 'video':
        return this.buildVideoPrompt(shotData, artDirection, params);
      case 'audio':
        return this.buildAudioPrompt(shotData, params);
      case 'music':
        return this.buildMusicPrompt(shotData, artDirection, params);
      default:
        throw new Error(`Tipo de prompt no reconocido: ${type}`);
    }
  }

  validatePrompt(prompt) {
    if (!prompt || typeof prompt !== 'string') {
      throw new Error('Prompt debe ser un string');
    }
    if (prompt.length < 10) {
      throw new Error('Prompt muy corto');
    }
    return true;
  }

  optimizePrompt(prompt, model = 'default') {
    // Aquí se pueden agregar optimizaciones específicas por modelo
    // Por ahora, devolvemos el prompt sin cambios
    return prompt;
  }
}

export default PromptBuilder;
