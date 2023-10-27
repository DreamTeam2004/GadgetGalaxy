import Header from "@/components/Header";
import Footer from "@/components/Footer";

import type { Metadata } from "next";

import "../../app/globals.scss";

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
      <div className="wrapper">
        <Header />
        {children}
      </div>
      <Footer />
    </html>
  );
}
