"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { OverviewCard } from "./card";
import * as icons from "./icons";

export function OverviewCardsCarousel({ views, profit, products, users }: any) {
  return (
    <>
      {/* Swiper para mobile */}
      <div className="block xl:hidden">
        <Swiper spaceBetween={16} slidesPerView={1.15} grabCursor={true}>
          <SwiperSlide>
            <OverviewCard label="Total Views" data={views} Icon={icons.Views} />
          </SwiperSlide>

          <SwiperSlide>
            <OverviewCard
              label="Total Profit"
              data={profit}
              Icon={icons.Profit}
            />
          </SwiperSlide>

          <SwiperSlide>
            <OverviewCard
              label="Total Products"
              data={products}
              Icon={icons.Product}
            />
          </SwiperSlide>

          <SwiperSlide>
            <OverviewCard label="Total Users" data={users} Icon={icons.Users} />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Grid para desktop */}
      <div className="hidden gap-4 sm:grid-cols-2 xl:grid xl:grid-cols-4">
        <OverviewCard label="Total Views" data={views} Icon={icons.Views} />
        <OverviewCard label="Total Profit" data={profit} Icon={icons.Profit} />
        <OverviewCard
          label="Total Products"
          data={products}
          Icon={icons.Product}
        />
        <OverviewCard label="Total Users" data={users} Icon={icons.Users} />
      </div>
    </>
  );
}
