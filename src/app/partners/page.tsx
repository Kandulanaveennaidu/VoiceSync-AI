
import { Button } from '@/components/ui/button';
import { Handshake, Target, Award } from 'lucide-react';
import Link from 'next/link';

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32 min-h-screen">
      <div className="text-center mb-16">
        <Handshake className="w-24 h-24 text-primary mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold text-foreground mb-6">
          Partner with Nedzo AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Unlock new revenue streams and provide exceptional value to your clients by joining the Nedzo AI Partner Program.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="p-8 bg-muted/30 rounded-lg shadow-lg text-center">
          <Target className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">Generous Commissions</h2>
          <p className="text-muted-foreground">
            Earn competitive recurring commissions for every client you refer to Nedzo AI.
          </p>
        </div>
        <div className="p-8 bg-muted/30 rounded-lg shadow-lg text-center">
          <Award className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">Dedicated Support</h2>
          <p className="text-muted-foreground">
            Receive dedicated partner support, training materials, and resources to ensure your success.
          </p>
        </div>
        <div className="p-8 bg-muted/30 rounded-lg shadow-lg text-center">
          <Handshake className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-3">Co-Marketing Opportunities</h2>
          <p className="text-muted-foreground">
            Collaborate on marketing initiatives, webinars, and case studies to expand your reach.
          </p>
        </div>
      </div>

      <div className="text-center bg-gradient-to-r from-[#0038FF] to-[#7F00FF] p-12 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Grow Together?</h2>
        <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Fill out our partner application form, and our team will get in touch with you to discuss the next steps.
        </p>
        <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
          <Link href="/partner-application">Apply Now</Link>
        </Button>
      </div>
    </div>
  );
}
