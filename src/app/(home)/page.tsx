import { Suspense } from "react";
import { OverviewMenuGroup } from "./_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";
import CalendarBox from "@/components/CalenderBox";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default async function Home() {
  return (
    <div className="pb-24">
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewMenuGroup />
      </Suspense>

      <Breadcrumb pageName="Calendar" />

      <CalendarBox />

      <MenuMobile />
    </div>
  );
}
