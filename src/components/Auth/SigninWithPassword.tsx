"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="relative overflow-hidden rounded-xl p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-3xl font-semibold text-white sm:text-heading-3"
      >
        Bem-vindo de volta! 👋
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-10 w-full max-w-[375px] text-lg font-medium text-white/90"
      >
        Por favor, entre com sua conta preenchendo os campos necessários abaixo.
      </motion.p>

      <form onSubmit={handleSubmit}>
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
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
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
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mb-4.5"
        >
          <Link href="/calendar">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary p-3 font-medium text-white transition hover:scale-[1.02]"
            >
              Entrar
            </button>
          </Link>
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
