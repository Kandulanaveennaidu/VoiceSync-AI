
"use client";
import { motion } from 'framer-motion';
import {
  Aperture, Award, BarChart3, Briefcase, Building2, Cloud, Code2, Cpu, Database, Factory,
  GitFork, Globe2, Layers, Lightbulb, Network, PenTool, Palette, Server, Settings2,
  ShieldCheck, ShoppingCart, TrendingUp, Users2, Zap
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { FC } from 'react';

interface Partner {
  name: string;
  Icon: FC<LucideProps>;
}

const partners: Partner[] = [
  { name: 'Tech Solutions Inc.', Icon: Cpu },
  { name: 'Global Connect Ltd.', Icon: Globe2 },
  { name: 'Creative Designs Co.', Icon: Palette },
  { name: 'Data Insights Corp.', Icon: Database },
  { name: 'Cloud Services Provider', Icon: Cloud },
  { name: 'Manufacturing Hub', Icon: Factory },
  { name: 'Software Innovators', Icon: Code2 },
  { name: 'Network Systems', Icon: Network },
  { name: 'AI Ventures', Icon: Lightbulb },
  { name: 'E-commerce Platform', Icon: ShoppingCart },
  { name: 'Secure Solutions', Icon: ShieldCheck },
  { name: 'Business Growth Experts', Icon: TrendingUp },
  { name: 'Development Studio', Icon: PenTool },
  { name: 'Enterprise Software', Icon: Building2 },
  { name: 'Consulting Group', Icon: Users2 },
  { name: 'Digital Agency', Icon: Aperture },
  { name: 'Quality Awards', Icon: Award },
  { name: 'Analytics Pro', Icon: BarChart3 },
  { name: 'Professional Services', Icon: Briefcase },
  { name: 'Infrastructure Solutions', Icon: Server },
  { name: 'DevOps Masters', Icon: GitFork },
  { name: 'Platform Builders', Icon: Layers },
  { name: 'Automation Experts', Icon: Settings2 },
  { name: 'Energy Corp', Icon: Zap },
];

const marqueeVariants = {
  animate: {
    x: ['0%', '-100%'], // Animate from original position to completely off-screen to the left
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 60, // Duration for one full loop of the duplicated content
        ease: 'linear',
      },
    },
  },
};

export default function TrustedBySection() {
  // Duplicate partners for seamless looping
  const duplicatedPartners = [...partners, ...partners];

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
                className="flex-shrink-0 w-32 h-20 mx-4 flex items-center justify-center"
              >
                <partner.Icon className="w-10 h-10 text-muted-foreground opacity-70 hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
