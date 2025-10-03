import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-5">
      <div className="max-w-2xl w-full text-center">
        <div className="mx-auto w-64 h-64 flex items-center justify-center mb-8">
          <img src="404.svg" alt="" />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-5">
          Ops... página não encontrada 😅
        </h1>

        <p className="text-gray-600 mb-8 text-xl">
          A página que você tentou acessar não existe ou foi movida.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center text-xl gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition"
          >
            Voltar para a página inicial
          </Link>
        </div>

        <p className="mt-8 text-lg text-gray-500">
          Se você digitou a URL, confira se não há erros de digitação.
        </p>
      </div>
    </main>
  );
}
