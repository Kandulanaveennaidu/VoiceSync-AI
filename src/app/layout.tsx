import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Nedzo AI Calls',
  description: 'AI Voice Assistant SaaS for marketing agencies and businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} font-sans antialiased bg-background text-foreground flex flex-col min-h-screen`}
        suppressHydrationWarning // Added here as well for targeted suppression on body
      >
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
