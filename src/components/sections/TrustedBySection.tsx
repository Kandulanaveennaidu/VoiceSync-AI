
"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logoSrc: string;
  aiHint: string;
}

const partners: Partner[] = [
  { name: 'Agency Alpha', logoSrc: 'https://picsum.photos/150/60?random=1', aiHint: 'modern agency' },
  { name: 'Beta Solutions', logoSrc: 'https://picsum.photos/160/50?random=2', aiHint: 'tech company' },
  { name: 'Gamma Growth', logoSrc: 'https://picsum.photos/140/65?random=3', aiHint: 'marketing firm' },
  { name: 'Delta Digital', logoSrc: 'https://picsum.photos/155/55?random=4', aiHint: 'digital agency' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export default function TrustedBySection() {
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
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {partners.map((partner) => (
            <motion.div 
              key={partner.name} 
              className="opacity-70 hover:opacity-100 transition-opacity duration-300" 
              title={partner.name}
              variants={itemVariants}
            >
              <Image
                src={partner.logoSrc}
                alt={`${partner.name} logo`}
                width={150} 
                height={60}
                className="object-contain h-10 md:h-12"
                data-ai-hint={partner.aiHint}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
