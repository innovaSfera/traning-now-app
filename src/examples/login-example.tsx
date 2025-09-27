/**
 * Exemplo de uso dos serviços de API em uma página de login
 * Este arquivo serve como referência para implementação
 */

"use client";

import { useState } from "react";
import { AuthService, type PrestadorLoginRequestDto } from "@/services";
import { useAuth } from "@/hooks/useAuth";

export default function LoginExample() {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState<PrestadorLoginRequestDto>({
    email: "",
    PassUser: "",
    userName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await login(formData);
      
      if (response.data.authenticated) {
        console.log("Login realizado com sucesso!");
        // Redirecionar para dashboard ou página principal
      }
    } catch (error) {
      console.error("Erro no login:", error);
      // Mostrar mensagem de erro para o usuário
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label htmlFor="userName">Username:</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label htmlFor="PassUser">Senha:</label>
        <input
          type="password"
          id="PassUser"
          name="PassUser"
          value={formData.PassUser}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

/**
 * Exemplo de uso direto dos serviços (sem hook)
 */
export const loginDirectExample = async () => {
  try {
    const loginData: PrestadorLoginRequestDto = {
      email: "user@example.com",
      PassUser: "password123",
      userName: "username"
    };

    const response = await AuthService.loginPrestador(loginData);
    
    if (response.data.authenticated) {
      console.log("Login bem-sucedido!", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};