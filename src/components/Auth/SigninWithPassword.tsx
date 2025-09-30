"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SigninWithPassword() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  
  const [data, setData] = useState({
    email: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
    userName: "",
    remember: false,
  });

  const [forgot, setForgot] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validação básica
    if (!data.email || !data.password) {
      setError("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    // Para o username, vamos usar o email como fallback se não for fornecido
    const userName = data.userName || data.email.split('@')[0];

    try {
      const response = await login({
        email: data.email,
        PassUser: data.password,
        userName: userName,
      });

      if (response.data.authenticated) {
        setSuccess("Login realizado com sucesso! Redirecionando...");
        setTimeout(() => {
          window.location.href = "/calendar";
        }, 1500);
      } else {
        setError(response.data.message || "Erro na autenticação");
      }
    } catch (error: any) {
      console.error("Erro no login:", error);
      
      // Tratamento de diferentes tipos de erro
      if (error.response?.status === 401) {
        setError("Email ou senha incorretos");
      } else if (error.response?.status === 400) {
        setError("Dados inválidos. Verifique os campos preenchidos");
      } else if (error.code === 'NETWORK_ERROR') {
        setError("Erro de conexão. Verifique sua internet");
      } else {
        setError("Erro interno do servidor. Tente novamente mais tarde");
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-3xl font-semibold text-dark dark:text-white sm:text-heading-3"
      >
        Bem-vindo de volta! 👋
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-10 w-full max-w-[375px] text-lg font-medium text-dark dark:text-white"
      >
        Por favor, entre com sua conta preenchendo os campos necessários abaixo.
      </motion.p>

      <form onSubmit={handleSubmit}>
        {/* Alertas de erro e sucesso */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 rounded-lg bg-red-100 border border-red-400 text-red-700 px-4 py-3 dark:bg-red-900/20 dark:border-red-600 dark:text-red-400"
            >
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 rounded-lg bg-green-100 border border-green-400 text-green-700 px-4 py-3 dark:bg-green-900/20 dark:border-green-600 dark:text-green-400"
            >
              <p className="text-sm font-medium">{success}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <InputGroup
            type="email"
            label="E-mail"
            className="mb-4 [&_input]:py-[15px]"
            placeholder="Digite seu endereço de email"
            name="email"
            handleChange={handleChange}
            value={data.email}
            icon={<EmailIcon />}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <InputGroup
            type="password"
            label="Senha"
            className="mb-5 [&_input]:py-[15px]"
            placeholder="Digite sua senha"
            name="password"
            handleChange={handleChange}
            value={data.password}
            icon={<PasswordIcon />}
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-4.5"
        >
          <button
            type="submit"
            disabled={isLoading}
            className={`flex w-full items-center justify-center gap-2 rounded-lg p-3 font-medium text-white transition ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-primary hover:scale-[1.02] hover:bg-primary/90'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </button>
        </motion.div>
      </form>

      {/* Botão "Esqueci minha senha" */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        onClick={() => setForgot(true)}
        className="mt-4 flex w-full items-center justify-center rounded-lg bg-gray-700 p-3 font-medium text-white transition hover:bg-gray-600"
      >
        Esqueci minha senha
      </motion.button>

      {/* Modal com animação no background */}
      <AnimatePresence>
        {forgot && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay escuro com opacidade */}
            <motion.div
              key="overlay"
              className="absolute inset-0 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setForgot(false)}
            />

            {/* Card modal */}
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 max-h-180 rounded-lg bg-white p-6 shadow-xl dark:bg-gray-900"
            >
              <h3 className="mb-4 text-2xl font-medium text-dark dark:text-white">
                Recuperar senha
              </h3>

              <p className="mb-6 text-lg text-dark-4 dark:text-dark-6">
                Digite seu email para receber as instruções de recuperação.
              </p>

              <InputGroup
                type="email"
                label="E-mail"
                className="mb-6 [&_input]:py-[16px]"
                placeholder="Digite seu endereço de email"
                name="email"
                handleChange={handleChange}
                value={data.email}
                icon={<EmailIcon />}
              />

              <button className="w-full rounded-md bg-primary py-2 font-medium text-white hover:bg-opacity-90">
                Enviar
              </button>

              <button
                onClick={() => setForgot(false)}
                className="mt-4 w-full rounded-md bg-gray-700 py-2 font-medium text-white hover:bg-opacity-80"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
