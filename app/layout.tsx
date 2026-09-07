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
    default: "🌸 Para Rebbeca",
    template: "%s · Para Rebbeca",
  },
  description: "40 canciones y algo que quería decirte.",
  applicationName: "Para Rebbeca",
  openGraph: {
    type: "website",
    locale: "es_MX",
    title: "Para Rebbeca",
    description: "40 canciones y algo que quería decirte.",
    siteName: "Para Rebbeca",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Para Rebbeca: 40 canciones y algo que quería decirte",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Para Rebbeca",
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