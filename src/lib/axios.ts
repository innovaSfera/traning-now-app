import axios from "axios";
import { API_CONFIG } from "./constants";

/**
 * Configuração da instância do Axios para a API Training Now
 * Adaptado para Next.js com variáveis de ambiente apropriadas
 */
export const api = axios.create({
  baseURL: process.env.NODE_ENV === "production"
    ? API_CONFIG.BASE_URL.PRODUCTION
    : API_CONFIG.BASE_URL.DEVELOPMENT,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor de requisição para adicionar token de autenticação
 */
api.interceptors.request.use(
  (config) => {
    // Verificar se estamos no cliente (browser)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(API_CONFIG.STORAGE_KEYS.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de resposta para tratamento de erros globais
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Tratamento de erro 401 - Token expirado
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.TOKEN);
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER);
        // Redirecionar para login se necessário
        window.location.href = "/auth/sign-in";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;