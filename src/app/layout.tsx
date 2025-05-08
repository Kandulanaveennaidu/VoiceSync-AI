import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Nedzo AI Calls – AI Calls, Made Simple',
  description: 'The Future of Communication for Marketing Agencies and Businesses. Qualify leads, book meetings, and scale your agency with AI Voice Agents.',
  keywords: 'AI Voice Assistant, SaaS, Marketing Agencies, Lead Qualification, AI Calls, Nedzo, Calendar Booking AI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
