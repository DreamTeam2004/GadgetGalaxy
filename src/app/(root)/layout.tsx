import Header from "@/components/Header";
import HeaderMobile from "@/components/HeaderMobile";
import Footer from "@/components/Footer";

import type { Metadata } from "next";

import "../../assets/styles/globals.scss";
import { Providers } from "@/lib/store/Provider";

export const metadata: Metadata = {
  title: "GadgetGalaxy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="wrapper">
            <Header />
            {children}
          </div>
          <Footer />
          <HeaderMobile />
        </Providers>
      </body>
    </html>
  );
}
