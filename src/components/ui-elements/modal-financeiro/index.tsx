"use client";

import { useState } from "react";
import { Button } from "../button";
import { ShowcaseSection } from "../../Layouts/showcase-section";
import InputGroup from "../../FormElements/InputGroup";
import { Select } from "../../FormElements/select";
import { Plus } from "lucide-react";

export default function ModalFinanceiro() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <ShowcaseSection
              title="Novo lançamento"
              className="space-y-5.5 !p-6.5"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <InputGroup
                  required
                  label="Nome da transação"
                  placeholder="Digite o nome"
                  type="text"
                />

                <InputGroup
                  required
                  label="Valores (R$)"
                  placeholder="Digite o valores"
                  type="number"
                />

                <Select
                  label="Status"
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Desativo", value: "Desativo" },
                    { label: "Excluido", value: "Excluido" },
                  ]}
                  defaultValue="Ativo"
                />

                <Select
                  label="Unidades"
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Desativo", value: "Desativo" },
                    { label: "Excluido", value: "Excluido" },
                  ]}
                  defaultValue="Ativo"
                />

                <Select
                  label="Fisioterapia"
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Desativo", value: "Desativo" },
                    { label: "Excluido", value: "Excluido" },
                  ]}
                  defaultValue="Ativo"
                />

                <Select
                  label="Cliente"
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Desativo", value: "Desativo" },
                    { label: "Excluido", value: "Excluido" },
                  ]}
                  defaultValue="Ativo"
                />

                <Select
                  label="Forma de pagamento"
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Desativo", value: "Desativo" },
                    { label: "Excluido", value: "Excluido" },
                  ]}
                  defaultValue="Ativo"
                />

                <Select
                  label="PJ ou CPF"
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Desativo", value: "Desativo" },
                    { label: "Excluido", value: "Excluido" },
                  ]}
                  defaultValue="Ativo"
                />

                <InputGroup
                  required
                  label="Conta"
                  placeholder="Digite a conta"
                  type="number"
                />

                <InputGroup
                  required
                  label="Número de parcelas"
                  placeholder="Digite as parcelas"
                  type="number"
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <InputGroup
                  type="file"
                  fileStyleVariant="style1"
                  label="Anexar comprovante"
                  placeholder="Attach file"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary px-4 py-2 text-white lg:w-auto"
                >
                  Adicionar
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 lg:w-auto"
                >
                  Fechar
                </button>
              </div>
            </ShowcaseSection>
          </div>
        </div>
      )}

      <Button
        label="Novo lançamento"
        icon={<Plus />}
        variant="primary"
        shape="full"
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}
