import { Button } from '@/components/ui/button';
import { Handshake } from 'lucide-react';
import Link from 'next/link';

export default function PartnerProgramSection() {
  return (
    <section id="partner" className="py-20 bg-background animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-muted/50 p-12 rounded-xl shadow-lg text-center">
          <Handshake className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Become a Nedzo Partner
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join our partner program and offer cutting-edge AI voice solutions to your clients. Grow your agency with generous commissions, dedicated support, and co-marketing opportunities.
          </p>
          <Button size="lg" variant="outline" asChild>
            <Link href="/partners">Learn More About Partnership</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
