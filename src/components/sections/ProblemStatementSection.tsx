
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserX, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const problems = [
 {
    icon: <UserX className="w-10 h-10 text-primary mb-4" />,
    title: 'Low Client Retention',
    description: 'Agencies often face challenges in maintaining consistent client engagement and satisfaction, leading to potential churn due to missed opportunities or delayed responses.',
 },
 {
    icon: <Users className="w-10 h-10 text-primary mb-4" />,
    title: 'Painful Hiring',
    description: 'The process of recruiting, onboarding, and managing skilled call center personnel is a significant and costly operational hurdle.',
 },
 {
    icon: <TrendingUp className="w-10 h-10 text-primary mb-4" />,
    title: 'Growing Your Agency',
    description: 'Scaling inbound and outbound call operations efficiently to accommodate increasing lead volume presents a substantial barrier to agency expansion and profitability.',
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

export default function ProblemStatementSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-foreground mb-4"
 >
          Key Challenges for Modern Agencies
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
        >
          Stop losing potential revenue and valuable clients. Nedzo AI tackles the core challenges that hinder your agency's efficiency and growth.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="flex justify-center">{problem.icon}</div>
                  <CardTitle className="text-2xl font-semibold text-foreground">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
