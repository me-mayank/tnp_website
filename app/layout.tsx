import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Training and Placement Cell - IET Lucknow',
  description: 'Training & Placement Cell, IET Lucknow',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://placement.ietlucknow.ac.in/'),
  openGraph: {
    title: 'Training and Placement Cell - IET Lucknow',
    description: 'Training & Placement Cell, IET Lucknow',
    url: '/',
    siteName: 'TPC IET Lucknow',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Training and Placement Cell - IET Lucknow',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Training and Placement Cell - IET Lucknow',
    description: 'Training & Placement Cell, IET Lucknow',
    images: ['/images/logo.png'],
  },
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} ${poppins.variable} bg-white text-brand-800 antialiased overflow-x-hidden`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
