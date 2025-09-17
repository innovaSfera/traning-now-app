import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import ButtonModal from "@/components/ui-elements/button-modal";
import { InvoiceTableClient } from "@/components/Tables/filtro";
import { getInvoiceTableData } from "@/components/Tables/fetch";

export default async function Clientes() {
  const data = await getInvoiceTableData();

  const typedData = data.map((item) => ({
    ...item,
    status: item.status as "Ativo" | "Desativo" | "Excluido",
  }));

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewMenuGroup />
      </Suspense>

      <Breadcrumb pageName="Clientes" />

      <div className="my-5">
        <ButtonModal />
      </div>

      <div className="space-y-10 pb-24">
        <InvoiceTableClient data={typedData} />
      </div>

      <MenuMobile />
    </>
  );
};


