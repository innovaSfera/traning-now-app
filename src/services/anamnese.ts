import { api } from "@/lib/axios";
import { API_ENDPOINTS } from "@/lib/constants";
import type {
  FichaAnamnese,
  FichaAnamneseRespondida,
  PreencherAnamneseRequest,
  TreinoCompativel,
  VerificacaoLiberacao,
  EClassificacaoAnamnese,
} from "@/types/anamnese";

/**
 * Service para gerenciar Anamneses no app mobile
 * Focado em funcionalidades do aluno
 */
export class AnamneseService {
  /**
   * Buscar fichas de anamnese disponíveis para preenchimento
   */
  static async getFichasDisponiveis(): Promise<FichaAnamnese[]> {
    try {
      const response = await api.get<FichaAnamnese[]>(
        API_ENDPOINTS.ANAMNESE.GET_FICHAS
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar fichas de anamnese:", error);
      throw error;
    }
  }

  /**
   * Buscar ficha de anamnese por ID
   */
  static async getFichaById(id: string): Promise<FichaAnamnese> {
    try {
      const response = await api.get<FichaAnamnese>(
        `${API_ENDPOINTS.ANAMNESE.GET_FICHA_BY_ID}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar ficha de anamnese:", error);
      throw error;
    }
  }

  /**
   * Buscar anamnese ativa do aluno logado
   * Usa o token JWT para identificar o aluno
   */
  static async getAnamneseAtivaAluno(): Promise<FichaAnamneseRespondida | null> {
    try {
      const response = await api.get<FichaAnamneseRespondida>(
        API_ENDPOINTS.ANAMNESE.GET_ATIVA_ALUNO
      );
      return response.data;
    } catch (error: any) {
      // Se não houver anamnese ativa, retornar null ao invés de erro
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Erro ao buscar anamnese ativa:", error);
      throw error;
    }
  }

  /**
   * Buscar histórico de anamneses do aluno logado
   */
  static async getHistoricoAluno(): Promise<FichaAnamneseRespondida[]> {
    try {
      const response = await api.get<FichaAnamneseRespondida[]>(
        API_ENDPOINTS.ANAMNESE.GET_HISTORICO_ALUNO
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar histórico de anamnese:", error);
      throw error;
    }
  }

  /**
   * Buscar anamnese respondida por ID
   */
  static async getAnamneseById(id: string): Promise<FichaAnamneseRespondida> {
    try {
      const response = await api.get<FichaAnamneseRespondida>(
        `${API_ENDPOINTS.ANAMNESE.GET_BY_ID}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar anamnese:", error);
      throw error;
    }
  }

  /**
   * Preencher anamnese
   */
  static async preencherAnamnese(
    payload: PreencherAnamneseRequest
  ): Promise<FichaAnamneseRespondida> {
    try {
      const response = await api.post<FichaAnamneseRespondida>(
        API_ENDPOINTS.ANAMNESE.PREENCHER,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao preencher anamnese:", error);
      throw error;
    }
  }

  /**
   * Adicionar observações do profissional
   * (Geralmente usado por personal/admin, mas incluído para completude)
   */
  static async adicionarObservacoes(
    id: string,
    observacoes: string
  ): Promise<void> {
    try {
      await api.put(
        `${API_ENDPOINTS.ANAMNESE.ADICIONAR_OBSERVACOES}/${id}`,
        { observacoes }
      );
    } catch (error) {
      console.error("Erro ao adicionar observações:", error);
      throw error;
    }
  }

  /**
   * Buscar treinos compatíveis com o perfil do aluno logado
   */
  static async getTreinosCompatibilisAluno(
    alunoId: string
  ): Promise<TreinoCompativel[]> {
    try {
      const response = await api.get<TreinoCompativel[]>(
        `${API_ENDPOINTS.ANAMNESE.TREINOS_COMPATIVEIS}/${alunoId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar treinos compatíveis:", error);
      throw error;
    }
  }

  /**
   * Verificar liberação do aluno para treinos
   */
  static async verificarLiberacao(
    alunoId: string
  ): Promise<VerificacaoLiberacao> {
    try {
      const response = await api.get<VerificacaoLiberacao>(
        `${API_ENDPOINTS.ANAMNESE.VERIFICAR_LIBERACAO}/${alunoId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar liberação:", error);
      throw error;
    }
  }

  /**
   * Buscar anamneses por classificação
   * (Útil para filtros)
   */
  static async getByClassificacao(
    classificacao: EClassificacaoAnamnese
  ): Promise<FichaAnamneseRespondida[]> {
    try {
      const response = await api.get<FichaAnamneseRespondida[]>(
        `${API_ENDPOINTS.ANAMNESE.GET_BY_CLASSIFICACAO}/${classificacao}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar anamneses por classificação:", error);
      throw error;
    }
  }
}
