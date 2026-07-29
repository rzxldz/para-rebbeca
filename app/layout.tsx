import type { Metadata, Viewport } from "next";
import "./globals.css";

const productionUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "http://localhost:3000";

const metadataBase = new URL(
  productionUrl.startsWith("http")
    ? productionUrl
    : `https://${productionUrl}`
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "🌸 Para Regina",
    template: "%s · Para Regina",
  },
  description: "40 canciones y algo que quería decirte.",
  applicationName: "Para Regina",
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "Para Regina",
    description: "40 canciones y algo que quería decirte.",
    siteName: "Para Regina",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Para Regina: 40 canciones y algo que quería decirte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Para Regina",
    description: "40 canciones y algo que quería decirte.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#170f12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}