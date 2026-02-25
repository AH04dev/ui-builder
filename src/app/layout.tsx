import type { Metadata } from 'next';
import { Bebas_Neue, JetBrains_Mono, Syne } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const bebas = Bebas_Neue({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: '400',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Native Bits | UI components for mobiles',
  description:
    'Production-ready React Native and Flutter UI components with smooth motion patterns and mobile-first demos.',
  keywords: [
    'react native ui',
    'mobile ui components',
    'flutter ui',
    'mobile animations',
    'cross platform components',
    'ui kit',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${bebas.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
