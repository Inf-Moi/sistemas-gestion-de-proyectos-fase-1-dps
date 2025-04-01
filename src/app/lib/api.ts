// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // Asegúrate de que esté configurado correctamente para tus rutas API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
