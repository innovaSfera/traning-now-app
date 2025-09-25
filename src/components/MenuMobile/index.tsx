"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  HomeIcon,
  User,
  PieChart,
  Muscle,
  Fingerprint,
} from "@/components/Layouts/sidebar/icons";

export default function BottomMenu() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const menuItems = [
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/", label: "Dashboard", icon: HomeIcon },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/charts/basic-chart", label: "Charts", icon: PieChart },
  ];

  const handleCheckInStart = () => {
    setIsHolding(true);
    setProgress(0);

    holdTimerRef.current = setTimeout(() => {
      completeCheckIn();
    }, 3000);

    let startTime = Date.now();
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / 3000) * 100, 100);
      setProgress(newProgress);
    }, 16);
  };

  const handleCheckInEnd = () => {
    setIsHolding(false);
    setProgress(0);

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const completeCheckIn = () => {
    setIsHolding(false);
    setProgress(100);
    setShowToast(true);
    setIsOpen(false);

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }

    setTimeout(() => {
      setShowToast(false);
      setProgress(0);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="fixed left-1/2 top-4 z-[60] -translate-x-1/2 transform">
          <div className="rounded-lg bg-green-500 px-6 py-3 text-white shadow-lg">
            <p className="font-medium">Check-in realizado com sucesso! ✅</p>
          </div>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-11/12 max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-dark">
            <h2 className="mb-4 text-center text-2xl font-medium text-gray-900 dark:text-white">
              Checkin do treino
            </h2>

            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative mb-4">
                {/* Círculo de progresso */}
                <svg
                  className="h-32 w-32 -rotate-90 transform"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-gray-200 dark:text-gray-600"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 45 * (1 - progress / 100)
                    }`}
                    className="text-blue-500 transition-all duration-75 ease-linear"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Botão principal */}
                <button
                  onMouseDown={handleCheckInStart}
                  onMouseUp={handleCheckInEnd}
                  onMouseLeave={handleCheckInEnd}
                  onTouchStart={handleCheckInStart}
                  onTouchEnd={handleCheckInEnd}
                  className={`absolute inset-2 flex h-28 w-28 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 active:scale-95 ${
                    isHolding ? "scale-95 bg-primary" : ""
                  }`}
                >
                  <span
                    className={`text-center text-sm font-medium leading-tight ${
                      isHolding ? "vibrate" : ""
                    }`}
                  >
                    <Fingerprint />
                  </span>
                </button>
              </div>

              <p className="text-center text-lg font-medium text-gray-600 dark:text-gray-400">
                Segure para fazer check-in
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-lg bg-green-400 px-4 py-2 font-medium text-black hover:bg-green-500 lg:w-auto"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Menu */}
      <div className="fixed bottom-0 left-0 flex w-full flex-col items-center justify-between bg-[#f9f9f9] text-dark dark:bg-gray-dark dark:text-white xl:hidden">
        <div className="flex w-full items-start justify-between">
          {/* Botão central */}
          <div className="absolute -top-7 left-1/2 z-50 -translate-x-1/2">
            <button
              onClick={() => setIsOpen(true)}
              className="flex h-15 w-15 items-center justify-center rounded-full border-2 border-primary bg-primary text-white shadow-lg dark:border-[#192c44]"
            >
              <Muscle className="size-7" />
            </button>
          </div>

          {menuItems.map(({ href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link href={href} key={href} className="w-1/3">
                <div
                  className={`relative top-0 flex cursor-pointer flex-col items-center justify-center gap-1 border-t-4 p-[24px] transition-all ${
                    isActive
                      ? "border-primary bg-[rgba(87,80,241,0.07)] text-primary"
                      : "border-[#f9f9f9] text-[#000] hover:border-primary hover:text-primary dark:border-[#192c44] dark:text-white"
                  } `}
                >
                  <Icon className="size-7" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
