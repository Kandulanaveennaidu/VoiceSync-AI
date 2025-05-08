
"use client";
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// A more stylized and animated representation of a world map
const InteractiveWorldMap = () => {
  // Coordinates for illustrative "activity" dots. These are for visual effect.
  const activityDots = [
    { cx: "15%", cy: "40%", r: 2.5, delay: "0s" }, // North America West
    { cx: "25%", cy: "30%", r: 3, delay: "0.2s" },   // North America East
    { cx: "28%", cy: "65%", r: 2.5, delay: "0.4s" }, // South America
    { cx: "48%", cy: "32%", r: 3.5, delay: "0.1s" }, // Europe West
    { cx: "55%", cy: "28%", r: 2.5, delay: "0.5s" }, // Europe East / Scandinavia
    { cx: "53%", cy: "55%", r: 3, delay: "0.3s" },   // Africa North
    { cx: "56%", cy: "70%", r: 2, delay: "0.7s" },   // Africa South
    { cx: "70%", cy: "35%", r: 3, delay: "0.2s" },   // Asia Central/Russia
    { cx: "80%", cy: "45%", r: 3.5, delay: "0.6s" }, // East Asia (China/Japan)
    { cx: "75%", cy: "60%", r: 2.5, delay: "0s" },   // Southeast Asia
    { cx: "82%", cy: "75%", r: 3, delay: "0.4s" },   // Australia
  ];

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 150" // Simplified viewBox for easier relative positioning
      className="w-full h-auto max-h-[400px]" // Control max height
      aria-labelledby="worldMapTitle"
      aria-describedby="worldMapDesc"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <title id="worldMapTitle">Abstract World Map</title>
      <desc id="worldMapDesc">An abstract, animated representation of the world map with glowing dots indicating global activity and presence.</desc>
      <defs>
        <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
         <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.8 }} />
          <stop offset="70%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.2 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      {/* Abstracted Continents - simplified paths */}
      <g fill="hsl(var(--primary))" opacity="0.15" filter="url(#mapGlow)">
        {/* North America */}
        <path d="M30 55 Q50 20 90 30 Q100 50 90 70 Q60 90 30 80 Z" />
        {/* South America */}
        <path d="M75 90 Q85 110 75 130 Q65 110 75 90 Z" />
        {/* Europe */}
        <path d="M120 30 Q150 20 170 40 Q160 60 140 60 Q110 50 120 30 Z" />
        {/* Africa */}
        <path d="M135 70 Q160 60 170 80 Q150 110 130 90 Z" />
        {/* Asia */}
        <path d="M180 30 Q230 20 270 50 Q250 90 200 80 Q170 60 180 30Z" />
        {/* Australia */}
        <path d="M240 110 Q260 100 270 120 Q250 140 230 130 Z" />
      </g>

      {/* Pulsing activity dots */}
      {activityDots.map((dot, index) => (
        <g key={index} className="map-activity-dot" style={{ animationDelay: dot.delay }}>
          <circle cx={dot.cx} cy={dot.cy} r={dot.r * 1.8} fill="url(#dotGlow)" opacity="0.7" />
          <circle cx={dot.cx} cy={dot.cy} r={dot.r} fill="hsl(var(--accent-foreground))" opacity="0.9" />
        </g>
      ))}
    </motion.svg>
  );
};


export default function GlobalTrustSection() {
  return (
    <motion.section 
      className="py-20 bg-muted/30 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
        </motion.div>
        <motion.h2 
          className="text-4xl font-bold text-foreground mb-6"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Safe and Efficient for Everyone, Worldwide
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Nedzo AI is built on a secure and scalable infrastructure, trusted by businesses globally to handle sensitive communications with utmost care and efficiency.
        </motion.p>
        <div 
          className="relative mb-12 h-64 md:h-96" // Adjusted height
          data-ai-hint="interactive world map stylized"
        >
          <InteractiveWorldMap />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button size="lg" asChild>
            <Link href="#pricing">Build My FREE AI Voice Agent</Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
