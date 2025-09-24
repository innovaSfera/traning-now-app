"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Exercise = {
  id: number;
  name: string;
  reps: number;
  weight: string;
  time: string;
  media: string;
  checked: boolean;
};

interface Group {
  groupName: string;
  groupImage: string;
  exercises: Exercise[];
}

interface Props {
  initialExercises: Group[];
}

export default function ExerciseList({ initialExercises }: Props) {
  const [groups, setGroups] = useState(initialExercises);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleCheck = (groupName: string, id: number) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.groupName === groupName
          ? {
              ...g,
              exercises: g.exercises.map((ex) =>
                ex.id === id ? { ...ex, checked: !ex.checked } : ex,
              ),
            }
          : g,
      ),
    );
  };

  const toggleDropdown = (groupName: string) => {
    setOpenGroup((prev) => (prev === groupName ? null : groupName));
  };

  return (
    <div className="grid grid-cols-1 items-start gap-6 text-white lg:grid-cols-2">
      {groups.map((group) => (
        <div
          key={group.groupName}
          className="overflow-hidden rounded-2xl bg-gray-800 shadow-lg"
        >
          <div className="relative h-40 w-full overflow-hidden">
            <img
              src={group.groupImage}
              alt={group.groupName}
              className="h-full w-full object-cover"
            />
          </div>

          <button
            onClick={() => toggleDropdown(group.groupName)}
            className="flex w-full items-center justify-between p-5 transition hover:bg-gray-700"
          >
            <span className="text-xl font-semibold">{group.groupName}</span>
            <ChevronDown
              className={`h-6 w-6 transform transition-transform ${
                openGroup === group.groupName ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {openGroup === group.groupName && (
              <motion.div
                initial={{ opacity: 0, maxHeight: 0 }}
                animate={{ opacity: 1, maxHeight: 1000 }}
                exit={{ opacity: 0, maxHeight: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col gap-5 overflow-hidden px-5 pb-5"
              >
                {group.exercises.map((ex) => (
                  <div
                    key={ex.id}
                    className={`flex flex-col gap-4 rounded-xl bg-gray-700 p-4 transition ${
                      ex.checked ? "opacity-50" : ""
                    }`}
                  >
                    <div className="relative h-40 w-full overflow-hidden rounded-lg">
                      <img
                        src={ex.media}
                        alt={ex.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="mb-1 text-lg font-medium">{ex.name}</p>
                        <p className="text-sm text-gray-300">
                          {ex.reps} reps • {ex.weight} • {ex.time}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleCheck(group.groupName, ex.id)}
                      >
                        <CheckCircle
                          className={`h-7 w-7 transition ${
                            ex.checked ? "text-green-500" : "text-gray-500"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
