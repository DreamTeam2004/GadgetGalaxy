import Header from "@/components/Header";
import Footer from "@/components/Footer"; 

import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "GadgetGalaxyAdmin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header />
      {children}
      <Footer />
    </html>
  );
}
