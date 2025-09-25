import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import ButtonModal from "@/components/ui-elements/button-modal";
import { InvoiceTableClient } from "@/components/Tables/filtro";
import { getInvoiceTableData } from "@/components/Tables/fetch";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

export default async function Traning() {
  const data = await getInvoiceTableData();

  const typedData = data.map((item) => ({
    ...item,
    status: item.status as "Fácil" | "Médio" | "Difícil",
  }));

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 pb-24 md:p-6 2xl:p-10">
          <Suspense fallback={<OverviewCardsSkeleton />}>
            <OverviewMenuGroup />
          </Suspense>

          <div className="my-6 flex w-full items-start justify-between gap-6 xl:flex-col">
            <Breadcrumb pageName="Editando treino" />

            <ButtonModal />
          </div>

          <div className="space-y-10 pb-24">
            <InvoiceTableClient data={typedData} />
          </div>

          <MenuMobile />
        </main>
      </div>
    </div>
  );
}
