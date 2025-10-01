import { Inter } from "next/font/google";
import "@/css/style.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Traning Now",
    default: "Traning Now",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-br" className={inter.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen">
            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <main>{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
