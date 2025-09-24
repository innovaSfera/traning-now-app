import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | Traning Now",
    default: "Traning Now",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <main className="">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
