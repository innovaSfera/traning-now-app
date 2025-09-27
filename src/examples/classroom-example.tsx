/**
 * Exemplo de uso do ClassRoomService
 * Este arquivo serve como referência para implementação
 */

"use client";

import { useState, useEffect } from "react";
import { useClassRoom } from "@/hooks/useClassRoom";
import { ClassRoomService } from "@/services";
import type { ClassRoomCreateRequest } from "@/types/classroom";

export default function ClassRoomExample() {
  const {
    classRooms,
    currentClassRoom,
    isLoading,
    error,
    fetchAllClassRooms,
    createClassRoom,
    updateClassRoom,
    disableClassRoom,
    clearError
  } = useClassRoom();

  const [formData, setFormData] = useState<ClassRoomCreateRequest>({
    nome: "",
    alunoId: "",
    personalId: "",
    treinoId: "",
  });

  // Carregar salas ao montar o componente
  useEffect(() => {
    fetchAllClassRooms();
  }, [fetchAllClassRooms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createClassRoom(formData);
      
      // Limpar formulário após sucesso
      setFormData({
        nome: "",
        alunoId: "",
        personalId: "",
        treinoId: "",
      });
      
      alert("Sala criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  };

  const handleDisable = async (id: string) => {
    if (confirm("Tem certeza que deseja desativar esta sala?")) {
      try {
        await disableClassRoom(id);
        alert("Sala desativada com sucesso!");
      } catch (error) {
        console.error("Erro ao desativar sala:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Salas de Aula</h1>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome da Sala:</label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({...formData, nome: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">ID do Aluno:</label>
          <input
            type="text"
            value={formData.alunoId}
            onChange={(e) => setFormData({...formData, alunoId: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">ID do Personal:</label>
          <input
            type="text"
            value={formData.personalId}
            onChange={(e) => setFormData({...formData, personalId: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Criando..." : "Criar Sala"}
        </button>
      </form>

      {/* Mensagens de erro */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
          <button onClick={clearError} className="ml-2 underline">
            Fechar
          </button>
        </div>
      )}

      {/* Loading */}
      {isLoading && <div className="text-center py-4">Carregando...</div>}

      {/* Lista de Salas */}
      <div className="grid gap-4">
        <h2 className="text-xl font-semibold">Salas Cadastradas ({classRooms.length})</h2>
        
        {classRooms.map((room) => (
          <div key={room.id} className="border p-4 rounded shadow">
            <h3 className="font-medium">{room.nome}</h3>
            <p className="text-sm text-gray-600">ID: {room.id}</p>
            {room.alunoId && <p className="text-sm">Aluno: {room.alunoId}</p>}
            {room.personalId && <p className="text-sm">Personal: {room.personalId}</p>}
            {room.treinoId && <p className="text-sm">Treino: {room.treinoId}</p>}
            
            <div className="mt-2 space-x-2">
              <button
                onClick={() => handleDisable(room.id!)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Desativar
              </button>
            </div>
          </div>
        ))}
        
        {classRooms.length === 0 && !isLoading && (
          <p className="text-gray-500 text-center py-8">
            Nenhuma sala encontrada
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Exemplo de uso direto do serviço (sem hook)
 */
export const classRoomDirectExample = async () => {
  try {
    // Buscar todas as salas
    const allRooms = await ClassRoomService.getAllClassRooms();
    console.log("Todas as salas:", allRooms);

    // Buscar apenas filtros (id + nome)
    const filters = await ClassRoomService.getAllClassRoomsFilter();
    console.log("Filtros:", filters);

    // Criar nova sala
    const newRoom = await ClassRoomService.createClassRoom({
      nome: "Sala de Musculação",
      alunoId: "aluno-123",
      personalId: "personal-456",
      treinoId: "treino-789",
    });
    console.log("Nova sala criada:", newRoom);

    // Buscar sala por ID
    if (newRoom.id) {
      const room = await ClassRoomService.getClassRoomById(newRoom.id);
      console.log("Sala encontrada:", room);
    }

    return allRooms;
  } catch (error) {
    console.error("Erro no exemplo:", error);
    throw error;
  }
};