import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import { getTableDataServicos } from "@/components/Tables/fetch";
import { getTableDataSubServicos } from "@/components/Tables/fetch";
import ModalServicos from "@/components/ui-elements/modal-servicos";
import ModalSubServicos from "@/components/ui-elements/modal-subservicos";
import { TableFilterServicos } from "@/components/Tables/servicos";
import { TableFilterSubServicos } from "@/components/Tables/subservicos";

export default async function Servicos() {
  const data = await getTableDataServicos();
  const datasub = await getTableDataSubServicos();

  return (
    <div>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewMenuGroup />
      </Suspense>

      <Breadcrumb pageName="Serviços" />

      {/* Serviço */}
      <div className="my-5">
        <ModalServicos />
      </div>

      <div className="space-y-10 pb-24">
        <TableFilterServicos data={data} />
      </div>

      {/* Sub-serviço */}
      <div className="my-5">
        <ModalSubServicos />
      </div>

      <div className="space-y-10 pb-24">
        <TableFilterSubServicos data={datasub} />
      </div>

      <MenuMobile />
    </div>
  );
}
