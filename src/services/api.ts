import { api } from "@/lib/axios";
import type { ApiResponse } from "@/types/api";

/**
 * Serviço genérico para operações CRUD na API
 */
export class ApiService {
  /**
   * Requisição GET genérica
   */
  static async get<T = any>(
    endpoint: string,
    params?: Record<string, any>
  ): Promise<T> {
    try {
      const response = await api.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error(`Erro na requisição GET para ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Requisição POST genérica
   */
  static async post<T = any>(
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.post<T>(endpoint, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error(`Erro na requisição POST para ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Requisição PUT genérica
   */
  static async put<T = any>(
    endpoint: string,
    data?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.put<T>(endpoint, data);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error(`Erro na requisição PUT para ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Requisição DELETE genérica
   */
  static async delete<T = any>(
    endpoint: string
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api.delete<T>(endpoint);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error(`Erro na requisição DELETE para ${endpoint}:`, error);
      throw error;
    }
  }
}