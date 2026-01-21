"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import type { FichaAnamneseRespondida } from "@/types/anamnese";
import { ClassificacaoColors, ClassificacaoDescricoes } from "@/types/anamnese";

interface AnamneseHistoryProps {
  historico: FichaAnamneseRespondida[];
}

export default function AnamneseHistory({ historico }: AnamneseHistoryProps) {
  if (historico.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma anamnese anterior encontrada
        </p>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-3">
      {historico.map((anamnese) => {
        const colors = ClassificacaoColors[anamnese.classificacaoFinal];
        
        return (
          <Link
            key={anamnese.id}
            href={`/anamnese/${anamnese.id}`}
            className="block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-dark"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${colors.bg} ${colors.text}`}>
                    {ClassificacaoDescricoes[anamnese.classificacaoFinal]}
                  </span>
                  <span className={`text-2xl font-bold ${colors.text}`}>
                    {anamnese.scoreTotalFinal}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {anamnese.nomeFicha}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={16} />
                <span>{formatDate(anamnese.dataPreenchimento)}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
