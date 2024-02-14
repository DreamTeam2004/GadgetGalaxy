import Header from "@/components/header/Header/Header";
import HeaderMobile from "@/components/header/HeaderMobile/HeaderMobile";
import Footer from "@/components/Footer/Footer";

import type { Metadata } from "next";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "../assets/styles/globals.scss";
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
            <Footer />
            <HeaderMobile />
            <ToastContainer
              position="bottom-right"
              progressStyle={{ background: "#9E00FF" }} // Стили для прогресс-бара
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
