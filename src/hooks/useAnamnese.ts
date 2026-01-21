"use client";

import { useState, useEffect } from "react";
import { AnamneseService } from "@/services";
import type {
  FichaAnamnese,
  FichaAnamneseRespondida,
  PreencherAnamneseRequest,
  TreinoCompativel,
  VerificacaoLiberacao,
} from "@/types/anamnese";

/**
 * Hook para buscar anamnese ativa do aluno logado
 */
export const useAnamneseAtiva = () => {
  const [anamnese, setAnamnese] = useState<FichaAnamneseRespondida | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnamnese = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await AnamneseService.getAnamneseAtivaAluno();
      setAnamnese(data);
    } catch (err: any) {
      console.error("Erro ao buscar anamnese ativa:", err);
      setError(err.message || "Erro ao buscar anamnese");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnamnese();
  }, []);

  return {
    anamnese,
    isLoading,
    error,
    refetch: fetchAnamnese,
  };
};

/**
 * Hook para buscar histórico de anamneses do aluno
 */
export const useHistoricoAnamnese = () => {
  const [historico, setHistorico] = useState<FichaAnamneseRespondida[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistorico = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await AnamneseService.getHistoricoAluno();
      setHistorico(data);
    } catch (err: any) {
      console.error("Erro ao buscar histórico:", err);
      setError(err.message || "Erro ao buscar histórico");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorico();
  }, []);

  return {
    historico,
    isLoading,
    error,
    refetch: fetchHistorico,
  };
};

/**
 * Hook para buscar fichas disponíveis para preenchimento
 */
export const useFichasDisponiveis = () => {
  const [fichas, setFichas] = useState<FichaAnamnese[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFichas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await AnamneseService.getFichasDisponiveis();
      setFichas(data);
    } catch (err: any) {
      console.error("Erro ao buscar fichas:", err);
      setError(err.message || "Erro ao buscar fichas");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFichas();
  }, []);

  return {
    fichas,
    isLoading,
    error,
    refetch: fetchFichas,
  };
};

/**
 * Hook para preencher anamnese
 */
export const usePreencherAnamnese = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const mutateAsync = async (
    payload: PreencherAnamneseRequest
  ): Promise<FichaAnamneseRespondida> => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const resultado = await AnamneseService.preencherAnamnese(payload);
      
      setSuccess(true);
      return resultado;
    } catch (err: any) {
      console.error("Erro ao preencher anamnese:", err);
      setError(err.message || "Erro ao preencher anamnese");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return {
    mutateAsync,
    isLoading,
    error,
    success,
    reset,
  };
};

/**
 * Hook para buscar treinos compatíveis
 */
export const useTreinosCompativeis = (alunoId: string | null) => {
  const [treinos, setTreinos] = useState<TreinoCompativel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTreinos = async () => {
    if (!alunoId) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await AnamneseService.getTreinosCompatibilisAluno(alunoId);
      setTreinos(data);
    } catch (err: any) {
      console.error("Erro ao buscar treinos compatíveis:", err);
      setError(err.message || "Erro ao buscar treinos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alunoId) {
      fetchTreinos();
    }
  }, [alunoId]);

  return {
    treinos,
    treinosCompativeis: treinos.filter((t) => t.compativel),
    treinosIncompativeis: treinos.filter((t) => !t.compativel),
    isLoading,
    error,
    refetch: fetchTreinos,
  };
};

/**
 * Hook para verificar liberação do aluno
 */
export const useVerificarLiberacao = (alunoId: string | null) => {
  const [verificacao, setVerificacao] = useState<VerificacaoLiberacao | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verificar = async () => {
    if (!alunoId) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await AnamneseService.verificarLiberacao(alunoId);
      setVerificacao(data);
    } catch (err: any) {
      console.error("Erro ao verificar liberação:", err);
      setError(err.message || "Erro ao verificar liberação");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (alunoId) {
      verificar();
    }
  }, [alunoId]);

  return {
    verificacao,
    liberado: verificacao?.liberado ?? false,
    isLoading,
    error,
    refetch: verificar,
  };
};

/**
 * Hook para buscar anamnese por ID
 */
export const useAnamneseById = (id: string | null) => {
  const [anamnese, setAnamnese] = useState<FichaAnamneseRespondida | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnamnese = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await AnamneseService.getAnamneseById(id);
      setAnamnese(data);
    } catch (err: any) {
      console.error("Erro ao buscar anamnese:", err);
      setError(err.message || "Erro ao buscar anamnese");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAnamnese();
    }
  }, [id]);

  return {
    anamnese,
    isLoading,
    error,
    refetch: fetchAnamnese,
  };
};

// Alias for backwards compatibility and clarity
export const useFichasAnamnese = useFichasDisponiveis;

