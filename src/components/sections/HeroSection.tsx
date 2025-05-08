import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, Star } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 wave-bg animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0038FF]/10 via-transparent to-[#7F00FF]/10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Badge variant="outline" className="mb-6 py-2 px-4 border-primary/50 text-primary bg-primary/10 animate-slide-up">
          <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" /> 5-Star Rated AI Solution
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-[#0038FF] to-[#7F00FF] bg-clip-text text-transparent animate-slide-up animation-delay-200">
          AI Calls, Made Simple
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-slide-up animation-delay-400">
          The Future of Communication. Empower your agency with intelligent voice agents that qualify leads, book meetings, and scale your business 24/7.
        </p>
        <div className="flex justify-center items-center space-x-4 mb-12 animate-slide-up animation-delay-600">
          <div className="p-6 bg-gradient-to-br from-[#0038FF] to-[#7F00FF] rounded-full shadow-2xl">
            <Mic className="w-16 h-16 text-white" />
          </div>
        </div>
        <Button size="lg" asChild className="animate-slide-up animation-delay-800">
          <Link href="#pricing">Try Free</Link>
        </Button>
      </div>
    </section>
  );
}

// Add this to your globals.css or a style tag if not already present for animation delays
// @layer utilities {
//   .animation-delay-200 { animation-delay: 0.2s; }
//   .animation-delay-400 { animation-delay: 0.4s; }
//   .animation-delay-600 { animation-delay: 0.6s; }
//   .animation-delay-800 { animation-delay: 0.8s; }
// }
