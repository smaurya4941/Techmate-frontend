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
  metadataBase: new URL("https://techmateindustries.com"),
  title: {
    default: "Techmate Industries | Technifying Your Kitchen - Commercial Kitchen & Bakery Equipment",
    template: "%s | Techmate Industries",
  },
  description:
    "Technifying Your Kitchen. Techmate Industries is a premier manufacturer and distributor of commercial food-service machinery, heavy-duty commercial kitchen equipment, industrial bakery ovens, spiral mixers, and commercial refrigeration systems.",
  keywords: [
    "commercial kitchen equipment",
    "industrial bakery machines",
    "commercial refrigeration systems",
    "rotary rack ovens",
    "spiral dough mixers",
    "combi ovens",
    "turnkey kitchen planning",
    "Techmate Industries",
    "stainless steel commercial kitchen fabrication",
    "commercial food service machinery",
  ],
  authors: [{ name: "Techmate Industries", url: "https://techmateindustries.com" }],
  creator: "Techmate Industries Pvt. Ltd.",
  publisher: "Techmate Industries Pvt. Ltd.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://techmateindustries.com",
    siteName: "Techmate Industries",
    title: "Techmate Industries | Commercial Kitchen, Bakery & Refrigeration Systems",
    description:
      "Premier B2B manufacturer and turnkey engineering provider of commercial kitchen and industrial bakery machinery.",
    images: [
      {
        url: "/images/og-techmate.jpg",
        width: 1200,
        height: 630,
        alt: "Techmate Industries - Commercial Food Service Machinery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Techmate Industries | Commercial Food Service Machinery",
    description:
      "Technifying Your Kitchen. Industrial bakery ovens, heavy-duty cooking ranges, and commercial refrigeration systems.",
    images: ["/images/og-techmate.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Techmate Industries Pvt. Ltd.",
  url: "https://techmateindustries.com",
  logo: "https://techmateindustries.com/images/techmate-logo.png",
  description:
    "Enterprise manufacturer and distributor of commercial kitchen, bakery and refrigeration systems.",
  telephone: "+91-800-832-4628",
  email: "sales@techmateindustries.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot No. C-14, MIDC Industrial Area, Turbhe",
    addressLocality: "Navi Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400705",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-800-832-4628",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  ],
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Techmate Industries",
  url: "https://techmateindustries.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://techmateindustries.com/products?search={search_term_string}",
    "query-input": "required name=search_term_string",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-white text-brand-slate antialiased selection:bg-[#D62836] selection:text-white">
        {children}
      </body>
    </html>
  );
}
