import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "@/app/(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "@/app/(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import PreencherAnamneseClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preencher Anamnese | Training Now",
  description: "Preencha sua avaliação de saúde",
};

export default function PreencherAnamnePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 pb-24 md:p-6 2xl:p-10">
          <Suspense fallback={<OverviewCardsSkeleton />}>
            <OverviewMenuGroup />
          </Suspense>

          <Breadcrumb pageName="Preencher Anamnese" />

          <PreencherAnamneseClient />

          <MenuMobile />
        </main>
      </div>
    </div>
  );
}
