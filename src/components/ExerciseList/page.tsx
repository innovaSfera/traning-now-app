"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown, X, ExternalLink, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Exercise = {
  id: number;
  name: string;
  reps: number;
  weight: string;
  time: string;
  media: string;
  checked: boolean;
  videoLink?: string;
  instructions?: string;
  tips?: string;
  targetMuscles?: string[];
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
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  const toggleCheck = (groupName: string, id: number) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.groupName === groupName
          ? {
              ...g,
              exercises: g.exercises.map((ex) =>
                ex.id === id ? { ...ex, checked: !ex.checked } : ex
              ),
            }
          : g
      )
    );
  };

  const toggleDropdown = (groupName: string) => {
    setOpenGroup((prev) => (prev === groupName ? null : groupName));
  };

  const openExerciseDetails = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setShowExerciseModal(true);
  };

  const closeExerciseModal = () => {
    setShowExerciseModal(false);
    setSelectedExercise(null);
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
                        <div
                          className="flex-1 cursor-pointer hover:bg-gray-600 rounded-lg p-2 -m-2 transition-colors"
                          onClick={() => openExerciseDetails(ex)}
                        >
                          <div className="flex items-center gap-2">
                            <p className="mb-1 text-lg font-medium">
                              {ex.name}
                            </p>
                            {ex.videoLink && (
                              <svg
                                className="w-4 h-4 text-red-500"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                              </svg>
                            )}
                            <Info className="h-4 w-4 text-gray-400" />
                          </div>
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

      {/* Modal de Detalhes do Exercício */}
      <AnimatePresence>
        {showExerciseModal && selectedExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            onClick={closeExerciseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-2xl w-full rounded-2xl bg-gray-800 p-6 text-white shadow-xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {selectedExercise.name}
                  </h2>
                  <p className="text-gray-300 mt-1">
                    {selectedExercise.reps} reps • {selectedExercise.weight} •{" "}
                    {selectedExercise.time}
                  </p>
                </div>
                <button
                  onClick={closeExerciseModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Conteúdo */}
              <div className="space-y-6">
                {/* Link do Vídeo/Aula */}
                {selectedExercise.videoLink && (
                  <div>
                    <h3 className="text-lg font-medium text-green-400 mb-2">
                      Vídeo da Aula
                    </h3>
                    <a
                      href={selectedExercise.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white font-medium"
                    >
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                      {selectedExercise.videoLink.includes("youtube.com") ||
                      selectedExercise.videoLink.includes("youtu.be")
                        ? "Assistir no YouTube"
                        : "Assistir Demonstração"}
                    </a>
                  </div>
                )}

                {/* Músculos Alvo */}
                {selectedExercise.targetMuscles &&
                  selectedExercise.targetMuscles.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-blue-400 mb-2">
                        Músculos Trabalhados
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedExercise.targetMuscles.map((muscle, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-600 bg-opacity-20 text-blue-300 rounded-full text-sm"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Instruções */}
                {selectedExercise.instructions && (
                  <div>
                    <h3 className="text-lg font-medium text-yellow-400 mb-2">
                      📋 Instruções
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {selectedExercise.instructions}
                    </p>
                  </div>
                )}

                {/* Dicas */}
                {selectedExercise.tips && (
                  <div>
                    <h3 className="text-lg font-medium text-purple-400 mb-2">
                      💡 Dicas
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {selectedExercise.tips}
                    </p>
                  </div>
                )}

                {/* Botão de Fechar */}
                <div className="pt-4 border-t border-gray-700">
                  <button
                    onClick={closeExerciseModal}
                    className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
