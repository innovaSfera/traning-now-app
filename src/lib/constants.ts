/**
 * Constantes e configurações da API
 */

export const API_CONFIG = {
  BASE_URL: {
    PRODUCTION: "https://traning-now-api-h9b4a0b0duc6cjaq.eastus2-01.azurewebsites.net/api",
    DEVELOPMENT: "http://localhost:5286/api",
  },
  TIMEOUT: 10000,
  STORAGE_KEYS: {
    TOKEN: "token",
    USER: "user",
  },
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/AuthUser/LoginPrestador",
    REGISTER: "/User/RegisterUser",
    BUSCAR_PRESTADOR: "/Autenticacao/BuscarPrestador",
  },
  CLASSROOM: {
    GET_ALL: "/ClassRoom/GetAllClassRoom",
    REGISTER: "/ClassRoom/RegisterClassRoom",
    GET_BY_ID: "/ClassRoom/GetClassRoomId",
    UPDATE: "/ClassRoom/UpdateClassRoom",
    DISABLE: "/ClassRoom/DesableClassRoom",
    GET_BY_STUDENT_ID: "/ClassRoom/GetClassRoomStudentId",
  },
  // Adicione mais endpoints conforme necessário
  TRAINING: {
    LIST: "/training",
    CREATE: "/training",
    UPDATE: "/training",
    DELETE: "/training",
  },
  CLIENTS: {
    LIST: "/clients",
    CREATE: "/clients",
    UPDATE: "/clients",
    DELETE: "/clients",
  },
  ANAMNESE: {
    // Fichas (Templates)
    GET_FICHAS: "/anamnese/fichas",
    GET_FICHA_BY_ID: "/anamnese/ficha",
    
    // Anamnese Respondida
    GET_ATIVA_ALUNO: "/anamnese/ativa/aluno",
    GET_HISTORICO_ALUNO: "/anamnese/historico/aluno",
    GET_BY_ID: "/anamnese/respondida",
    PREENCHER: "/anamnese/preencher",
    ADICIONAR_OBSERVACOES: "/anamnese/observacoes",
    
    // Compatibilidade e Verificação
    TREINOS_COMPATIVEIS: "/anamnese/TreinosCompativeis",
    VERIFICAR_LIBERACAO: "/anamnese/verificar-liberacao",
    GET_BY_CLASSIFICACAO: "/anamnese/classificacao",
  },
} as const;