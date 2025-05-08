
"use client";
import { Button } from '@/components/ui/button';
import { Handshake } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PartnerProgramSection() {
  return (
    <motion.section 
      id="partner" 
      className="py-20 bg-background"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-muted/50 p-12 rounded-xl shadow-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          >
            <Handshake className="w-16 h-16 text-primary mx-auto mb-6" />
          </motion.div>
          <motion.h2 
            className="text-4xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Become a Nedzo Partner
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our partner program and offer cutting-edge AI voice solutions to your clients. Grow your agency with generous commissions, dedicated support, and co-marketing opportunities.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/partners">Learn More About Partnership</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
