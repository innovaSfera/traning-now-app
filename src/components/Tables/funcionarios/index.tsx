"use client";

import { useState } from "react";
import { TableFuncionarios } from "./table";

type Props = {
  data: {
    name: string;
    status: "Ativo" | "Desativo" | "Excluido";
  }[];
};

export function TableFilterFuncionarios({ data }: Props) {
  const [filtro, setFiltro] = useState<
    "Todos" | "Ativo" | "Desativo" | "Excluido"
  >("Todos");

  const funcionariosFiltrados =
    filtro === "Todos" ? data : data.filter((item) => item.status === filtro);

  const filtros: ("Todos" | "Ativo" | "Desativo" | "Excluido")[] = [
    "Todos",
    "Ativo",
    "Desativo",
    "Excluido",
  ];

  return (
    <div>
      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              filtro === f
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-2 dark:text-gray-300 dark:hover:bg-dark-3"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <TableFuncionarios data={funcionariosFiltrados} />
    </div>
  );
}
