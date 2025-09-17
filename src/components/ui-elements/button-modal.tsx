"use client";

import { useState } from "react";
import { Button } from "./button";
import { ShowcaseSection } from "../Layouts/showcase-section";
import InputGroup from "../FormElements/InputGroup";
import DatePickerOne from "../FormElements/DatePicker/DatePickerOne";
import { Select } from "../FormElements/select";
import { Plus } from "lucide-react";

export default function ButtonModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <ShowcaseSection
              title="Novo cliente"
              className="space-y-5.5 !p-6.5"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <InputGroup
                  required
                  label="Nome"
                  placeholder="Digite o nome"
                  type="text"
                />

                <InputGroup
                  required
                  label="RG"
                  placeholder="Digite o RG"
                  type="text"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    let value = e.currentTarget.value.replace(/\D/g, ""); // só números
                    value = value.replace(/(\d{2})(\d)/, "$1.$2");
                    value = value.replace(/(\d{3})(\d)/, "$1.$2");
                    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                    e.currentTarget.value = value;
                  }}
                />

                <DatePickerOne label="Data de nascimento" />

                <Select
                  label="Status"
                  items={[
                    { label: "Ativo", value: "Ativo" },
                    { label: "Desativo", value: "Desativo" },
                    { label: "Excluido", value: "Excluido" },
                  ]}
                  defaultValue="Ativo"
                />

                <InputGroup
                  required
                  label="Altura"
                  placeholder="Digite a altura"
                  type="text"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    let value = e.currentTarget.value.replace(/\D/g, "");
                    value = (parseInt(value) / 100)
                      .toFixed(2)
                      .replace(".", ","); // Ex: 70,50
                    e.currentTarget.value = value;
                  }}
                />

                <InputGroup
                  required
                  label="Peso"
                  placeholder="Digite o peso"
                  type="text"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    let value = e.currentTarget.value.replace(/\D/g, "");
                    value = (parseInt(value) / 100)
                      .toFixed(2)
                      .replace(".", ","); // Ex: 70,50
                    e.currentTarget.value = value;
                  }}
                />

                <Select
                  label="Sexo"
                  items={[
                    { label: "Masculino", value: "Masculino" },
                    { label: "Feminino", value: "Feminino" },
                  ]}
                  defaultValue="Masculino"
                />

                <InputGroup
                  required
                  label="Endereço"
                  placeholder="Digite o endereço"
                  type="text"
                />

                <InputGroup
                  required
                  label="Email"
                  placeholder="Digite o email"
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
        label="Novo cliente"
        icon={<Plus />}
        variant="primary"
        shape="full"
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}
