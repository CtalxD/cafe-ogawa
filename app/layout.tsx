import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cafe Ogawa | Japanese Ramen & Café — Ascot Vale, Melbourne',
  description:
    'Authentic handcrafted Japanese ramen, specialty drinks, and cozy café atmosphere in Ascot Vale. Rich broths, warm hospitality, neighborhood vibes.',
  keywords: [
    'ramen',
    'Japanese ramen',
    'Melbourne ramen',
    'Ascot Vale',
    'Cafe Ogawa',
    'tonkotsu',
    'iekie ramen',
    'Japanese café',
  ],
  openGraph: {
    title: 'Cafe Ogawa | Japanese Ramen & Café',
    description:
      'Handcrafted ramen, specialty drinks, and cozy Japanese café atmosphere in Ascot Vale, Melbourne.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}