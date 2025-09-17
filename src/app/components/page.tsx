import { Mic, AudioWaveform, Plus } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import InputGPT from "@/components/InputGPT";

const ComponentsPage = () => {
  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewMenuGroup />
      </Suspense>

      <Breadcrumb pageName="Components" />

      <div className="space-y-10 pb-24">
        <div className="flex w-full items-center justify-center">
          <div className="flex w-full items-center rounded-full bg-[#1e1e1e] px-4 py-2 shadow-md">
            {/* Ícone da esquerda */}

            <button className="mr-2 rounded-full p-2 transition hover:bg-[#2a2a2a]">
              <Plus className="h-5 w-5 text-gray-400" />
            </button>

            <InputGPT />

            {/* Botões */}
            <button className="rounded-full p-2 transition hover:bg-[#2a2a2a]">
              <Mic className="h-5 w-5 text-gray-300" />
            </button>
            <button className="rounded-full p-2 transition hover:bg-[#2a2a2a]">
              <AudioWaveform className="h-5 w-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      <MenuMobile />
    </>
  );
};

export default ComponentsPage;
