import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import FinancialCard from "@/components/FinancialCard";
import type { Metadata } from "next";
import NotificationsComponent from "@/components/Notifications";

export const metadata: Metadata = {
  title: "Financeiro",
};

export default async function Notifications() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 pb-24 md:p-6 2xl:p-10">
          <Suspense fallback={<OverviewCardsSkeleton />}>
            <OverviewMenuGroup />
          </Suspense>

          <div className="my-6 flex w-full items-start justify-between gap-6">
            <Breadcrumb pageName="Notificação" />
          </div>

          <NotificationsComponent />

          <MenuMobile />
        </main>
      </div>
    </div>
  );
}
