"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  AlertCircle, 
  ArrowLeft, 
  Calendar, 
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";
import { useAnamneseById, useTreinosCompativeis } from "@/hooks/useAnamnese";
import { ScoreCategoryBadge, TreinosCompatibilidade, RadarChart } from "@/components/Anamnese";
import { ECategoriaAnamnese, EClassificacaoAnamnese } from "@/types/anamnese";

interface AnamneseDetailsClientProps {
  id: string;
}

export default function AnamneseDetailsClient({ id }: AnamneseDetailsClientProps) {
  const router = useRouter();
  const { anamnese, isLoading, error } = useAnamneseById(id);
  const { treinos, isLoading: isLoadingTreinos } = useTreinosCompativeis(id);
  const [showAllRespostas, setShowAllRespostas] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-brand-500" />
          <p className="text-gray-600 dark:text-gray-400">
            Carregando detalhes da anamnese...
          </p>
        </div>
      </div>
    );
  }

  if (error || !anamnese) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => router.push("/anamnese")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={20} />
          Voltar para Minhas Anamneses
        </button>

        <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-1 flex-shrink-0 text-red-500" size={24} />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-300">
                Erro ao carregar anamnese
              </h3>
              <p className="mt-1 text-sm text-red-800 dark:text-red-200">
                {error || "Anamnese não encontrada"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getClassificacaoInfo = (classificacao: EClassificacaoAnamnese) => {
    switch (classificacao) {
      case EClassificacaoAnamnese.TreinoAutomatico:
        return {
          icon: CheckCircle,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-50 dark:bg-green-900/20",
          borderColor: "border-green-200 dark:border-green-800",
          label: "Liberado para Treino",
          description: "Você está apto para iniciar atividades físicas"
        };
      case EClassificacaoAnamnese.Atencao:
        return {
          icon: AlertTriangle,
          color: "text-yellow-600 dark:text-yellow-400",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-800",
          label: "Atenção Necessária",
          description: "Recomenda-se supervisão profissional durante os treinos"
        };
      case EClassificacaoAnamnese.AvaliacaoObrigatoria:
        return {
          icon: XCircle,
          color: "text-red-600 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-800",
          label: "Avaliação Médica Obrigatória",
          description: "É necessário apresentar atestado médico para iniciar atividades"
        };
    }
  };

  const classificacaoInfo = getClassificacaoInfo(anamnese.classificacaoFinal);
  const ClassificacaoIcon = classificacaoInfo.icon;

  const categorias = [
    { 
      tipo: ECategoriaAnamnese.Cardiovascular, 
      score: anamnese.scoreCardiovascular,
      label: "Cardiovascular"
    },
    { 
      tipo: ECategoriaAnamnese.Lesoes, 
      score: anamnese.scoreLesoes,
      label: "Lesões"
    },
    { 
      tipo: ECategoriaAnamnese.Sedentarismo, 
      score: anamnese.scoreSedentarismo,
      label: "Sedentarismo"
    },
    { 
      tipo: ECategoriaAnamnese.Demografico, 
      score: anamnese.scoreDemografico,
      label: "Demográfico"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.push("/anamnese")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <ArrowLeft size={20} />
        Voltar para Minhas Anamneses
      </button>

      {/* Header Card */}
      <div className={`rounded-lg border-2 p-6 ${classificacaoInfo.borderColor} ${classificacaoInfo.bgColor}`}>
        <div className="flex items-start gap-4">
          <ClassificacaoIcon className={`flex-shrink-0 ${classificacaoInfo.color}`} size={32} />
          <div className="flex-1">
            <h2 className={`mb-1 text-2xl font-bold ${classificacaoInfo.color}`}>
              {classificacaoInfo.label}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {classificacaoInfo.description}
            </p>
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  Preenchido em {new Date(anamnese.dataPreenchimento).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>{anamnese.nomeFicha}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scores por Categoria */}
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-dark">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Pontuação por Categoria
        </h3>
        
        {/* Radar Chart */}
        <div className="mb-8">
          <RadarChart
            cardiovascular={anamnese.scoreCardiovascular}
            lesoes={anamnese.scoreLesoes}
            sedentarismo={anamnese.scoreSedentarismo}
            demografico={anamnese.scoreDemografico}
          />
        </div>

        {/* Category Badges */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categorias.map((cat) => (
            <div key={cat.tipo} className="text-center">
              <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                {cat.label}
              </p>
              <ScoreCategoryBadge categoria={cat.tipo} score={cat.score} size="lg" />
            </div>
          ))}
        </div>
        <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
          <div className="text-center">
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Pontuação Total
            </p>
            <div className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-2xl font-bold ${classificacaoInfo.bgColor} ${classificacaoInfo.color}`}>
              {anamnese.scoreTotalFinal} pontos
            </div>
          </div>
        </div>
      </div>

      {/* Respostas */}
      {anamnese.respostas && anamnese.respostas.length > 0 && (
        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-dark">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Respostas do Questionário
            </h3>
            <button
              onClick={() => setShowAllRespostas(!showAllRespostas)}
              className="text-sm text-brand-500 hover:text-brand-600"
            >
              {showAllRespostas ? "Ocultar" : "Ver Todas"}
            </button>
          </div>
          
          <div className="space-y-4">
            {(showAllRespostas ? anamnese.respostas : anamnese.respostas.slice(0, 5)).map((resposta, index) => (
              <div 
                key={index}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <p className="mb-2 font-medium text-gray-900 dark:text-white">
                  {index + 1}. {resposta.textoPergunta}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Resposta:</strong> {resposta.textoResposta}
                </p>
              </div>
            ))}
          </div>

          {!showAllRespostas && anamnese.respostas.length > 5 && (
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Mostrando 5 de {anamnese.respostas.length} respostas
            </p>
          )}
        </div>
      )}

      {/* Observações do Profissional */}
      {anamnese.observacoesProfissional && (
        <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
          <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-300">
            Observações do Profissional
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            {anamnese.observacoesProfissional}
          </p>
        </div>
      )}

      {/* Treinos Compatíveis */}
      <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-dark">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Treinos Compatíveis com seu Perfil
        </h3>
        {isLoadingTreinos ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
          </div>
        ) : (
          <TreinosCompatibilidade treinos={treinos} />
        )}
      </div>
    </div>
  );
}
