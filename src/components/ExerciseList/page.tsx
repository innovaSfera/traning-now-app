"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

type Exercise = {
  id: number;
  name: string;
  reps: number;
  weight: string;
  time: string;
  media: string;
  checked: boolean;
};

interface Props {
  initialExercises: Exercise[];
}

export default function ExerciseList({ initialExercises }: Props) {
  const [exercises, setExercises] = useState(initialExercises);

  const toggleCheck = (id: number) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, checked: !ex.checked } : ex)),
    );
  };

  return (
    <div className="flex flex-wrap items-center gap-8 text-white">
      {exercises.map((ex) => (
        <div
          key={ex.id}
          className={`flex flex-grow flex-col gap-4 rounded-2xl bg-gray-800 p-5 shadow-lg transition ${
            ex.checked ? "opacity-50" : ""
          }`}
        >
          {/* Media */}
          <div className="relative h-45 w-full flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={ex.media}
              alt={ex.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex justify-between">
            <div className="flex-1">
              <p className="mb-2 text-2xl font-medium">{ex.name}</p>
              <p className="text-md text-gray-400">
                {ex.reps} reps • {ex.weight} • {ex.time}
              </p>
            </div>

            <button onClick={() => toggleCheck(ex.id)}>
              <CheckCircle
                className={`h-7 w-7 transition ${
                  ex.checked ? "text-green-500" : "text-gray-500"
                }`}
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
