/**
 * Exemplo de dados extraídos da API para a Marisa Rozario
 * Dados filtrados do responsetraning.json
 */

export const marisaExampleData = [
  {
    nome: "Mobilidade fullbody", // Nome da aula
    alunoId: "6fcacf44-fa71-4f75-aefe-5ccd9472482c",
    personalId: "bc35931d-1ab0-49f7-eb4b-08dd82be649e",
    treinoId: "dc39809d-0302-4d8b-1e7e-08ddc9872760",
    aluno: {
      nome: "Marisa Rozario",
      email: "marisarozario@gmail.com",
      altura: 1.7,
      peso: 89,
      id: "6fcacf44-fa71-4f75-aefe-5ccd9472482c"
    },
    treino: {
      nome: "Projetinho beto carrero", // Nome do treino
      satisfacao: "Fácil",
      duracao: 15,
      exerciseTrainings: [
        {
          exerciseId: "8fc736f8-83d1-4c1e-6a25-08dd82be73fc",
          exercise: {
            nome: "Supino retos", // Nome do exercício
            carga: "10",
            repeticao: "10", 
            intervalo: "10"
          },
          carga: "1", // Carga específica para este treino
          repeticao: "5", // Repetições específicas para este treino
          intervalo: "15", // Intervalo específico para este treino (segundos)
          ordem: 2
        },
        {
          exerciseId: "91a36942-8cb3-4d34-585e-08ddf65ce899",
          exercise: {
            nome: "Agachamento", // Nome do exercício
            carga: "10",
            repeticao: "1",
            intervalo: "1"
          },
          carga: "50", // Carga específica para este treino
          repeticao: "12", // Repetições específicas para este treino
          intervalo: "30", // Intervalo específico para este treino (segundos)
          ordem: 2
        }
      ]
    },
    personal: {
      nome: "Rafael Godoi",
      email: "caous.g@gmail.com"
    }
  }
];

/**
 * Resultado esperado após conversão:
 * 
 * [
 *   {
 *     groupName: "Projetinho beto carrero - Mobilidade fullbody",
 *     groupImage: "/exercicio.jpg",
 *     exercises: [
 *       {
 *         id: 1,
 *         name: "Supino retos",
 *         reps: 5,
 *         weight: "1kg",
 *         time: "00:15",
 *         media: "/exercicio2.jpg",
 *         checked: false
 *       },
 *       {
 *         id: 2, 
 *         name: "Agachamento",
 *         reps: 12,
 *         weight: "50kg", 
 *         time: "00:30",
 *         media: "/exercicio.jpg",
 *         checked: false
 *       }
 *     ]
 *   }
 * ]
 */