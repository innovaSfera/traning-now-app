import type { ClassRoom } from '@/types/classroom';

// Tipos para compatibilidade com ExerciseList
export type Exercise = {
  id: number;
  name: string;
  reps: number;
  weight: string;
  time: string;
  media: string;
  checked: boolean;
};

export interface ExerciseGroup {
  groupName: string;
  groupImage: string;
  exercises: Exercise[];
}

/**
 * Converte dados de ClassRoom da API para o formato esperado pelo ExerciseList
 */
export function convertClassRoomsToExerciseGroups(classRooms: ClassRoom[]): ExerciseGroup[] {
  if (!classRooms || classRooms.length === 0) {
    return [];
  }

  // Agrupar ClassRooms por treino
  const groupedByTreino = classRooms.reduce((acc, room) => {
    const treinoNome = room.treino?.nome || room.nome || 'Treino Sem Nome';
    const aulaName = room.nome || 'Aula';
    
    // Criar chave única combinando treino e aula
    const groupKey = `${treinoNome} - ${aulaName}`;
    
    if (!acc[groupKey]) {
      acc[groupKey] = {
        treino: room.treino,
        aula: aulaName,
        exerciseTrainings: []
      };
    }
    
    // Adicionar os exerciseTrainings do treino
    if (room.treino?.exerciseTrainings) {
      acc[groupKey].exerciseTrainings.push(...room.treino.exerciseTrainings);
    }
    
    return acc;
  }, {} as Record<string, { treino: any, aula: string, exerciseTrainings: any[] }>);

  // Converter cada grupo para o formato esperado
  return Object.entries(groupedByTreino).map(([groupKey, groupData], groupIndex) => {
    const exercises: Exercise[] = groupData.exerciseTrainings.map((exerciseTraining, exerciseIndex) => ({
      id: groupIndex * 100 + exerciseIndex + 1, // ID único
      name: exerciseTraining.exercise?.nome || 'Exercício',
      reps: parseInt(exerciseTraining.repeticao || '10'),
      weight: `${exerciseTraining.carga || '0'}kg`,
      time: formatTime(exerciseTraining.intervalo || '60'), // intervalo em segundos para formato MM:SS
      media: getExerciseImage(exerciseTraining.exercise?.nome || ''),
      checked: false,
    }));

    return {
      groupName: groupKey,
      groupImage: getGroupImage(groupData.aula),
      exercises,
    };
  });
}

/**
 * Gera um número aleatório de repetições (8-15)
 */
function generateRandomReps(): number {
  return Math.floor(Math.random() * 8) + 8; // 8-15 reps
}

/**
 * Gera um peso aleatório baseado no tipo de exercício
 */
function generateRandomWeight(): string {
  const weights = ['40kg', '50kg', '60kg', '70kg', '80kg', '90kg'];
  return weights[Math.floor(Math.random() * weights.length)];
}

/**
 * Retorna a imagem adequada baseada no nome do exercício
 */
function getExerciseImage(exercicioNome: string): string {
  const nome = exercicioNome.toLowerCase();
  
  if (nome.includes('perna') || nome.includes('agachamento') || nome.includes('leg')) {
    return '/exercicio.jpg';
  }
  
  if (nome.includes('peito') || nome.includes('supino') || nome.includes('chest')) {
    return '/exercicio2.jpg';
  }
  
  // Alterna entre as duas imagens disponíveis
  return Math.random() > 0.5 ? '/exercicio.jpg' : '/exercicio2.jpg';
}

/**
 * Retorna a imagem do grupo baseada no nome do treino
 */
function getGroupImage(treinoNome: string): string {
  const nome = treinoNome.toLowerCase();
  
  if (nome.includes('a') || nome.includes('perna') || nome.includes('inferior')) {
    return '/exercicio.jpg';
  }
  
  if (nome.includes('b') || nome.includes('peito') || nome.includes('superior')) {
    return '/exercicio2.jpg';
  }
  
  // Padrão baseado no índice do nome
  return treinoNome.charCodeAt(0) % 2 === 0 ? '/exercicio.jpg' : '/exercicio2.jpg';
}

/**
 * Converte segundos em formato MM:SS
 */
function formatTime(seconds: string): string {
  const totalSeconds = parseInt(seconds) || 60;
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;
  
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Função auxiliar para criar dados de fallback caso a API falhe
 */
export function createFallbackExerciseGroups(): ExerciseGroup[] {
  return [
    {
      groupName: "Treino A",
      groupImage: "/exercicio.jpg",
      exercises: [
        {
          id: 1,
          name: "Perna",
          reps: 12,
          weight: "60kg",
          time: "01:30",
          media: "/exercicio.jpg",
          checked: false,
        },
      ],
    },
    {
      groupName: "Treino B",
      groupImage: "/exercicio2.jpg",
      exercises: [
        {
          id: 2,
          name: "Peito",
          reps: 10,
          weight: "80kg",
          time: "02:00",
          media: "/exercicio2.jpg",
          checked: false,
        },
      ],
    },
  ];
}