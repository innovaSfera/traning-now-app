/**
 * Barrel export para todos os serviços da API
 */

export { AuthService } from "./auth";
export { ApiService } from "./api";
export { ClassRoomService } from "./classroom";
export { AnamneseService } from "./anamnese";

// Re-exportar tipos comuns
export type {
  PrestadorLoginRequestDto,
  RegisterUserRequest,
  TokenResponseDto,
  UserModelResponseDto,
  ApiResponse,
  ApiError,
} from "@/types/api";

export type {
  ClassRoom,
  ClassRoomFilter,
  ClassRoomCreateRequest,
  ClassRoomUpdateRequest,
  Aluno,
  Treino,
  Personal,
  Gender,
} from "@/types/classroom";

export type {
  FichaAnamnese,
  FichaAnamneseRespondida,
  PerguntaAnamnese,
  RespostaAnamneseConfig,
  RespostaAluno,
  PreencherAnamneseRequest,
  TreinoCompativel,
  VerificacaoLiberacao,
  ScoreBreakdown,
  EClassificacaoAnamnese,
  ETipoPergunta,
  ENivelRisco,
} from "@/types/anamnese";