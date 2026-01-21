"use client";

import { useEffect, useRef } from "react";

interface RadarChartProps {
  cardiovascular: number;
  lesoes: number;
  sedentarismo: number;
  demografico: number;
  maxScore?: number;
}

export default function RadarChart({
  cardiovascular,
  lesoes,
  sedentarismo,
  demografico,
  maxScore = 30,
}: RadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get theme (dark mode check)
    const isDark = document.documentElement.classList.contains("dark");
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Canvas dimensions
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 60;

    // Data points (normalized to 0-1)
    const data = [
      cardiovascular / maxScore,
      lesoes / maxScore,
      sedentarismo / maxScore,
      demografico / maxScore,
    ];

    const labels = ["Cardiovascular", "Lesões", "Sedentarismo", "Demográfico"];
    const numPoints = data.length;
    const angleStep = (Math.PI * 2) / numPoints;

    // Colors
    const gridColor = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
    const labelColor = isDark ? "#9CA3AF" : "#6B7280";
    const dataFillColor = isDark ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.2)";
    const dataStrokeColor = isDark ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 1)";

    // Draw grid circles
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      const r = (radius * i) / 5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw grid lines and labels
    ctx.strokeStyle = gridColor;
    ctx.fillStyle = labelColor;
    ctx.font = isDark ? "12px Inter, sans-serif" : "12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x1 = centerX;
      const y1 = centerY;
      const x2 = centerX + radius * Math.cos(angle);
      const y2 = centerY + radius * Math.sin(angle);

      // Draw line
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Draw label
      const labelX = centerX + (radius + 30) * Math.cos(angle);
      const labelY = centerY + (radius + 30) * Math.sin(angle);
      
      // Adjust text alignment based on position
      if (angle > -Math.PI / 2 && angle < Math.PI / 2) {
        ctx.textAlign = "left";
      } else {
        ctx.textAlign = "right";
      }
      
      ctx.fillText(labels[i], labelX, labelY);
      
      // Draw score value
      const scoreX = centerX + (radius + 15) * Math.cos(angle);
      const scoreY = centerY + (radius + 15) * Math.sin(angle);
      ctx.fillStyle = dataStrokeColor;
      ctx.font = "bold 10px Inter, sans-serif";
      ctx.fillText(
        String([cardiovascular, lesoes, sedentarismo, demografico][i]),
        scoreX,
        scoreY
      );
      ctx.fillStyle = labelColor;
      ctx.font = "12px Inter, sans-serif";
    }

    // Reset text alignment
    ctx.textAlign = "center";

    // Draw data polygon
    ctx.fillStyle = dataFillColor;
    ctx.strokeStyle = dataStrokeColor;
    ctx.lineWidth = 2;
    ctx.beginPath();

    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const value = data[i];
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw data points
    ctx.fillStyle = dataStrokeColor;
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const value = data[i];
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [cardiovascular, lesoes, sedentarismo, demografico, maxScore]);

  return (
    <div className="flex items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="max-w-full"
      />
    </div>
  );
}
