"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown, X } from "lucide-react";
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

  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [congratsMessage, setCongratsMessage] = useState("");

  const toggleCheck = (groupName: string, id: number) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.groupName === groupName
          ? {
              ...g,
              exercises: g.exercises.map((ex) => {
                if (ex.id === id) {
                  const updatedChecked = !ex.checked;

                  if (updatedChecked) {
                    setCongratsMessage(
                      `Você concluiu o treino de ${ex.name}!`
                    );
                    setShowCongratsModal(true);
                  }

                  return { ...ex, checked: updatedChecked };
                }
                return ex;
              }),
            }
          : g
      )
    );
  };

  const toggleDropdown = (groupName: string) => {
    setOpenGroup((prev) => (prev === groupName ? null : groupName));
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 items-start gap-6 text-white lg:grid-cols-2 mt-2">
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
                      className={`flex flex-col gap-4 rounded-xl bg-gray-700 p-4 transition mt-2 ${
                        ex.checked ? "opacity-50" : ""
                      }`}
                    >
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

      <AnimatePresence>
        {showCongratsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-150 w-full rounded-2xl bg-gray-800 p-12 text-center shadow-lg"
            >
              <button
                onClick={() => setShowCongratsModal(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-semibold text-green-400">
                🎉 Parabéns!
              </h2>
              <p className="mt-4 text-gray-200 text-xl">{congratsMessage}</p>
              <button
                onClick={() => setShowCongratsModal(false)}
                className="mt-8 rounded-lg bg-green-500 px-6 py-2 font-medium text-black transition hover:bg-green-600"
              >
                Continuar treinando
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
