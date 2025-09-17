import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import { getTableDataUnidade } from "@/components/Tables/fetch";
import ModalUnidades from "@/components/ui-elements/modal-unidades";
import { TableFilterUnidade } from "@/components/Tables/unidades";

export default async function Unidades() {
  const data = await getTableDataUnidade();

  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewMenuGroup />
      </Suspense>

      <Breadcrumb pageName="Unidades" />

      <div className="my-5">
        <ModalUnidades />
      </div>

      <div className="space-y-10 pb-24">
        <TableFilterUnidade data={data} />
      </div>

      <MenuMobile />
    </>
  );
}
