import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CalendarBox from "@/components/CalenderBox";
import { Metadata } from "next";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";

export const metadata: Metadata = {
  title: "Calender Page",
  // other metadata
};

const CalendarPage = () => {
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
};

export default CalendarPage;
