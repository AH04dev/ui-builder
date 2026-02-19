import type { Metadata } from 'next';
import { Manrope, Sora } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-display',
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
      <body className={`${manrope.variable} ${sora.variable} antialiased`}>{children}</body>
    </html>
  );
}
