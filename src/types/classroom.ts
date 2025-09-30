/**
 * Tipos e interfaces para ClassRoom e entidades relacionadas
 */

// Enum para sexo
export enum Gender {
  MALE = 0,
  FEMALE = 1,
  OTHER = 2,
}

// Interface base para entidades com campos de auditoria
export interface BaseEntity {
  id?: string | null;
  dataCadastro?: Date | null;
  usrCadastro?: string | null;
  usrDescricaoCadastro?: string | null;
  dataDesativacao?: Date | null;
  usrDesativacao?: string | null;
  usrDescricaoDesativacao?: string | null;
  prestadorId?: string | null;
  academiaId?: string | null;
}

// Interface para Aluno
export interface Aluno extends BaseEntity {
  nome?: string;
  dataNascimento?: Date | null;
  idade?: number | null;
  imc?: number | null;
  altura?: number;
  peso?: number;
  sexo?: Gender;
  endereco?: string;
  email?: string;
  contato?: string;
  patologia?: string;
  experienciaAcademia?: string | null;
  cpf?: string;
  rg?: string;
  redeSocial?: string | null;
  score?: number;
}

// Interface para Exercise
export interface Exercise extends BaseEntity {
  nome?: string;
  carga?: string;
  repeticao?: string;
  intervalo?: string;
  observacao?: string | null;
  linkAula?: string | null;
  categoria?: string;
  exerciseTrainings?: ExerciseTraining[] | null;
}

// Interface para ExerciseTraining
export interface ExerciseTraining extends BaseEntity {
  exerciseId?: string;
  exercise?: Exercise | null;
  trainingId?: string;
  training?: Treino | null;
  carga?: string;
  repeticao?: string;
  intervalo?: string;
  observacao?: string;
  ordem?: number;
}

// Interface para Treino
export interface Treino extends BaseEntity {
  nome?: string;
  satisfacao?: string | null; // "Fácil", "Mediano", "Difícil"
  duracao?: number; // em minutos
  aulas?: ClassRoom[] | null;
  exerciseTrainings?: ExerciseTraining[] | null;
}

// Interface para Personal
export interface Personal extends BaseEntity {
  nome?: string;
  dataNascimento?: Date | null;
  idade?: number | null;
  sexo?: Gender;
  endereco?: string;
  email?: string;
  contato?: string;
  cpf?: string;
  rg?: string;
  redeSocial?: string | null;
  especialidade?: string;
  cref?: string;
  score?: number;
  alunoId?: string | null;
}

// Interface principal para ClassRoom
export interface ClassRoom extends BaseEntity {
  nome?: string;
  alunoId?: string;
  personalId?: string;
  treinoId?: string;
  
  // Relacionamentos (objetos completos)
  aluno?: Aluno | null;
  treino?: Treino | null;
  personal?: Personal | null;
}

// Tipos para filtros e DTOs
export interface ClassRoomFilter {
  id: string;
  nome: string;
}

// Tipos para requests específicos
export interface ClassRoomCreateRequest extends Omit<ClassRoom, 'id' | 'dataCadastro' | 'aluno' | 'treino' | 'personal'> {
  // Campos obrigatórios para criação
  nome: string;
}

export interface ClassRoomUpdateRequest extends ClassRoom {
  id: string; // ID obrigatório para update
}