import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DESIGNYX — AI Design Studio",
  description: "Premium AI Design Studio — Face Lock, style, composition, cinematic output.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
