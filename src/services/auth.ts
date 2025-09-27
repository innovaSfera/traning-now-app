import { api } from "@/lib/axios";
import { API_CONFIG, API_ENDPOINTS } from "@/lib/constants";
import type {
  PrestadorLoginRequestDto,
  RegisterUserRequest,
  TokenResponseDto,
  UserModelResponseDto,
  ApiResponse,
} from "@/types/api";

/**
 * Serviços de autenticação para a API Training Now
 */
export class AuthService {
  /**
   * Busca dados de um prestador por email ou ID
   */
  static async getPrestadorUser(
    email?: string,
    id?: string
  ): Promise<UserModelResponseDto | string> {
    try {
      const params = new URLSearchParams();
      if (email) params.append("email", email);
      if (id) params.append("id", id);

      const response = await api.get<UserModelResponseDto | string>(
        `${API_ENDPOINTS.AUTH.BUSCAR_PRESTADOR}?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      console.error("Erro ao buscar prestador:", error);
      throw error;
    }
  }

  /**
   * Registra um novo prestador/usuário
   */
  static async registerPrestador(
    request: RegisterUserRequest
  ): Promise<ApiResponse> {
    try {
      const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, request);
      
      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      console.error("Erro ao registrar prestador:", error);
      throw error;
    }
  }

  /**
   * Realiza login de prestador
   */
  static async loginPrestador(
    request: PrestadorLoginRequestDto
  ): Promise<ApiResponse<TokenResponseDto>> {
    try {
      const response = await api.post<TokenResponseDto>(
        API_ENDPOINTS.AUTH.LOGIN, 
        request
      );

      // Salvar token no localStorage se o login for bem-sucedido
      if (response.data.accessToken && typeof window !== "undefined") {
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.TOKEN, response.data.accessToken);
        localStorage.setItem(API_CONFIG.STORAGE_KEYS.USER, JSON.stringify({
          userName: response.data.userName,
          roles: response.data.roles
        }));
      }

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  /**
   * Realiza logout do usuário
   */
  static async logout(): Promise<void> {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.TOKEN);
        localStorage.removeItem(API_CONFIG.STORAGE_KEYS.USER);
      }
      
      // Aqui você pode fazer uma chamada para a API para invalidar o token no backend
      // await api.post("/auth/logout");
      
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  }

  /**
   * Verifica se o usuário está autenticado
   */
  static isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    
    const token = localStorage.getItem(API_CONFIG.STORAGE_KEYS.TOKEN);
    return !!token;
  }

  /**
   * Obtém o token atual
   */
  static getToken(): string | null {
    if (typeof window === "undefined") return null;
    
    return localStorage.getItem(API_CONFIG.STORAGE_KEYS.TOKEN);
  }

  /**
   * Obtém dados do usuário logado
   */
  static getCurrentUser(): { userName: string; roles: string[] } | null {
    if (typeof window === "undefined") return null;
    
    const user = localStorage.getItem(API_CONFIG.STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  }
}