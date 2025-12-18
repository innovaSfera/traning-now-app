import { api } from '@/lib/axios';

export interface Training {
  id?: string;
  nome: string;
  satisfacao?: string;
  diaSemana?: number;
  duracao?: number;
  exerciseTrainings?: any[];
  alunoId?: string;
}

export async function getTrainingsByStudentId(studentId: string): Promise<Training[]> {
  const response = await api.get(`/TrainingStudent/GetTrainingsByStudentId`, {
    params: { studentId },
  });
  return response.data;
}

export async function getTrainingsByDayOfWeek(dayOfWeek: number): Promise<Training[]> {
  const response = await api.get(`/TrainingStudent/GetTrainingsByDayOfWeek`, {
    params: { dayOfWeek },
  });
  return response.data;
}

export async function getAllTrainings(): Promise<Training[]> {
  const response = await api.get(`/TrainingStudent/GetAllTrainingStudent`);
  return response.data;
}
