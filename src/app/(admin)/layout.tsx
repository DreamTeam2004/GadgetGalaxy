import AdminHeader from "@/components/AdminHeader";
import AdminFooter from "@/components/AdminFooter"; 

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
      <AdminHeader />
      {children}
      <AdminFooter />
    </html>
  );
}
