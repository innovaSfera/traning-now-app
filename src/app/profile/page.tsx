"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { useState } from "react";
import { CameraIcon } from "./_components/icons";
import MenuMobile from "@/components/MenuMobile";
import { Sidebar } from "@/components/Layouts/sidebar";
import { Header } from "@/components/Layouts/header";

export default function Page() {
  const [data, setData] = useState({
    name: "John Smith",
    profilePhoto: "/images/user/user-03.png",
    coverPhoto: "/academia.jpg",
  });

  const handleChange = (e: any) => {
    if (e.target.name === "profilePhoto") {
      const file = e.target?.files[0];

      setData({
        ...data,
        profilePhoto: file && URL.createObjectURL(file),
      });
    } else if (e.target.name === "coverPhoto") {
      const file = e.target?.files[0];

      setData({
        ...data,
        coverPhoto: file && URL.createObjectURL(file),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="mx-auto w-full max-w-screen-2xl overflow-hidden p-4 pb-24 md:p-6 2xl:p-10">
          <div className="mx-auto w-full max-w-[970px]">
            <Breadcrumb pageName="Profile" />

            <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
              <div className="relative z-20 h-35 overflow-hidden md:h-65">
                <Image
                  src={data?.coverPhoto}
                  alt="profile cover"
                  className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
                  width={970}
                  height={260}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
              <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-[176px] sm:p-3">
                  <div className="relative drop-shadow-2">
                    {data?.profilePhoto && (
                      <>
                        <Image
                          src={data?.profilePhoto}
                          width={160}
                          height={160}
                          className="overflow-hidden rounded-full"
                          alt="profile"
                        />

                        <label
                          htmlFor="profilePhoto"
                          className="absolute bottom-0 right-0 flex size-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                        >
                          <CameraIcon />

                          <input
                            type="file"
                            name="profilePhoto"
                            id="profilePhoto"
                            className="sr-only"
                            onChange={handleChange}
                            accept="image/png, image/jpg, image/jpeg"
                          />
                        </label>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="mb-1 text-heading-6 font-semibold text-dark dark:text-white">
                    {data?.name}
                  </h3>
                  <p className="font-medium">Profissional</p>
                  <div className="mx-auto mb-5.5 mt-5 grid max-w-[370px] grid-cols-2 rounded-[5px] border border-stroke py-[9px] shadow-1 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
                    <div className="flex flex-col items-center justify-center gap-2 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                      <span className="text-lg font-medium text-dark dark:text-white">
                        25
                      </span>
                      <span className="text-md">Treinos</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 border-r border-stroke px-4 dark:border-dark-3 xsm:flex-row">
                      <span className="text-lg font-medium text-dark dark:text-white">
                        -12
                      </span>
                      <span className="text-md">Kilos</span>
                    </div>
                  </div>

                  <div className="mx-auto max-w-[620px]">
                    <h4 className="font-medium text-dark dark:text-white text-xl">
                      Minha meta
                    </h4>
                    <p className="mt-2 text-lg">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque posuere fermentum urna, eu condimentum mauris
                      tempus ut. Donec fermentum blandit aliquet. Etiam dictum
                      dapibus ultricies. Sed vel aliquet libero.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MenuMobile />
        </main>
      </div>
    </div>
  );
}
