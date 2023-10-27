import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "./globals.scss";

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
