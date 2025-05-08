import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserX, TrendingUp } from 'lucide-react';

const problems = [
  {
    icon: <UserX className="w-10 h-10 text-primary mb-4" />,
    title: 'Low Client Retention',
    description: 'Struggling to keep clients engaged and satisfied due to missed calls or slow lead follow-up?',
  },
  {
    icon: <Users className="w-10 h-10 text-primary mb-4" />,
    title: 'Painful Hiring',
    description: 'Finding, training, and managing call center staff is expensive and time-consuming.',
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-primary mb-4" />,
    title: 'Growing Your Agency',
    description: 'Scaling your call operations to handle more leads is a bottleneck for agency growth.',
  },
];

export default function ProblemStatementSection() {
  return (
    <section className="py-20 bg-muted/30 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-foreground mb-4">
          Your Leads Are Draining Your Agency
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Stop losing potential revenue and valuable clients. Nedzo AI tackles the core challenges that hinder your agency's efficiency and growth.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 animate-slide-up" style={{animationDelay: `${index * 0.15}s`}}>
              <CardHeader>
                <div className="flex justify-center">{problem.icon}</div>
                <CardTitle className="text-2xl font-semibold text-foreground">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
