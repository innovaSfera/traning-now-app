import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import { getTableDataFinanceiro } from "@/components/Tables/fetch";
import ModalFinanceiro from "@/components/ui-elements/modal-financeiro";
import { TableFilterFinanceiro } from "@/components/Tables/financeiro";

export default async function Financeiro() {
  const data = await getTableDataFinanceiro();

  const typedData = data.map((item) => ({
    ...item,
    status: item.status as "Ativo" | "Desativo" | "Excluido",
  }));

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewMenuGroup />
      </Suspense>

      <Breadcrumb pageName="Financeiro" />

      <div className="my-5">
        <ModalFinanceiro />
      </div>

      <div className="space-y-10 pb-24">
        <TableFilterFinanceiro data={typedData} />
      </div>

      <MenuMobile />
    </>
  );
}
