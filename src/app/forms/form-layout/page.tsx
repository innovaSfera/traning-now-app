import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";
import { SignInForm } from "./_components/sign-in-form";
import { SignUpForm } from "./_components/sign-up-form";
import { Suspense } from "react";
import { OverviewMenuGroup } from "../../(home)/_components/overview-cards/index-menu";
import { OverviewCardsSkeleton } from "../../(home)/_components/overview-cards/skeleton";
import MenuMobile from "@/components/MenuMobile";

export const metadata: Metadata = {
  title: "Form Layout",
};

export default function Page() {
  return (
    <>
      <Suspense fallback={<OverviewCardsSkeleton />}>
        <OverviewMenuGroup />
      </Suspense>

      <Breadcrumb pageName="Form Layout" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <ContactForm />
        </div>

        <div className="flex flex-col gap-9">
          <SignInForm />

          <SignUpForm />
        </div>
      </div>

      <MenuMobile />
    </>
  );
}
