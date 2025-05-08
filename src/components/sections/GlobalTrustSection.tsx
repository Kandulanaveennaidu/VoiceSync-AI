import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import Link from 'next/link';

export default function GlobalTrustSection() {
  return (
    <section className="py-20 bg-muted/30 animate-fade-in overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Safe and Efficient for Everyone, Worldwide
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
          Nedzo AI is built on a secure and scalable infrastructure, trusted by businesses globally to handle sensitive communications with utmost care and efficiency.
        </p>
        <div className="relative mb-12 h-64 md:h-96">
          <Image
            src="https://picsum.photos/seed/worldmap/1000/400" 
            alt="Abstract world map with connection lines"
            layout="fill"
            objectFit="contain"
            data-ai-hint="global connections"
            className="opacity-75"
          />
        </div>
        <Button size="lg" asChild>
          <Link href="#pricing">Build My FREE AI Voice Agent</Link>
        </Button>
      </div>
    </section>
  );
}
