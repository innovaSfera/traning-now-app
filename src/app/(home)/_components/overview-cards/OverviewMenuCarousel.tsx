"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { OverviewCard } from "./card";
import {
  FourCircle,
  CreditCard,
  Academy,
} from "@/components/Layouts/sidebar/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function OverviewMenuCarousel() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: "1",
      href: "/financial",
      label: "Financeiro",
      data: "Financeiro",
      Icon: CreditCard,
    },
    {
      key: "2",
      href: "/academy",
      label: "Academia",
      data: "Academia",
      Icon: Academy,
    },
    {
      key: "3",
      href: "/notifications",
      label: "Notificação",
      data: "Notificação",
      Icon: FourCircle,
    },
    {
      key: "4",
      href: "/menu",
      label: "Menu",
      data: "Menu",
      Icon: FourCircle,
    },
    {
      key: "5",
      href: "/menu",
      label: "Menu",
      data: "Menu",
      Icon: FourCircle,
    },
    {
      key: "6",
      href: "/menu",
      label: "Menu",
      data: "Menu",
      Icon: FourCircle,
    },
    {
      key: "7",
      href: "/menu",
      label: "Menu",
      data: "Menu",
      Icon: FourCircle,
    },
    {
      key: "8",
      href: "/menu",
      label: "Menu",
      data: "Menu",
      Icon: FourCircle,
    },
  ];

  return (
    <div className="mb-4 block xl:hidden">
      <Swiper spaceBetween={16} slidesPerView={3.4} grabCursor={true}>
        {menuItems.map(({ key, href, label, data, Icon }) => {
          const isActive = pathname.startsWith(href);

          return (
            <SwiperSlide key={key}>
              <Link href={href}>
                <OverviewCard
                  label={label}
                  data={data}
                  Icon={Icon}
                  isActive={isActive}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
