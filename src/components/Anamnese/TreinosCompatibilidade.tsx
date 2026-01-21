"use client";

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import type { TreinoCompativel } from "@/types/anamnese";

interface TreinosCompatibilidadeProps {
  treinos: TreinoCompativel[];
}

export default function TreinosCompatibilidade({
  treinos,
}: TreinosCompatibilidadeProps) {
  const treinosCompativeis = treinos.filter((t) => t.compativel);
  const treinosIncompativeis = treinos.filter((t) => !t.compativel);

  if (treinos.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-8 text-center dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">
          Nenhum treino disponível
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Treinos Compatíveis */}
      {treinosCompativeis.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <CheckCircle className="text-green-500" size={24} />
            Treinos Compatíveis ({treinosCompativeis.length})
          </h3>
          <div className="space-y-3">
            {treinosCompativeis.map((treino) => (
              <div
                key={treino.id}
                className="flex items-start justify-between rounded-lg border-2 border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {treino.nome}
                  </h4>
                  {treino.descricao && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {treino.descricao}
                    </p>
                  )}
                </div>
                <CheckCircle className="flex-shrink-0 text-green-500" size={20} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Treinos Incompatíveis */}
      {treinosIncompativeis.length > 0 && (
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <XCircle className="text-red-500" size={24} />
            Treinos Não Recomendados ({treinosIncompativeis.length})
          </h3>
          <div className="space-y-3">
            {treinosIncompativeis.map((treino) => (
              <div
                key={treino.id}
                className="rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20"
              >
                <div className="flex items-start gap-3">
                  <XCircle className="mt-1 flex-shrink-0 text-red-500" size={20} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {treino.nome}
                    </h4>
                    {treino.descricao && (
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {treino.descricao}
                      </p>
                    )}
                    {treino.motivosIncompatibilidade.length > 0 && (
                      <div className="mt-3 space-y-1">
                        <div className="flex items-center gap-2 text-sm font-medium text-red-700 dark:text-red-400">
                          <AlertTriangle size={16} />
                          Motivos:
                        </div>
                        <ul className="ml-6 space-y-1">
                          {treino.motivosIncompatibilidade.map((motivo, index) => (
                            <li
                              key={index}
                              className="text-sm text-gray-700 dark:text-gray-300"
                            >
                              • {motivo}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
