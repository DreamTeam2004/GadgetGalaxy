import Header from "@/components/Header";
import Footer from "@/components/Footer";

import type { Metadata } from "next";

import "../../assets/styles/globals.scss";

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
        <div className="wrapper">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
