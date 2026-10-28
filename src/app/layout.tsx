import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Techmate Industries | Technifying Your Kitchen - Premium Commercial Kitchen & Bakery Equipment Solutions",
  description:
    "Technifying Your Kitchen. Techmate Industries is a premium commercial kitchen & bakery equipment solutions company: heavy-duty cooking ranges, rotary bakery ovens, spiral mixers, blast chillers, and turnkey food-service equipment.",
  keywords: [
    "commercial kitchen equipment",
    "industrial bakery machines",
    "commercial refrigeration",
    "combi ovens",
    "turnkey kitchen planning",
    "Techmate Industries",
    "stainless steel fabrication",
  ],
  authors: [{ name: "Techmate Industries" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-brand-slate antialiased selection:bg-brand-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
