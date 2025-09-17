"use client";

import { useState } from "react";
import { Button } from "../button";
import { ShowcaseSection } from "../../Layouts/showcase-section";
import InputGroup from "../../FormElements/InputGroup";
import { Plus } from "lucide-react";

export default function ModalUnidades() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <ShowcaseSection
              title="Nova unidade"
              className="space-y-5.5 !p-6.5"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <InputGroup
                  required
                  label="Nome da unidade"
                  placeholder="Digite o nome"
                  type="text"
                />

                <InputGroup
                  required
                  label="CEP"
                  placeholder="Digite o CEP"
                  type="text"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    let value = e.currentTarget.value.replace(/\D/g, "");
                    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
                    e.currentTarget.value = value;
                  }}
                />

                <InputGroup
                  required
                  label="Rua"
                  placeholder="Digite a rua"
                  type="text"
                />

                <InputGroup
                  required
                  label="Número"
                  placeholder="Digite o número"
                  type="number"
                />

                <InputGroup
                  required
                  label="UF"
                  placeholder="Digite o UF"
                  type="text"
                />

                <InputGroup
                  required
                  label="Telefone"
                  placeholder="Digite o telefone"
                  type="tel"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    let value = e.currentTarget.value.replace(/\D/g, "");
                    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
                    value = value.replace(/(\d{5})(\d)/, "$1-$2");
                    e.currentTarget.value = value;
                  }}
                />

                <InputGroup
                  required
                  label="CNPJ"
                  placeholder="Digite o CNPJ"
                  type="text"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    let value = e.currentTarget.value.replace(/\D/g, "");
                    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
                    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
                    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
                    value = value.replace(/(\d{4})(\d)/, "$1-$2");
                    e.currentTarget.value = value;
                  }}
                />

                <InputGroup
                  required
                  label="Observação"
                  placeholder="Alguma observação?"
                  type="text"
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
        label="Nova unidade"
        icon={<Plus />}
        variant="primary"
        shape="full"
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}
