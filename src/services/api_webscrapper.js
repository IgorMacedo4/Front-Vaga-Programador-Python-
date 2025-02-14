// src/services/api_webscrapper.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
};

const apiWebScrapper = {
  validateUrl: async (url) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/validate?url=${encodeURIComponent(url)}`,
        {
          headers: defaultHeaders,
          credentials: 'include'
        }
      );
      return response.json();
    } catch (error) {
      console.error('Erro ao validar URL:', error);
      throw error;
    }
  },

  analyze: async (url) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: 'POST',
        headers: defaultHeaders,
        credentials: 'include',
        body: JSON.stringify({ url })
      });
      return response.json();
    } catch (error) {
      console.error('Erro ao analisar URL:', error);
      throw error;
    }
  },

  extract: async (url, data_type = 'tudo') => {
    try {
      const response = await fetch(`${API_BASE_URL}/extract`, {
        method: 'POST',
        headers: defaultHeaders,
        credentials: 'include',
        body: JSON.stringify({ url, data_type })
      });
      return response.json();
    } catch (error) {
      console.error('Erro ao extrair dados:', error);
      throw error;
    }
  },

  ask: async (url, question, data_type = 'tudo') => {
    try {
      const response = await fetch(`${API_BASE_URL}/ask`, {
        method: 'POST',
        headers: defaultHeaders,
        credentials: 'include',
        body: JSON.stringify({ url, question, data_type })
      });
      return response.json();
    } catch (error) {
      console.error('Erro ao fazer pergunta:', error);
      throw error;
    }
  },

  save: async (content, format_type, filename_base = 'output') => {
    try {
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: 'POST',
        headers: defaultHeaders,
        credentials: 'include',
        body: JSON.stringify({ 
          content, 
          format_type, 
          filename_base 
        })
      });
      
      if (!response.ok) {
        throw new Error('Erro ao salvar o arquivo');
      }

      const blob = await response.blob();
      if (!blob) {
        throw new Error('Nenhum dado recebido do servidor');
      }

      return blob;
    } catch (error) {
      console.error('Erro ao salvar:', error);
      throw error;
    }
  }
};

export default apiWebScrapper;
