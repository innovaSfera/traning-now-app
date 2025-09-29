import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import { PersonalInfoForm } from "./_components/personal-info";
import { UploadPhotoForm } from "./_components/upload-photo";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

export const metadata: Metadata = {
  title: "Configurações",
};

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 pb-24 md:p-6 2xl:p-10">
          <div className="mx-auto w-full max-w-[1080px]">
            <Suspense fallback={<OverviewCardsSkeleton />}>
              <OverviewMenuGroup />
            </Suspense>

            <Breadcrumb pageName="Configurações" />

            <div className="grid grid-cols-5 gap-8 pb-24">
              <div className="col-span-5 xl:col-span-3">
                <PersonalInfoForm />
              </div>
              <div className="col-span-5 xl:col-span-2">
                <UploadPhotoForm />
              </div>
            </div>

            <MenuMobile />
          </div>
        </main>
      </div>
    </div>
  );
}
