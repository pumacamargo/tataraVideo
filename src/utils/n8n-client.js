import fetch from 'node-fetch';
import n8nConfig from '../../config/n8n.config.js';

export class N8nClient {
  constructor(config = {}) {
    this.config = { ...n8nConfig, ...config };
    this.baseUrl = this.config.webhookUrl;
    this.apiKey = this.config.apiKey;
    this.timeout = this.config.timeout;
  }

  async generateImage(prompt, params = {}) {
    return this._makeRequest('POST', '/image', {
      type: 'image',
      prompt,
      ...params
    });
  }

  async generateVideo(prompt, params = {}) {
    return this._makeRequest('POST', '/video', {
      type: 'video',
      prompt,
      ...params
    });
  }

  async generateAudio(prompt, params = {}) {
    return this._makeRequest('POST', '/audio', {
      type: 'audio',
      prompt,
      ...params
    });
  }

  async generateMusic(prompt, params = {}) {
    return this._makeRequest('POST', '/music', {
      type: 'music',
      prompt,
      ...params
    });
  }

  async checkStatus(jobId) {
    return this._makeRequest('GET', `/status/${jobId}`);
  }

  async _makeRequest(method, endpoint, body = null) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const url = `${this.baseUrl}${endpoint}`;
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'X-API-Key': this.apiKey })
        },
        signal: controller.signal
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`n8n error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${this.timeout}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }
}

export default N8nClient;
