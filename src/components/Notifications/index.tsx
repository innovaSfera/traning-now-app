"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const allNotifications = [
  {
    id: 1,
    image: "/images/user/user-15.png",
    title: "Novo treino hoje!",
    subTitle: "Nova meta alcançada",
    read: false,
  },
  {
    id: 2,
    image: "/images/user/user-03.png",
    title: "Nova mensagem",
    subTitle: "Carlos enviou mensagem",
    read: true,
  },
  {
    id: 3,
    image: "/images/user/user-10.png",
    title: "Acompanhamento atualizado",
    subTitle: "Seu progresso foi registrado",
    read: false,
  },
];

export default function NotificationsComponent() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "read") return n.read;
    if (filter === "unread") return !n.read;
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className=" text-dark dark:text-white">
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition",
            filter === "all"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-dark-3 dark:hover:bg-dark-4"
          )}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition",
            filter === "unread"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-dark-3 dark:hover:bg-dark-4"
          )}
        >
          Não Lidas
        </button>
        <button
          onClick={() => setFilter("read")}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition",
            filter === "read"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:bg-gray-300 dark:bg-dark-3 dark:hover:bg-dark-4"
          )}
        >
          Lidas
        </button>
      </div>

      <ul className="space-y-4">
        {filteredNotifications.map((n) => (
          <li
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={cn(
              "flex items-center gap-4 rounded-xl border p-4 transition cursor-pointer",
              n.read
                ? "border-gray-300 bg-gray-100 dark:border-dark-3 dark:bg-dark-2"
                : "border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-800/40"
            )}
          >
            <Image
              src={n.image}
              alt="User"
              width={60}
              height={60}
              className="size-14 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{n.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {n.subTitle}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {filteredNotifications.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
          Nenhuma notificação encontrada.
        </p>
      )}
    </div>
  );
}
