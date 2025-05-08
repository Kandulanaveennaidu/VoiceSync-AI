import Link from 'next/link';
import { Mail, PhoneCall } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted/50 text-muted-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <PhoneCall className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">Nedzo</span>
            </Link>
            <p className="text-sm">AI Calls, Made Simple. Empowering agencies with intelligent voice solutions.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#features" className="hover:text-primary transition-colors text-sm">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-primary transition-colors text-sm">Pricing</Link></li>
              <li><Link href="#faq" className="hover:text-primary transition-colors text-sm">FAQ</Link></li>
              <li><Link href="#partner" className="hover:text-primary transition-colors text-sm">Partner Program</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-primary transition-colors text-sm">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="hover:text-primary transition-colors text-sm">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Nedzo AI. All rights reserved.</p>
          <a href="mailto:contact@nedzo.ai" className="flex items-center space-x-2 text-sm hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            <span>contact@nedzo.ai</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
