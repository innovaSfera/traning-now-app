import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import AnamneseClientPage from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Anamnese | Training Now",
  description: "Visualize sua avaliação de saúde e treinos compatíveis",
};

export default function AnamnePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 pb-24 md:p-6 2xl:p-10">
          <Suspense fallback={<OverviewCardsSkeleton />}>
            <OverviewMenuGroup />
          </Suspense>

          <Breadcrumb pageName="Minha Anamnese" />

          <AnamneseClientPage />

          <MenuMobile />
        </main>
      </div>
    </div>
  );
}
