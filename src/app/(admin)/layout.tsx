import AdminHeader from "@/components/AdminHeader";
import AdminFooter from "@/components/AdminFooter";

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
      <div className="wrapper">
        <AdminHeader />
        {children}
        <AdminFooter />
      </div>
    </html>
  );
}
