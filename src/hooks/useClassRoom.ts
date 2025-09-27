"use client";

import { useState, useCallback } from "react";
import { ClassRoomService } from "@/services";
import type { 
  ClassRoom, 
  ClassRoomCreateRequest, 
  ClassRoomUpdateRequest,
  ClassRoomFilter 
} from "@/types/classroom";

/**
 * Hook personalizado para gerenciar salas de aula
 */
export const useClassRoom = () => {
  const [classRooms, setClassRooms] = useState<ClassRoom[]>([]);
  const [currentClassRoom, setCurrentClassRoom] = useState<ClassRoom | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Buscar todas as salas
   */
  const fetchAllClassRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await ClassRoomService.getAllClassRooms();
      setClassRooms(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao buscar salas";
      setError(errorMessage);
      console.error("Erro ao buscar salas:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Buscar salas com filtro (id + nome apenas)
   */
  const fetchClassRoomsFilter = useCallback(async (): Promise<ClassRoomFilter[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await ClassRoomService.getAllClassRoomsFilter();
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao buscar filtros de salas";
      setError(errorMessage);
      console.error("Erro ao buscar filtros:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Buscar sala por ID
   */
  const fetchClassRoomById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await ClassRoomService.getClassRoomById(id);
      setCurrentClassRoom(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao buscar sala";
      setError(errorMessage);
      console.error(`Erro ao buscar sala ${id}:`, err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Criar nova sala
   */
  const createClassRoom = useCallback(async (request: ClassRoomCreateRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newClassRoom = await ClassRoomService.createClassRoom(request);
      setClassRooms(prev => [...prev, newClassRoom]);
      return newClassRoom;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao criar sala";
      setError(errorMessage);
      console.error("Erro ao criar sala:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Atualizar sala existente
   */
  const updateClassRoom = useCallback(async (request: ClassRoomUpdateRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedClassRoom = await ClassRoomService.updateClassRoom(request);
      
      setClassRooms(prev => 
        prev.map(room => 
          room.id === updatedClassRoom.id ? updatedClassRoom : room
        )
      );
      
      if (currentClassRoom?.id === updatedClassRoom.id) {
        setCurrentClassRoom(updatedClassRoom);
      }
      
      return updatedClassRoom;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao atualizar sala";
      setError(errorMessage);
      console.error("Erro ao atualizar sala:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentClassRoom]);

  /**
   * Desativar sala
   */
  const disableClassRoom = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await ClassRoomService.disableClassRoom(id);
      
      // Remover da lista ou marcar como desativada
      setClassRooms(prev => prev.filter(room => room.id !== id));
      
      if (currentClassRoom?.id === id) {
        setCurrentClassRoom(null);
      }
      
      return true;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao desativar sala";
      setError(errorMessage);
      console.error("Erro ao desativar sala:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentClassRoom]);

  /**
   * Buscar salas ativas
   */
  const fetchActiveClassRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await ClassRoomService.getActiveClassRooms();
      setClassRooms(data);
      return data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Erro ao buscar salas ativas";
      setError(errorMessage);
      console.error("Erro ao buscar salas ativas:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Limpar erro
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // Estados
    classRooms,
    currentClassRoom,
    isLoading,
    error,
    
    // Ações
    fetchAllClassRooms,
    fetchClassRoomsFilter,
    fetchClassRoomById,
    createClassRoom,
    updateClassRoom,
    disableClassRoom,
    fetchActiveClassRooms,
    clearError,
    
    // Utilitários
    setCurrentClassRoom,
  };
};