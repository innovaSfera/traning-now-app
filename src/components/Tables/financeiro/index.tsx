"use client";

import { useState } from "react";
import { TableFinanceiro } from "./table";

type Props = {
  data: {
    name: string;
    status: "Ativo" | "Desativo" | "Excluido";
  }[];
};

export function TableFilterFinanceiro({ data }: Props) {
  const [filtro, setFiltro] = useState<
    "Todos" | "Ativo" | "Desativo" | "Excluido"
  >("Todos");

  const financeiroFiltrados =
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

      <TableFinanceiro data={financeiroFiltrados} />
    </div>
  );
}
