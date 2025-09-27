import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import type {
  ClassRoom,
  ClassRoomFilter,
  ClassRoomCreateRequest,
  ClassRoomUpdateRequest,
} from "@/types/classroom";

/**
 * Serviço para gerenciar ClassRooms (Salas de Aula)
 */
export class ClassRoomService {
  /**
   * Buscar todas as salas de aula
   */
  static async getAllClassRooms(): Promise<ClassRoom[]> {
    try {
      const response = await api.get<ClassRoom[]>(
        API_ENDPOINTS.CLASSROOM.GET_ALL
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todas as salas:", error);
      throw error;
    }
  }

  /**
   * Buscar salas com filtro simplificado (id + nome)
   */
  static async getAllClassRoomsFilter(): Promise<ClassRoomFilter[]> {
    try {
      const response = await api.get<ClassRoom[]>(
        API_ENDPOINTS.CLASSROOM.GET_ALL
      );
      
      return response.data.map((room) => ({
        id: room.id ?? "",
        nome: room.nome ?? "",
      }));
    } catch (error) {
      console.error("Erro ao buscar salas filtradas:", error);
      throw error;
    }
  }

  /**
   * Cadastrar nova sala de aula
   */
  static async createClassRoom(
    request: ClassRoomCreateRequest
  ): Promise<ClassRoom> {
    try {
      const response = await api.post<ClassRoom>(
        API_ENDPOINTS.CLASSROOM.REGISTER,
        request
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao cadastrar sala:", error);
      throw error;
    }
  }

  /**
   * Buscar sala por ID
   */
  static async getClassRoomById(id: string): Promise<ClassRoom> {
    try {
      const response = await api.get<ClassRoom>(
        API_ENDPOINTS.CLASSROOM.GET_BY_ID,
        {
          params: { id },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar sala com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Atualizar sala existente
   */
  static async updateClassRoom(
    request: ClassRoomUpdateRequest
  ): Promise<ClassRoom> {
    try {
      if (!request.id) {
        throw new Error("ID é obrigatório para atualizar uma sala");
      }

      const response = await api.put<ClassRoom>(
        API_ENDPOINTS.CLASSROOM.UPDATE,
        request
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar sala:", error);
      throw error;
    }
  }

  /**
   * Desativar sala (soft delete)
   */
  static async disableClassRoom(id: string): Promise<void> {
    try {
      await api.put(`${API_ENDPOINTS.CLASSROOM.DISABLE}/${id}`);
    } catch (error) {
      console.error(`Erro ao desativar sala com ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Verificar se uma sala existe por ID
   */
  static async classRoomExists(id: string): Promise<boolean> {
    try {
      await this.getClassRoomById(id);
      return true;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return false;
      }
      throw error;
    }
  }

  /**
   * Buscar salas por aluno
   */
  static async getClassRoomsByAluno(alunoId: string): Promise<ClassRoom[]> {
    try {
      const allClassRooms = await this.getAllClassRooms();
      return allClassRooms.filter((room) => room.alunoId === alunoId);
    } catch (error) {
      console.error(`Erro ao buscar salas do aluno ${alunoId}:`, error);
      throw error;
    }
  }

  /**
   * Buscar salas por personal
   */
  static async getClassRoomsByPersonal(personalId: string): Promise<ClassRoom[]> {
    try {
      const allClassRooms = await this.getAllClassRooms();
      return allClassRooms.filter((room) => room.personalId === personalId);
    } catch (error) {
      console.error(`Erro ao buscar salas do personal ${personalId}:`, error);
      throw error;
    }
  }

  /**
   * Buscar salas ativas (não desativadas)
   */
  static async getActiveClassRooms(): Promise<ClassRoom[]> {
    try {
      const allClassRooms = await this.getAllClassRooms();
      return allClassRooms.filter((room) => !room.dataDesativacao);
    } catch (error) {
      console.error("Erro ao buscar salas ativas:", error);
      throw error;
    }
  }
}