"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { OverviewCard2 } from "./card2";
import { FourCircle, CreditCard } from "@/components/Layouts/sidebar/icons";
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
      href: "/menu",
      label: "Menu",
      data: "Menu",
      Icon: FourCircle,
    },
    {
      key: "3",
      href: "/menu",
      label: "Menu",
      data: "Menu",
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
                <OverviewCard2
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
