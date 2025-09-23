"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import Link from "next/link";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: process.env.NEXT_PUBLIC_DEMO_USER_MAIL || "",
    password: process.env.NEXT_PUBLIC_DEMO_USER_PASS || "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // You can remove this code block
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <h1 className="mb-4 text-2xl font-semibold text-dark dark:text-white sm:text-heading-3">
        Bem-vindo de volta!
      </h1>

      <p className="w-full max-w-[375px] text-lg font-medium text-dark-4 dark:text-dark-6 mb-10">
        Por favor, entre com sua conta preenchendo os campos necessários abaixo.
      </p>

      <form onSubmit={handleSubmit}>
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

        <div className="mb-4.5">
          <Link href="/calendar"
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          >
            Entrar
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
            )}
          </Link>
        </div>
      </form>
    </>
  );
}
