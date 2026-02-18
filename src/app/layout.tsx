import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { CartProvider } from "@/hooks/useCart";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "greek"],
  variable: "--font-inter",
  display: "swap",
});

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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased font-sans">
        <CartProvider>
          <Header />
          <main className="pt-20">{children}</main>
          <footer className="border-t border-border mt-16 py-12 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-lg text-foreground">Kalogirou Home Goods</h3>
                  <p className="mt-2 text-sm text-muted">
                    Your one-stop shop for quality home goods, plastics, and appliances in Larnaca, Cyprus.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Visit Us</h3>
                  <div className="mt-2 text-sm text-muted space-y-1">
                    <p>Larnaca, Cyprus</p>
                    <p>Mon&ndash;Sat: 9:00 AM &ndash; 6:00 PM</p>
                    <p>
                      <a href="tel:+35700000000" className="text-accent hover:text-accent-hover">+357 00 000 000</a>
                    </p>
                    <p>
                      <a href="mailto:info@kalogirou.com" className="text-accent hover:text-accent-hover">info@kalogirou.com</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted">
                &copy; {new Date().getFullYear()} Kalogirou Home Goods. All rights reserved.
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
