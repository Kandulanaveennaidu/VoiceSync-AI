
"use client";
import { Button } from '@/components/ui/button';
import { Zap, Users, DollarSign, Award } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const values = [
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: 'Operational Efficiency',
    description: 'Streamline workflows by automating routine communication tasks, allowing your team to focus on strategic initiatives and client relationships.',
  },
  {
    icon: <DollarSign className="w-8 h-8 text-primary" />,
    title: 'Cost Optimization',
    description: 'Achieve substantial reductions in overhead associated with traditional call handling, including staffing, training, and infrastructure.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Enhanced Lead Qualification',
    description: 'Implement consistent, prompt, and intelligent engagement with every lead, significantly improving qualification rates and pipeline velocity.',
  },
  {
    icon: <Award className="w-8 h-8 text-primary" />,
    title: 'Superior Client Engagement',
    description: 'Deliver always-on, professional communication that ensures no client interaction is missed, fostering loyalty and increasing satisfaction.',
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.15,
      duration: 0.5,
    },
  }),
};

export default function ValuePropositionSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-foreground mb-6"
        >
          AI Voice Agents Will Transform Your Agency
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground mb-16 max-w-3xl mx-auto"
        >
          Move beyond traditional call centers. Nedzo AI empowers your agency with cutting-edge voice technology to achieve unprecedented growth and operational excellence.
        </motion.p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <div className="p-6 bg-muted/30 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: values.length * 0.15 }}
        >
            <Button size="lg" asChild>
            <Link href="#pricing">Discover The Transformation</Link>
            </Button>
        </motion.div>
      </div>
    </section>
  );
}
