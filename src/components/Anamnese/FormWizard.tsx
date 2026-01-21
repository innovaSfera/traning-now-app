"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import type { 
  FichaAnamnese, 
  PerguntaAnamnese,
  RespostaAnamneseConfig
} from "@/types/anamnese";

interface AnamneseFormWizardProps {
  ficha: FichaAnamnese;
  onSubmit: (respostas: { perguntaAnamneseId: string; respostaConfigId: string }[]) => Promise<void>;
  onCancel: () => void;
}

export function AnamneseFormWizard({ ficha, onSubmit, onCancel }: AnamneseFormWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [respostas, setRespostas] = useState<Map<string, string>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const perguntas = ficha.perguntas || [];
  const totalPerguntas = perguntas.length;
  const perguntaAtual = perguntas[currentStep];
  const progress = ((currentStep + 1) / totalPerguntas) * 100;

  const handleRespostaChange = (perguntaId: string, respostaId: string) => {
    const newRespostas = new Map(respostas);
    newRespostas.set(perguntaId, respostaId);
    setRespostas(newRespostas);
  };

  const handleNext = () => {
    if (currentStep < totalPerguntas - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const respostasArray = Array.from(respostas.entries()).map(([perguntaId, respostaId]) => ({
        perguntaAnamneseId: perguntaId,
        respostaConfigId: respostaId,
      }));
      await onSubmit(respostasArray);
    } catch (error) {
      console.error("Erro ao enviar anamnese:", error);
      alert("Erro ao enviar anamnese. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCurrentStepAnswered = perguntaAtual?.id && respostas.has(perguntaAtual.id);
  const canGoNext = isCurrentStepAnswered && currentStep < totalPerguntas - 1;
  const canSubmit = respostas.size === totalPerguntas;

  if (!perguntaAtual) {
    return (
      <div className="rounded-lg bg-red-50 p-6 dark:bg-red-900/20">
        <p className="text-red-800 dark:text-red-200">
          Erro ao carregar perguntas da anamnese.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Pergunta {currentStep + 1} de {totalPerguntas}
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {Math.round(progress)}% completo
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-full bg-brand-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-dark md:p-8">
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white md:text-2xl">
            {perguntaAtual.textoPergunta}
          </h3>
          {perguntaAtual.tipoPerguntaDescricao && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {perguntaAtual.tipoPerguntaDescricao}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {perguntaAtual.respostasConfig?.map((resposta: RespostaAnamneseConfig) => {
            const isSelected = respostas.get(perguntaAtual.id || "") === resposta.id;
            
            return (
              <button
                key={resposta.id}
                onClick={() => handleRespostaChange(perguntaAtual.id || "", resposta.id || "")}
                className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                  isSelected
                    ? "border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-900/20"
                    : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                      isSelected
                        ? "border-brand-500 bg-brand-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {resposta.textoResposta}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={currentStep === 0 ? onCancel : handlePrevious}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={20} />
          {currentStep === 0 ? "Cancelar" : "Anterior"}
        </button>

        {currentStep === totalPerguntas - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Check size={20} />
                Finalizar
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Próxima
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Bottom Info */}
      <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Dica:</strong> Responda com sinceridade todas as perguntas. 
          Isso ajudará a recomendar treinos adequados ao seu perfil de saúde.
        </p>
      </div>
    </div>
  );
}
