/**
 * Tipos e interfaces para autenticação e usuários
 */

// Enums
export enum UserRole {
  ADMIN = "admin",
  TRAINER = "trainer",
  CLIENT = "client",
}

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

// Interfaces de Request
export interface PrestadorLoginRequestDto {
  email: string;
  PassUser: string;
  userName: string;
}

export interface RegisterUserRequest {
  userName?: string;
  fullName?: string;
  email: string;
  password?: string;
  role: string;
  
  // Dados pessoais
  nome?: string;
  dataNascimento?: Date;
  idade?: number;
  sexo?: Gender;
  endereco?: string;
  contato?: string;
  cpf?: string;
  rg?: string;
  
  // Redes sociais
  redeSocial?: string;
  
  // Dados de saúde/fitness
  score?: number;
  imc?: number;
  altura?: number;
  peso?: number;
  patologia?: string;
  experienciaAcademia?: string;
  
  // Dados profissionais (para trainers)
  especialidade?: string;
  cref?: string;
}

// Interfaces de Response
export interface TokenResponseDto {
  authenticated: boolean;
  created?: string;
  expiration?: string;
  accessToken?: string;
  message?: string;
  roles: string[];
  userName: string;
}

export interface UserModelResponseDto {
  id: string;
  userName: string;
  email: string;
  roles?: string[];
}

// Tipos de resposta da API
export interface ApiResponse<T = any> {
  data: T;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}