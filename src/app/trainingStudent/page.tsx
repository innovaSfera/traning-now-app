import { Suspense } from "react";
import { OverviewMenuGroup } from "../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../(home)/_components/overview-cards/skeleton";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";
import MenuMobile from "@/components/MenuMobile";
<<<<<<< HEAD
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treinos",
};

export default async function TraningStudent() {
  const exercisesGroups = [
    {
      groupName: "Treino A",
      groupImage: "/exercicio.jpg",
      exercises: [
        {
          id: 1,
          name: "Perna",
          reps: 12,
          weight: "60kg",
          time: "01:30",
          media: "/exercicio.jpg",
          checked: true,
        },
      ],
    },
    {
      groupName: "Treino B",
      groupImage: "/exercicio2.jpg",
      exercises: [
        {
          id: 3,
          name: "Perna",
          reps: 10,
          weight: "80kg",
          time: "02:00",
          media: "/exercicio.jpg",
          checked: false,
        },
      ],
    },
    {
      groupName: "Treino C",
      groupImage: "/exercicio2.jpg",
      exercises: [
        {
          id: 4,
          name: "Perna",
          reps: 10,
          weight: "80kg",
          time: "02:00",
          media: "/exercicio.jpg",
          checked: false,
        },
        {
          id: 5,
          name: "Perna",
          reps: 8,
          weight: "40kg",
          time: "01:00",
          media: "/exercicio2.jpg",
          checked: false,
        },
      ],
    },
    {
      groupName: "Treino D",
      groupImage: "/exercicio.jpg",
      exercises: [
        {
          id: 6,
          name: "Perna",
          reps: 10,
          weight: "80kg",
          time: "02:00",
          media: "/exercicio2.jpg",
          checked: false,
        },
      ],
    },
  ];
=======
import TrainingStudentClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Treinos",
};
>>>>>>> feat/back-end-app-initial

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
