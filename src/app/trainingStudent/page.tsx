import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import ExerciseList from "@/components/ExerciseList/page";
import MenuMobile from "@/components/MenuMobile";

export default async function TraningStudent() {
  const exercises = [
    {
      id: 1,
      name: "Bench Press",
      reps: 12,
      weight: "60kg",
      time: "01:30",
      media: "/exercicio.jpg",
      checked: true,
    },
    {
      id: 2,
      name: "Back Squat",
      reps: 10,
      weight: "80kg",
      time: "02:00",
      media: "/exercicio.jpg",
      checked: false,
    },
    {
      id: 3,
      name: "Overhead Press",
      reps: 8,
      weight: "40kg",
      time: "01:00",
      media: "/exercicio.jpg",
      checked: false,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />
        <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 pb-24 md:p-6 2xl:p-10">
          <Suspense fallback={<OverviewCardsSkeleton />}>
            <OverviewMenuGroup />
          </Suspense>

          <Breadcrumb pageName="Treinos" />

          <ExerciseList initialExercises={exercises} />

          <MenuMobile />
        </main>
      </div>
    </div>
  );
}
