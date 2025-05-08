import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, BarChart2, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Zap className="w-5 h-5 text-accent" />,
    text: 'Lead scanning with Voice AI to instantly identify hot prospects.',
  },
  {
    icon: <BarChart2 className="w-5 h-5 text-accent" />,
    text: 'Seamless CRM sync to keep your data up-to-date automatically.',
  },
  {
    icon: <CheckCircle className="w-5 h-5 text-accent" />,
    text: 'In-depth conversion analytics to track performance and optimize.',
  },
];

export default function FeatureSection1() {
  return (
    <section id="features" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <Image
              src="https://picsum.photos/600/400"
              alt="HighLevel Dashboard Screenshot"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl object-cover"
              data-ai-hint="dashboard screenshot"
            />
          </div>
          <div className="animate-slide-up animation-delay-200">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Qualify Leads Within Seconds
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our AI Voice Agents intelligently analyze conversations, score leads based on intent and engagement, and update your CRM in real-time. Focus your team's energy on closing deals, not sifting through leads.
            </p>
            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 mt-1">{feature.icon}</span>
                  <span className="text-muted-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>
            <Button size="lg" asChild>
              <Link href="#pricing">Build My FREE AI Voice Agent</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
