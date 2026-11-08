import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SATS-SEO-GIS – Tímový projekt",
  description: "Webstránka tímu SATS-SEO-GIS, FIIT STU 2026/27",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
