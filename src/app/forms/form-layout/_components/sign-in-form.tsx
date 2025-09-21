import { Checkbox } from "@/components/FormElements/checkbox";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Link from "next/link";

export function SignInForm() {
  return (
    <ShowcaseSection title="Sign In Form" className="!p-6.5">
      <form action="#">
        <InputGroup
          label="E-mail"
          type="email"
          placeholder="Digite seu endereço de email"
          className="mb-4.5"
        />

        <InputGroup
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
        />

        <div className="mb-5.5 mt-5 flex items-center justify-between">
          <Link href="#" className="text-body-sm text-primary hover:underline">
            Esqueceu a senha?
          </Link>
        </div>

        <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          Entrar
        </button>
      </form>
    </ShowcaseSection>
  );
}
