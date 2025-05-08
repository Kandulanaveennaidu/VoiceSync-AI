"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Waves } from 'lucide-react'; // Changed PhoneCall to Waves
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#partner', label: 'Partners' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconColorClass = isScrolled ? 'text-blue-700' : 'text-slate-100'; // For Waves icon
  const navLinkTextColor = isScrolled ? 'text-muted-foreground hover:text-primary' : 'text-gray-200 hover:text-white';

  const iconAnimation = {
    scale: [1, 1.12], // Smoother zoom: 100% -> 112% -> 100%
    transition: {
      duration: 1.5, // Duration for one cycle (e.g., 1 to 1.12 and back to 1)
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror" as const 
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/90 shadow-md backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div animate={iconAnimation}>
              <Waves className={`h-8 w-8 ${iconColorClass}`} />
            </motion.div>
            <span className="text-2xl font-bold logo-text-voicesync-gradient animate-filter-glow-voicesync">
              VoiceSync AI
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`text-sm font-medium ${navLinkTextColor} transition-colors`}>
                {link.label}
              </Link>
            ))}
            <Button asChild>
              <Link href="#pricing">Try Free</Link>
            </Button>
          </nav>

          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={isScrolled ? 'text-foreground' : 'text-white hover:text-gray-200 hover:bg-white/10'}>
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex flex-col space-y-6">
                  <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setMobileMenuOpen(false)}>
                    <motion.div animate={iconAnimation}>
                      <Waves className="h-8 w-8 text-blue-700" /> {/* Consistent color for mobile menu icon */}
                    </motion.div>
                    <span className="text-2xl font-bold logo-text-voicesync-gradient animate-filter-glow-voicesync">
                      VoiceSync AI
                    </span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Link href="#pricing">Try Free</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}