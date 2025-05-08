
"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Zap, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const sectionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.2, duration: 0.5 } },
};

const itemVariantsLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const itemVariantsRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const popUpVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.3, type: 'spring', stiffness: 150 } },
}

export default function FeatureSection2() {
  return (
    <motion.section 
      className="py-20 bg-muted/30 overflow-hidden"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div className="md:order-2" variants={itemVariantsRight}>
            <div className="relative">
              <Image
                src="https://picsum.photos/600/450"
                alt="AI Calendar Booking Screenshot"
                width={600}
                height={450}
                className="rounded-lg shadow-2xl object-cover"
                data-ai-hint="calendar screenshot"
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-primary text-primary-foreground p-4 rounded-lg shadow-xl"
                variants={popUpVariants}
              >
                <MessageSquare className="w-6 h-6 md:w-8 md:h-8 mb-2" />
                <p className="text-xs md:text-sm font-medium">"Sure, I've booked that for you!"</p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div className="md:order-1" variants={itemVariantsLeft}>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Book Directly On Your Calendar with AI
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Nedzo's AI Voice Agents can intelligently schedule appointments, demos, and follow-ups directly into your team's calendars. Eliminate no-shows and scheduling conflicts with smart, automated booking.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                { icon: <CalendarCheck className="w-5 h-5 text-accent flex-shrink-0 mt-1" />, text: "Integrates with Google Calendar, Outlook, and Calendly." },
                { icon: <Zap className="w-5 h-5 text-accent flex-shrink-0 mt-1" />, text: "Handles rescheduling and cancellations effortlessly." },
                { icon: <MessageSquare className="w-5 h-5 text-accent flex-shrink-0 mt-1" />, text: "Sends automated reminders to reduce no-shows." }
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start space-x-3"
                  custom={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.3 + index * 0.1, duration: 0.4 } }}
                >
                  {item.icon}
                  <span className="text-muted-foreground">{item.text}</span>
                </motion.li>
              ))}
            </ul>
            <Button size="lg" asChild>
               <Link href="#pricing">Schedule a Demo</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
