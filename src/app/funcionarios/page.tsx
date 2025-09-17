import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import { getTableDataFuncionarios } from "@/components/Tables/fetch";
import ModalFuncionarios from "@/components/ui-elements/modal-funcionarios";
import { TableFilterFuncionarios } from "@/components/Tables/funcionarios";

export default async function Funcionarios() {
  const data = await getTableDataFuncionarios();

  const typedData = data.map((item) => ({
    ...item,
    status: item.status as "Ativo" | "Desativo" | "Excluido",
  }));

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewMenuGroup />
      </Suspense>

      <Breadcrumb pageName="Funcionários" />

      <div className="my-5">
        <ModalFuncionarios />
      </div>

      <div className="space-y-10 pb-24">
        <TableFilterFuncionarios data={typedData} />
      </div>

      <MenuMobile />
    </>
  );
}
