import Header from "@/components/Header";
import Footer from "@/components/Footer"; 

import type { Metadata } from "next";

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
      <Header />
      {children}
      <Footer />
    </html>
  );
}
