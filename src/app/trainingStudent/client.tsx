"use client";

import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ExerciseList from "@/components/ExerciseList/page";
import { ClassRoomService } from "@/services";
import { convertClassRoomsToExerciseGroups, createFallbackExerciseGroups, type ExerciseGroup } from "@/utils/exerciseConverter";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";

export default function TrainingStudentClient() {
  const [exercisesGroups, setExercisesGroups] = useState<ExerciseGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTrainings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Buscar dados reais da API
      const classRooms = await ClassRoomService.getClassRoomsByStudentToken();
      
      // Converter dados da API para formato do ExerciseList
      const convertedGroups = convertClassRoomsToExerciseGroups(classRooms);
      
      // Se não houver dados, usar fallback
      if (convertedGroups.length === 0) {
        setExercisesGroups(createFallbackExerciseGroups());
      } else {
        setExercisesGroups(convertedGroups);
      }
    } catch (err: any) {
      console.error("Erro ao carregar treinos do estudante:", err);
      
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      
      // Em caso de erro, usar dados de fallback
      setExercisesGroups(createFallbackExerciseGroups());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTrainings();
  }, []);

  const getErrorMessage = (error: any): string => {
    if (error?.response?.status === 401) {
      return "Não autorizado. Faça login novamente.";
    }
    
    if (error?.response?.status === 404) {
      return "Nenhum treino encontrado para este aluno.";
    }
    
    if (error?.message?.includes('Network')) {
      return "Erro de conexão. Verifique sua internet.";
    }
    
    return "Erro ao carregar treinos. Dados de exemplo foram carregados.";
  };

  const handleRetry = () => {
    loadTrainings();
  };

  if (isLoading) {
    return (
      <>
        <Breadcrumb pageName="Treinos" />
        
        <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-body-color dark:text-dark-6">
            Carregando seus treinos...
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Treinos" />

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/10">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400" />
            <div className="flex-1">
              <p className="text-sm text-red-800 dark:text-red-200">
                {error}
              </p>
              <button
                onClick={handleRetry}
                className="mt-2 inline-flex items-center space-x-1 text-sm font-medium text-red-800 hover:text-red-600 dark:text-red-200 dark:hover:text-red-100"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Tentar novamente</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <ExerciseList initialExercises={exercisesGroups} />
    </>
  );
}