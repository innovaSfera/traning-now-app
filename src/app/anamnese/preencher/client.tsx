"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, FileText } from "lucide-react";
import { AnamneseFormWizard } from "@/components/Anamnese/FormWizard";
import { useFichasAnamnese, usePreencherAnamnese } from "@/hooks/useAnamnese";
import type { FichaAnamnese } from "@/types/anamnese";

export default function PreencherAnamneseClient() {
  const router = useRouter();
  const { fichas, isLoading, error } = useFichasAnamnese();
  const { mutateAsync: preencherAnamnese } = usePreencherAnamnese();
  const [selectedFicha, setSelectedFicha] = useState<FichaAnamnese | null>(null);
  const [genero, setGenero] = useState<"Masculino" | "Feminino" | null>(null);

  // Selecionar automaticamente a ficha baseada no gênero quando as fichas carregarem
  useEffect(() => {
    if (fichas.length > 0 && genero && !selectedFicha) {
      const fichaPorGenero = fichas.find(
        (f) => f.genero === genero || f.genero === "Ambos"
      );
      if (fichaPorGenero) {
        setSelectedFicha(fichaPorGenero);
      }
    }
  }, [fichas, genero, selectedFicha]);

  const handleSubmit = async (respostas: { perguntaAnamneseId: string; respostaConfigId: string }[]) => {
    if (!selectedFicha || !selectedFicha.id) return;

    try {
      const resultado = await preencherAnamnese({
        alunoId: "", // Will be filled by backend from JWT token
        fichaAnamneseId: selectedFicha.id,
        respostas: respostas,
      });

      // Redirecionar para a página de resultado
      if (resultado.id) {
        router.push(`/anamnese/${resultado.id}`);
      }
    } catch (error) {
      console.error("Erro ao preencher anamnese:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    if (selectedFicha) {
      setSelectedFicha(null);
      setGenero(null);
    } else {
      router.push("/anamnese");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-brand-500" />
          <p className="text-gray-600 dark:text-gray-400">
            Carregando formulário de anamnese...
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
              Erro ao carregar formulário
            </h3>
            <p className="mt-1 text-sm text-red-800 dark:text-red-200">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Se não houver fichas disponíveis
  if (fichas.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-dark">
        <FileText className="mx-auto mb-4 h-16 w-16 text-gray-400" />
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Nenhuma ficha de anamnese disponível
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Entre em contato com seu personal trainer ou administração da academia.
        </p>
      </div>
    );
  }

  // Seleção de gênero
  if (!genero) {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-lg bg-white p-8 shadow dark:bg-gray-dark">
          <div className="mb-6 text-center">
            <FileText className="mx-auto mb-4 h-16 w-16 text-brand-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              Preencher Nova Anamnese
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Primeiro, precisamos saber seu gênero para selecionar o formulário adequado.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setGenero("Masculino")}
              className="w-full rounded-lg border-2 border-gray-200 bg-white p-6 text-left transition-all hover:border-brand-500 hover:bg-brand-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-400 dark:hover:bg-brand-900/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Masculino
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Formulário PAR-Q adaptado para homens
              </p>
            </button>

            <button
              onClick={() => setGenero("Feminino")}
              className="w-full rounded-lg border-2 border-gray-200 bg-white p-6 text-left transition-all hover:border-brand-500 hover:bg-brand-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-brand-400 dark:hover:bg-brand-900/20"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Feminino
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Formulário PAR-Q adaptado para mulheres (inclui perguntas sobre gravidez)
              </p>
            </button>
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Importante:</strong> Esta avaliação ajudará a identificar possíveis 
              riscos à saúde antes de iniciar atividades físicas. Responda com sinceridade.
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/anamnese")}
              className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Voltar para Minhas Anamneses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Formulário wizard
  if (selectedFicha) {
    return (
      <AnamneseFormWizard
        ficha={selectedFicha}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }

  // Loading state enquanto busca a ficha
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-brand-500" />
        <p className="text-gray-600 dark:text-gray-400">
          Preparando formulário...
        </p>
      </div>
    </div>
  );
}
