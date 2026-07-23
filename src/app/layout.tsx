import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AbstractArt Studio",
  description:
    "Digital architecture studio engineering complex interactive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <body>{children}</body>
    </html>
  );
}
