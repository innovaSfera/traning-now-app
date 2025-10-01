"use client";

import { useState } from "react";
import Map from "@/components/Map";
import GymList from "@/components/GymList";

const gyms = [
  {
    id: 1,
    name: "Fratres Jiu Jitsu",
    lat: -23.627,
    lng: -46.737,
    distance: "238 m de você",
    openNow: true,
    type: "Jiu Jitsu",
    image: "/fratres.jpg",
  },
  {
    id: 2,
    name: "Morumbi CrossFit",
    lat: -23.628,
    lng: -46.736,
    distance: "238 m de você",
    openNow: true,
    type: "CrossFit",
    image: "/crossfit.jpg",
  },
];

export default function AcademyMap() {
  const [selectedGym, setSelectedGym] = useState<(typeof gyms)[0] | null>(null);

  return (
    <div className="h-screen bg-white text-dark dark:bg-gray-dark dark:text-white">
      {/* Filtros */}
      <div className="flex gap-2 border-b border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
        <button className="rounded-md bg-gray-200 px-4 py-2 text-dark hover:bg-gray-300 dark:bg-dark-3 dark:text-white dark:hover:bg-dark-4">
          Plano
        </button>
        <button className="rounded-md bg-gray-200 px-4 py-2 text-dark hover:bg-gray-300 dark:bg-dark-3 dark:text-white dark:hover:bg-dark-4">
          Modalidade
        </button>
        <button className="rounded-md bg-gray-200 px-4 py-2 text-dark hover:bg-gray-300 dark:bg-dark-3 dark:text-white dark:hover:bg-dark-4">
          Comodidade
        </button>
      </div>

      {/* Layout */}
      <div className="flex h-[calc(100%-64px)] flex-col md:flex-row">
        {/* Mapa */}
        <div className="h-1/2 flex-1 md:h-full">
          <Map gyms={gyms} onSelect={setSelectedGym} />
        </div>

        {/* Lista */}
        <div className="h-1/2 overflow-y-auto border-l border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card md:h-full md:w-[400px]">
          <GymList gyms={gyms} />
        </div>
      </div>
    </div>
  );
}
