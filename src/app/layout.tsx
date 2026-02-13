import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Native Bits — Premium UI Components for Mobile",
  description: "An open source collection of high quality, animated, interactive & fully customizable components for React Native & Flutter.",
  keywords: ["react native", "flutter", "ui components", "mobile ui", "animations", "ui library"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: '#050505' }}>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${inter.className}`}
        style={{
          background: '#050505',
          color: '#F0F0F5',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
