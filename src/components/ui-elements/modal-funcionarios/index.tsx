"use client";

import { useState } from "react";
import { Button } from "../button";
import { ShowcaseSection } from "../../Layouts/showcase-section";
import InputGroup from "../../FormElements/InputGroup";
import DatePickerOne from "../../FormElements/DatePicker/DatePickerOne";
import { Select } from "../../FormElements/select";
import { Plus } from "lucide-react";

export default function ModalFuncionarios() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-lg dark:bg-gray-800">
            <ShowcaseSection
              title="Novo funcionário"
              className="space-y-5.5 !p-6.5"
            >
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <InputGroup
                  required
                  label="Nome do funcionário"
                  placeholder="Digite o nome"
                  type="text"
                />

                <InputGroup
                  required
                  label="Cargo"
                  placeholder="Digite o cargo"
                  type="text"
                />

                <InputGroup
                  required
                  label="RG"
                  placeholder="Digite o RG"
                  type="text"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    let value = e.currentTarget.value.replace(/\D/g, "");
                    value = value.replace(/(\d{2})(\d)/, "$1.$2");
                    value = value.replace(/(\d{3})(\d)/, "$1.$2");
                    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
                    e.currentTarget.value = value;
                  }}
                />

                <InputGroup
                  required
                  label="Órgão emissoro"
                  placeholder="Digite o endereço"
                  type="text"
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
                  label="Email"
                  placeholder="Digite o email"
                  type="email"
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
                  label="Município"
                  placeholder="Digite o município"
                  type="text"
                />

                <InputGroup
                  required
                  label="Username"
                  placeholder="Digite o username"
                  type="text"
                />

                <InputGroup
                  required
                  label="Password"
                  placeholder="Digite o password"
                  type="password"
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
        label="Novo funcionário"
        icon={<Plus />}
        variant="primary"
        shape="full"
        onClick={() => setIsOpen(true)}
      />
    </>
  );
}
