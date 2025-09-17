"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { OverviewCard2 } from "./card2";
import {
  Alphabet,
  Table,
  FourCircle,
  Authentication,
} from "@/components/Layouts/sidebar/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function OverviewMenuCarousel() {
  const pathname = usePathname();

  const menuItems = [
    {
      key: "clientes",
      href: "/clientes",
      label: "Clientes",
      data: "Clientes",
      Icon: FourCircle,
    },
    {
      key: "unidades",
      href: "/unidades",
      label: "Unidades",
      data: "Unidades",
      Icon: FourCircle,
    },
    {
      key: "funcionarios",
      href: "/funcionarios",
      label: "Funcionários",
      data: "Funcionários",
      Icon: FourCircle,
    },
    {
      key: "financeiro",
      href: "/financeiro",
      label: "Financeiro",
      data: "Financeiro",
      Icon: FourCircle,
    },
    {
      key: "servicos",
      href: "/servicos",
      label: "Serviços",
      data: "Serviços",
      Icon: FourCircle,
    },
    {
      key: "cargo",
      href: "/cargo",
      label: "Cargo",
      data: "Cargo",
      Icon: FourCircle,
    },
    {
      key: "authentication",
      href: "/auth/sign-in",
      label: "Authentication",
      data: "Authentication",
      Icon: Authentication,
    },
    {
      key: "elements",
      href: "/ui-elements/alerts",
      label: "Elements",
      data: "Elements",
      Icon: FourCircle,
    },
    {
      key: "pages",
      href: "/pages/settings",
      label: "Pages",
      data: "Pages",
      Icon: Alphabet,
    },
    {
      key: "components",
      href: "/components",
      label: "Components",
      data: "Components",
      Icon: FourCircle,
    },
    {
      key: "form",
      href: "/forms/form-elements",
      label: "Form",
      data: "Form",
      Icon: Alphabet,
    },
    {
      key: "table",
      href: "/tables",
      label: "Table",
      data: "Table",
      Icon: Table,
    },
  ];

  return (
    <div className="mb-4 block xl:hidden">
      <Swiper spaceBetween={16} slidesPerView={2.3} grabCursor={true}>
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
