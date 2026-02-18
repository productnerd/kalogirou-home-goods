import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Kalogirou Home Goods",
  description: "Home goods and plastics store in Larnaca, Cyprus. Browse our catalog and order for in-store pickup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
