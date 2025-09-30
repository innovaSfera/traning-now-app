import { useState, useEffect } from 'react';
import { ClassRoomService } from '@/services';
import type { ClassRoom } from '@/types/classroom';

interface UseStudentClassRoomsResult {
  classRooms: ClassRoom[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook personalizado para buscar salas de aula do aluno logado
 * Utiliza o token de autenticação para identificar o aluno automaticamente
 */
export function useStudentClassRooms(): UseStudentClassRoomsResult {
  const [classRooms, setClassRooms] = useState<ClassRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClassRooms = async () => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Buscando salas do aluno logado via token...');
      
      const studentClassRooms = await ClassRoomService.getClassRoomsByStudentToken();
      
      console.log('Salas encontradas:', studentClassRooms);
      
      setClassRooms(studentClassRooms);
      
    } catch (err: any) {
      console.error('Erro ao buscar salas do aluno:', err);
      
      let errorMessage = 'Erro ao carregar salas. Tente novamente mais tarde';
      
      if (err.response?.status === 404) {
        errorMessage = 'Nenhuma sala encontrada para este aluno';
      } else if (err.response?.status === 401) {
        errorMessage = 'Não autorizado. Faça login novamente';
      } else if (err.code === 'NETWORK_ERROR') {
        errorMessage = 'Erro de conexão. Verifique sua internet';
      }
      
      setError(errorMessage);
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClassRooms();
  }, []);

  return {
    classRooms,
    isLoading,
    error,
    refetch: fetchClassRooms,
  };
}