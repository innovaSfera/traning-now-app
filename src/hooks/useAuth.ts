"use client";

import { useState, useEffect } from "react";
import { AuthService } from "@/services";

/**
 * Hook para gerenciar estado de autenticação
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ userName: string; roles: string[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação ao carregar
    const checkAuth = () => {
      const authenticated = AuthService.isAuthenticated();
      const currentUser = AuthService.getCurrentUser();
      
      setIsAuthenticated(authenticated);
      setUser(currentUser);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: {
    email: string;
    PassUser: string;
    userName: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await AuthService.loginPrestador(credentials);
      
      setIsAuthenticated(true);
      setUser({
        userName: response.data.userName,
        roles: response.data.roles,
      });
      
      return response;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Erro no logout:", error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };
};