import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Zap, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function FeatureSection2() {
  return (
    <section className="py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up md:order-2">
            <div className="relative">
              <Image
                src="https://picsum.photos/600/450"
                alt="AI Calendar Booking Screenshot"
                width={600}
                height={450}
                className="rounded-lg shadow-2xl object-cover"
                data-ai-hint="calendar screenshot"
              />
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-xl animate-fade-in animation-delay-400">
                <MessageSquare className="w-6 h-6 md:w-8 md:h-8 mb-2" />
                <p className="text-xs md:text-sm font-medium">"Sure, I've booked that for you!"</p>
              </div>
            </div>
          </div>
          <div className="animate-slide-up animation-delay-200 md:order-1">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Book Directly On Your Calendar with AI
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nedzo's AI Voice Agents can intelligently schedule appointments, demos, and follow-ups directly into your team's calendars. Eliminate no-shows and scheduling conflicts with smart, automated booking.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start space-x-3">
                <CalendarCheck className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Integrates with Google Calendar, Outlook, and Calendly.</span>
              </li>
              <li className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Handles rescheduling and cancellations effortlessly.</span>
              </li>
              <li className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Sends automated reminders to reduce no-shows.</span>
              </li>
            </ul>
            <Button size="lg" asChild>
               <Link href="#pricing">Schedule a Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
