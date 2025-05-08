import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, FileText } from 'lucide-react';
import Link from 'next/link';

export default function EnterpriseSupportSection() {
  return (
    <section className="py-20 bg-background animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0038FF] to-[#7F00FF] p-12 rounded-xl shadow-2xl text-center text-primary-foreground">
          <h2 className="text-4xl font-bold mb-6">Nedzo Enterprise</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            For larger agencies and businesses with specific compliance and scalability needs, Nedzo Enterprise offers robust solutions. We are committed to maintaining the highest standards of security and data protection.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-lg">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-6 h-6" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-6 h-6" />
              <span>SOC2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6" />
              <span>GDPR Ready</span>
            </div>
          </div>
          <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
            <Link href="/contact-sales?plan=enterprise">Contact Enterprise Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
