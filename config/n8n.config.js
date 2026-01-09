import dotenv from 'dotenv';

dotenv.config();

export const n8nConfig = {
  webhookUrl: process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/generate-media',
  apiKey: process.env.N8N_API_KEY,
  timeout: parseInt(process.env.N8N_TIMEOUT || '300000'),

  // Endpoints para diferentes tipos de generación
  endpoints: {
    image: '/image',
    video: '/video',
    audio: '/audio',
    music: '/music',
    status: '/status'
  },

  // Parámetros por defecto
  defaults: {
    image: {
      width: 1920,
      height: 1080,
      quality: 'hd'
    },
    video: {
      width: 1920,
      height: 1080,
      duration: 5,
      fps: 24
    },
    audio: {
      sampleRate: 48000,
      bitrate: '192k'
    }
  }
};

export default n8nConfig;
