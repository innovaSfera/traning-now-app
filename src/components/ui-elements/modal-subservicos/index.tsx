"use client";

import { useState } from "react";
import { Button } from "../button";
import { ShowcaseSection } from "../../Layouts/showcase-section";
import InputGroup from "../../FormElements/InputGroup";
import { Select } from "../../FormElements/select";
import { Plus } from "lucide-react";

export default function ModalSubServicos() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <ShowcaseSection
              title="Cadastro sub-serviço"
              className="space-y-5.5 !p-6.5"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <InputGroup
                  required
                  label="Título"
                  placeholder="Digite o título"
                  type="text"
                />

                <InputGroup
                  required
                  label="Descrição"
                  placeholder="Digite a descrição"
                  type="text"
                />

                <Select
                  label="Categoria"
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Desativo", value: "Desativo" },
                    { label: "Excluido", value: "Excluido" },
                  ]}
                  defaultValue="Ativo"
                />

                <InputGroup
                  required
                  label="Valor"
                  placeholder="Digite o valor"
                  type="number"
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
        label="Cadastro sub-serviço"
        icon={<Plus />}
        variant="primary"
        shape="full"
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}
