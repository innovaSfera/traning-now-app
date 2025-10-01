import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import MenuMobile from "@/components/MenuMobile";
import TrainingStudentClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treinos",
};

export default function TrainingStudentPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />
        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 pb-24 md:p-6 2xl:p-10">
          <Suspense fallback={<OverviewCardsSkeleton />}>
            <OverviewMenuGroup />
          </Suspense>

          <TrainingStudentClient />

          <MenuMobile />
        </main>
      </div>
    </div>
  );
}
