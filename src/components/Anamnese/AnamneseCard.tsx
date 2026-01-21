"use client";

import { CheckCircle, XCircle, AlertCircle, Calendar, FileText } from "lucide-react";
import Link from "next/link";
import {
  ClassificacaoColors,
  ClassificacaoDescricoes,
  type FichaAnamneseRespondida,
} from "@/types/anamnese";
import ScoreCategoryBadge from "./ScoreCategoryBadge";

interface AnamneseCardProps {
  anamnese: FichaAnamneseRespondida;
  showDetails?: boolean;
}

export default function AnamneseCard({
  anamnese,
  showDetails = true,
}: AnamneseCardProps) {
  const colors = ClassificacaoColors[anamnese.classificacaoFinal];
  
  const getClassificacaoIcon = () => {
    switch (anamnese.classificacaoFinal) {
      case 1: // TreinoAutomatico
        return <CheckCircle className="text-green-500" size={32} />;
      case 2: // Atencao
        return <AlertCircle className="text-yellow-500" size={32} />;
      case 3: // AvaliacaoObrigatoria
        return <XCircle className="text-red-500" size={32} />;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-dark">
      {/* Header com Classificação */}
      <div className={`border-b-4 p-6 ${colors.border} ${colors.bg}`}>
        <div className="flex items-center gap-4">
          {getClassificacaoIcon()}
          <div className="flex-1">
            <h2 className={`text-2xl font-bold ${colors.text}`}>
              {ClassificacaoDescricoes[anamnese.classificacaoFinal]}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {anamnese.classificacaoMensagem}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Score Total</div>
            <div className={`text-4xl font-bold ${colors.text}`}>
              {anamnese.scoreTotalFinal}
            </div>
          </div>
        </div>
      </div>

      {/* Informações da Ficha */}
      <div className="border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <FileText size={16} />
            <span>{anamnese.nomeFicha}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} />
            <span>{formatDate(anamnese.dataPreenchimento)}</span>
          </div>
        </div>
      </div>

      {/* Scores por Categoria */}
      {showDetails && (
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Análise por Categoria
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ScoreCategoryBadge
              categoria="Cardiovascular"
              score={anamnese.scoreCardiovascular}
            />
            <ScoreCategoryBadge
              categoria="Lesões"
              score={anamnese.scoreLesoes}
            />
            <ScoreCategoryBadge
              categoria="Sedentarismo"
              score={anamnese.scoreSedentarismo}
            />
            <ScoreCategoryBadge
              categoria="Demográfico"
              score={anamnese.scoreDemografico}
            />
          </div>

          {/* Observações do Profissional */}
          {anamnese.observacoesProfissional && (
            <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-300">
                Observações do Profissional
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {anamnese.observacoesProfissional}
              </p>
            </div>
          )}

          {/* Botão Ver Detalhes */}
          {anamnese.id && (
            <div className="mt-6">
              <Link
                href={`/anamnese/${anamnese.id}`}
                className="block w-full rounded-lg bg-brand-500 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Ver Detalhes Completos
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
