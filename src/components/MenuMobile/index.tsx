"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  HomeIcon,
  User,
  PieChart,
  Muscle,
} from "@/components/Layouts/sidebar/icons";
import InputGroup from "../FormElements/InputGroup";

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-11/12 max-w-md rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-dark">
            <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
              Checkin do treino
            </h2>

            <InputGroup
              required
              label="Treino"
              placeholder="Qual treino?"
              type="text"
            />

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-2 text-white lg:w-auto"
              >
                Confirmar
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 lg:w-auto"
              >
                Fechar
              </button>
            </div>
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
              <Muscle className="size-7" />
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
