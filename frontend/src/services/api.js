import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const criarLead = async (dados) => {
  const response = await api.post('/leads', dados);
  return response.data;
};

export const obterPerguntas = async () => {
  const response = await api.get('/perguntas');
  return response.data;
};

export const analisarFraude = async (leadId, respostas) => {
  const response = await api.post('/analisar', {
    leadId,
    respostas
  });
  return response.data;
};

export const obterAnalise = async (id) => {
  const response = await api.get(`/analises/${id}`);
  return response.data;
};

export const obterEstatisticas = async () => {
  const response = await api.get('/estatisticas');
  return response.data;
};

export default api;
