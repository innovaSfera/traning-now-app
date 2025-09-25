import Signin from "@/components/Auth/Signin";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Home() {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="animate-float absolute -left-24 -top-24 h-90 w-90 rounded-full bg-gradient-to-r from-purple-500 via-blue-400 to-blue-500 opacity-30 blur-3xl" />

      <div className="flex min-h-screen flex-wrap items-center">
        <div className="w-full xl:w-1/2">
          <div className="w-full p-4 sm:p-12.5 xl:p-15 xl:px-45">
            <Signin />
          </div>
        </div>

        <div className="hidden min-h-screen w-full items-center justify-center bg-slate-50 p-7.5 dark:!bg-dark-2 dark:bg-none xl:flex xl:w-1/2">
          <Link className="mb-10 inline-block" href="/">
            <Image
              className="hidden dark:block"
              src={"/images/logo/logo.svg"}
              alt="Logo"
              width={176}
              height={32}
            />
            <Image
              className="dark:hidden"
              src={"/images/logo/logo-dark.svg"}
              alt="Logo"
              width={176}
              height={32}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
