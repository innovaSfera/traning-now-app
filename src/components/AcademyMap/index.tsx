"use client";

import { useState } from "react";
import Map from "@/components/Map";
import GymList from "@/components/GymList";
import { Gym } from "@/types/Gym";

const gyms: Gym[] = [
  {
    id: 1,
    name: "Fratres Jiu Jitsu",
    lat: -23.627,
    lng: -46.737,
    distance: "238 m de você",
    openNow: true,
    type: "Jiu Jitsu",
    image: "/academia.jpg",
    category: "Modalidade",
  },
  {
    id: 2,
    name: "Morumbi CrossFit",
    lat: -23.628,
    lng: -46.736,
    distance: "350 m de você",
    openNow: true,
    type: "CrossFit",
    image: "/academia.jpg",
    category: "Modalidade",
  },
  {
    id: 3,
    name: "Smart Fit Premium",
    lat: -23.625,
    lng: -46.734,
    distance: "1.2 km de você",
    openNow: false,
    type: "Academia",
    image: "/academia.jpg",
    category: "Plano",
  },
  {
    id: 4,
    name: "BodyTech Club",
    lat: -23.629,
    lng: -46.732,
    distance: "900 m de você",
    openNow: true,
    type: "Academia",
    image: "/academia.jpg",
    category: "Plano",
  },
  {
    id: 5,
    name: "Cross Morumbi Express",
    lat: -23.631,
    lng: -46.733,
    distance: "2 km de você",
    openNow: true,
    type: "CrossFit",
    image: "/academia.jpg",
    category: "Comodidade",
  },
];
export default function AcademyMap() {
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Todos");

  const filteredGyms =
    activeFilter === "Todos"
      ? gyms
      : gyms.filter((gym) => gym.category === activeFilter);

  return (
    <div className="h-screen bg-white text-dark dark:bg-gray-dark dark:text-white">
      <div className="flex flex-wrap gap-2 border-b border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
        {["Todos", "Plano", "Modalidade", "Comodidade"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`rounded-md px-4 py-2 transition ${
              activeFilter === filter
                ? "bg-green-500 text-white shadow-md"
                : "bg-gray-200 text-dark hover:bg-gray-300 dark:bg-dark-3 dark:text-white dark:hover:bg-dark-4"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex h-[calc(100%-64px)] flex-col md:flex-row">
        <div className="h-1/2 flex-1 md:h-full">
          <Map
            gyms={filteredGyms}
            selectedGym={selectedGym}
            onSelect={setSelectedGym}
          />
        </div>

        <div className="h-1/2 overflow-y-auto border-l border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card md:h-full md:w-[400px]">
          <GymList gyms={filteredGyms} onSelect={setSelectedGym} />
        </div>
      </div>
    </div>
  );
}
