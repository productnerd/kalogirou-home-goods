import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/hooks/useCart";

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
        <CartProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <footer className="border-t border-gray-200 mt-16 py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Kalogirou Home Goods</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Your one-stop shop for quality home goods, plastics, and appliances in Larnaca, Cyprus.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Visit Us</h3>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <p>Larnaca, Cyprus</p>
                    <p>Mon–Sat: 9:00 AM – 6:00 PM</p>
                    <p>
                      <a href="tel:+35700000000" className="text-[#2563EB] hover:underline">+357 00 000 000</a>
                    </p>
                    <p>
                      <a href="mailto:info@kalogirou.com" className="text-[#2563EB] hover:underline">info@kalogirou.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Kalogirou Home Goods. All rights reserved.
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
