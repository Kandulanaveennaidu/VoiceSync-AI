
"use client";
import { motion } from 'framer-motion';
import {
  Aperture, Award, BarChart3, Briefcase, Building2, Cloud, Code2, Cpu, Database, Factory,
  GitFork, Globe2, Layers, Lightbulb, Network, PenTool, Palette, Server, Settings2,
  ShieldCheck, ShoppingCart, TrendingUp, Users2, Zap, Brain, Rocket, LineChart, Target,
  Users, CheckCircle, MessageSquare, Settings, BarChartBig, Building, DollarSign, HeartHandshake, Component
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

interface Partner {
  name: string;
  Icon: FC<LucideProps>;
}

const partners: Partner[] = [
  { name: 'Innovate Corp', Icon: Lightbulb },
  { name: 'Quantum Solutions', Icon: Cpu },
  { name: 'Apex Digital', Icon: Rocket },
  { name: 'Synergy Systems', Icon: Network },
  { name: 'Momentum Growth', Icon: TrendingUp },
  { name: 'Data Weavers', Icon: Database },
  { name: 'CloudScape Tech', Icon: Cloud },
  { name: 'CodeCrafters Co.', Icon: Code2 },
  { name: 'Visionary Ventures', Icon: Aperture },
  { name: 'Global Connect', Icon: Globe2 },
  { name: 'SecureNet', Icon: ShieldCheck },
  { name: 'Insight Analytics', Icon: BarChart3 },
  { name: 'Precision Builders', Icon: Building2 },
  { name: 'Agile Dynamics', Icon: Zap },
  { name: 'Creative Spark', Icon: Palette },
  { name: 'Pro Services', Icon: Briefcase },
  { name: 'NextGen AI', Icon: Brain },
  { name: 'Growth Accelerators', Icon: LineChart },
  { name: 'Target Marketing', Icon: Target },
  { name: 'Client Centric', Icon: Users },
  { name: 'Quality First', Icon: CheckCircle },
  { name: 'CommunicateHub', Icon: MessageSquare },
  { name: 'Automation Experts', Icon: Settings },
  { name: 'Strategy Masters', Icon: BarChartBig },
  { name: 'Enterprise Solutions', Icon: Building },
  { name: 'Value Partners', Icon: DollarSign },
  { name: 'Trusted Allies', Icon: HeartHandshake },
  { name: 'Component Creators', Icon: Component },
  { name: 'Eco Innovators', Icon: Factory },
  { name: 'Platform Pioneers', Icon: Layers },
];

const marqueeVariants = {
  animate: {
    x: ['0%', '-100%'], // Animate from original position to completely off-screen to the left
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 90, // Slower duration for more items
        ease: 'linear',
      },
    },
  },
};

export default function TrustedBySection() {
  // Duplicate partners for seamless looping
  const duplicatedPartners = [...partners, ...partners, ...partners]; // Triple for even smoother long marquee

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Trusted by leading agencies and businesses
        </motion.h2>
        <div className="w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                title={partner.name}
                className="flex-shrink-0 w-48 h-24 mx-6 flex flex-col items-center justify-center text-center group" // Increased width for name
              >
                <partner.Icon className="w-10 h-10 text-muted-foreground opacity-70 group-hover:opacity-100 group-hover:text-primary transition-all duration-300 mb-1" />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300 truncate w-full px-1">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
