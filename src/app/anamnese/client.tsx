"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FileText, AlertCircle, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useAnamneseAtiva, useHistoricoAnamnese, useTreinosCompativeis } from "@/hooks/useAnamnese";
import { AnamneseCard, AnamneseHistory, TreinosCompatibilidade } from "@/components/Anamnese";
import { API_CONFIG } from "@/lib/constants";

export default function AnamneseClientPage() {
  const router = useRouter();
  const { anamnese, isLoading, error } = useAnamneseAtiva();
  const { historico, isLoading: isLoadingHistorico } = useHistoricoAnamnese();
  const [alunoId, setAlunoId] = useState<string | null>(null);
  const { treinos, isLoading: isLoadingTreinos } = useTreinosCompativeis(alunoId);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Buscar ID do aluno do localStorage (ajuste conforme sua estrutura de auth)
    if (typeof window !== "undefined") {
      const user = localStorage.getItem(API_CONFIG.STORAGE_KEYS.USER);
      if (user) {
        try {
          const userData = JSON.parse(user);
          setAlunoId(userData.id || userData.userId || null);
        } catch (err) {
          console.error("Erro ao parsear dados do usuário:", err);
        }
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-brand-500" />
          <p className="text-gray-600 dark:text-gray-400">
            Carregando sua anamnese...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-1 flex-shrink-0 text-red-500" size={24} />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-300">
              Erro ao carregar anamnese
            </h3>
            <p className="mt-1 text-sm text-red-800 dark:text-red-200">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Se não houver anamnese ativa
  if (!anamnese) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-dark">
          <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            Você ainda não preencheu uma anamnese
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            A anamnese é importante para avaliar sua condição física e recomendar
            treinos adequados ao seu perfil.
          </p>
          <button
            onClick={() => router.push("/anamnese/preencher")}
            className="rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Preencher Anamnese Agora
          </button>
        </div>

        {/* Histórico (se houver) */}
        {!isLoadingHistorico && historico.length > 0 && (
          <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-dark">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              Anamneses Anteriores
            </h3>
            <AnamneseHistory historico={historico} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Card Principal da Anamnese Ativa */}
      <AnamneseCard anamnese={anamnese} showDetails={true} />

      {/* Treinos Compatíveis */}
      {alunoId && (
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
      )}

      {/* Histórico (Colapsável) */}
      {!isLoadingHistorico && historico.length > 1 && (
        <div className="rounded-lg bg-white shadow dark:bg-gray-dark">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Histórico de Anamneses ({historico.length - 1} anteriores)
            </h3>
            {showHistory ? (
              <ChevronUp className="text-gray-500" size={24} />
            ) : (
              <ChevronDown className="text-gray-500" size={24} />
            )}
          </button>
          
          {showHistory && (
            <div className="border-t border-gray-200 p-6 dark:border-gray-700">
              <AnamneseHistory 
                historico={historico.filter(h => h.id !== anamnese.id)} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
