/**
 * Types para o sistema de Anamnese Multi-Categoria
 */

// ========== ENUMS ==========

export enum EClassificacaoAnamnese {
  TreinoAutomatico = 1,
  Atencao = 2,
  AvaliacaoObrigatoria = 3,
}

export enum ECategoriaAnamnese {
  Cardiovascular = 1,
  Lesoes = 2,
  Sedentarismo = 3,
  Demografico = 4,
}

export enum ETipoPergunta {
  SimNao = 1,
  MultiplaEscolha = 2,
  EscalaNumerica = 3,
  TextoLivre = 4,
}

export enum ENivelRisco {
  Baixo = 1,
  Medio = 2,
  Alto = 3,
}

// ========== INTERFACES ==========

/**
 * Breakdown de scores por categoria
 */
export interface ScoreBreakdown {
  scoreCardiovascular: number;
  scoreLesoes: number;
  scoreSedentarismo: number;
  scoreDemografico: number;
  scoreTotalFinal: number;
}

/**
 * Configuração de resposta de anamnese
 */
export interface RespostaAnamneseConfig {
  id?: string;
  perguntaAnamneseId: string;
  textoResposta: string;
  nivelRisco: ENivelRisco;
  nivelRiscoDescricao?: string;
  ordemExibicao: number;
  
  // Pontuação multi-categoria
  pontuacaoCardiovascular?: number;
  pontuacaoLesoes?: number;
  pontuacaoSedentarismo?: number;
  pontuacaoDemografico?: number;
  
  ativa: boolean;
}

/**
 * Pergunta de anamnese
 */
export interface PerguntaAnamnese {
  id?: string;
  fichaAnamneseId: string;
  textoPergunta: string;
  tipoPergunta: ETipoPergunta;
  tipoPerguntaDescricao?: string;
  obrigatoria: boolean;
  ordemExibicao: number;
  peso: number;
  respostasConfig: RespostaAnamneseConfig[];
  ativa: boolean;
}

/**
 * Ficha de Anamnese (Template)
 */
export interface FichaAnamnese {
  id?: string;
  nome: string;
  descricao?: string;
  genero?: string; // "Masculino" | "Feminino" | "Ambos"
  ehFichaSistema: boolean;
  perguntas: PerguntaAnamnese[];
  ativa: boolean;
  dataCadastro?: Date;
}

/**
 * Resposta do aluno para uma pergunta
 */
export interface RespostaAluno {
  id?: string;
  fichaAnamneseRespondidaId?: string;
  perguntaAnamneseId: string;
  respostaConfigId?: string;
  valorResposta?: string;
  textoPergunta?: string;
  textoResposta?: string;
  pontuacaoCalculada?: number;
}

/**
 * Ficha de Anamnese Respondida pelo aluno
 */
export interface FichaAnamneseRespondida {
  id?: string;
  alunoId: string;
  nomeAluno?: string;
  fichaAnamneseId: string;
  nomeFicha?: string;
  dataPreenchimento: Date;
  
  // Scores multi-categoria
  scoreTotalFinal: number;
  scoreCardiovascular: number;
  scoreLesoes: number;
  scoreSedentarismo: number;
  scoreDemografico: number;
  
  // Classificação
  classificacaoFinal: EClassificacaoAnamnese;
  classificacaoDescricao?: string;
  classificacaoMensagem?: string;
  
  // Observações
  observacoesProfissional?: string;
  
  // Respostas
  respostas: RespostaAluno[];
  
  ativa: boolean;
}

/**
 * Request para preencher anamnese
 */
export interface PreencherAnamneseRequest {
  alunoId: string;
  fichaAnamneseId: string;
  respostas: {
    perguntaAnamneseId: string;
    respostaConfigId?: string;
    valorResposta?: string;
  }[];
}

/**
 * Treino compatível com base na anamnese
 */
export interface TreinoCompativel {
  id: string;
  nome: string;
  descricao?: string;
  compativel: boolean;
  motivosIncompatibilidade: string[];
}

/**
 * Verificação de liberação do aluno
 */
export interface VerificacaoLiberacao {
  alunoId: string;
  liberado: boolean;
  classificacao: EClassificacaoAnamnese;
  classificacaoDescricao: string;
  scoreTotalFinal: number;
  mensagem: string;
  dataUltimaAnamnese?: Date;
  necessitaNovaAnamnese: boolean;
}

// ========== HELPERS ==========

/**
 * Mapa de cores para classificação
 */
export const ClassificacaoColors = {
  [EClassificacaoAnamnese.TreinoAutomatico]: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-300",
    badge: "bg-green-500",
  },
  [EClassificacaoAnamnese.Atencao]: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-300",
    badge: "bg-yellow-500",
  },
  [EClassificacaoAnamnese.AvaliacaoObrigatoria]: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-300",
    badge: "bg-red-500",
  },
};

/**
 * Descrições de classificação
 */
export const ClassificacaoDescricoes = {
  [EClassificacaoAnamnese.TreinoAutomatico]: "Liberado para Treino",
  [EClassificacaoAnamnese.Atencao]: "Requer Atenção",
  [EClassificacaoAnamnese.AvaliacaoObrigatoria]: "Avaliação Obrigatória",
};

/**
 * Ícones de classificação
 */
export const ClassificacaoIcons = {
  [EClassificacaoAnamnese.TreinoAutomatico]: "✅",
  [EClassificacaoAnamnese.Atencao]: "⚠️",
  [EClassificacaoAnamnese.AvaliacaoObrigatoria]: "❌",
};
