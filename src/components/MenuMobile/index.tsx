"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  HomeIcon,
  User,
  PieChart,
  Cloud,
} from "@/components/Layouts/sidebar/icons";

export default function BottomMenu() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/", label: "Dashboard", icon: HomeIcon },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/charts/basic-chart", label: "Charts", icon: PieChart },
  ];

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-11/12 max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
              🚀 Meu Modal
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Aqui vai o conteúdo do modal.
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/80"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 flex w-full flex-col items-center justify-between bg-[#f9f9f9] text-dark dark:bg-gray-dark dark:text-white xl:hidden">
        <div className="flex w-full items-start justify-between">
          {/* Botão central */}
          <div className="absolute -top-7 left-1/2 z-50 -translate-x-1/2">
            <button
              onClick={() => setIsOpen(true)}
              className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary text-white shadow-lg dark:border-[#192c44]"
            >
              <Cloud className="size-7" />
            </button>
          </div>

          {menuItems.map(({ href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link href={href} key={href} className="w-1/3">
                <div
                  className={`relative top-0 flex cursor-pointer flex-col items-center justify-center gap-1 border-t-4 p-[32px] transition-all ${
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
