"use client";

import { Activity, Heart, AlertTriangle, User } from "lucide-react";
import { ClassificacaoColors, EClassificacaoAnamnese, ECategoriaAnamnese } from "@/types/anamnese";

type CategoriaLabel = "Cardiovascular" | "Lesões" | "Sedentarismo" | "Demográfico";

interface ScoreCategoryBadgeProps {
  categoria: CategoriaLabel | ECategoriaAnamnese;
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
}

const categoriaConfig: Record<CategoriaLabel, {
  icon: typeof Heart;
  color: string;
  bgColor: string;
  label: string;
}> = {
  Cardiovascular: {
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    label: "Cardiovascular",
  },
  Lesões: {
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    label: "Lesões",
  },
  Sedentarismo: {
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    label: "Sedentarismo",
  },
  Demográfico: {
    icon: User,
    color: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    label: "Demográfico",
  },
};

// Map enum to label
const enumToLabel: Record<ECategoriaAnamnese, CategoriaLabel> = {
  [ECategoriaAnamnese.Cardiovascular]: "Cardiovascular",
  [ECategoriaAnamnese.Lesoes]: "Lesões",
  [ECategoriaAnamnese.Sedentarismo]: "Sedentarismo",
  [ECategoriaAnamnese.Demografico]: "Demográfico",
};

const getClassificacao = (score: number): EClassificacaoAnamnese => {
  if (score <= 10) return EClassificacaoAnamnese.TreinoAutomatico;
  if (score <= 25) return EClassificacaoAnamnese.Atencao;
  return EClassificacaoAnamnese.AvaliacaoObrigatoria;
};

export default function ScoreCategoryBadge({
  categoria,
  score,
  maxScore = 50,
  size = "md",
}: ScoreCategoryBadgeProps) {
  // Convert enum to label if needed
  const categoriaLabel: CategoriaLabel = 
    typeof categoria === "number" ? enumToLabel[categoria] : categoria;
  
  const config = categoriaConfig[categoriaLabel];
  const Icon = config.icon;
  const classificacao = getClassificacao(score);
  const colors = ClassificacaoColors[classificacao];
  const percentage = Math.min((score / maxScore) * 100, 100);

  const sizeClasses = {
    sm: { padding: "p-3", iconSize: 16, text: "text-xs" },
    md: { padding: "p-4", iconSize: 20, text: "text-sm" },
    lg: { padding: "p-5", iconSize: 24, text: "text-base" },
  };

  const sizeConfig = sizeClasses[size];

  return (
    <div className={`rounded-lg border-2 ${sizeConfig.padding} ${config.bgColor}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`rounded-lg bg-white p-2 dark:bg-gray-800 ${config.color}`}>
            <Icon size={sizeConfig.iconSize} />
          </div>
          <span className={`${sizeConfig.text} font-semibold text-gray-900 dark:text-white`}>
            {config.label}
          </span>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}>
          {score} pts
        </span>
      </div>

      {/* Barra de progresso */}
      <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full transition-all duration-500 ${colors.badge}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>0-10</span>
        <span>11-25</span>
        <span>26+</span>
      </div>
    </div>
  );
}
