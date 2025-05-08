import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import Link from 'next/link';

// A simple, abstract representation of a world map
const InteractiveWorldMap = () => {
  // Coordinates for illustrative "city" dots. These are arbitrary for visual effect.
  const cityDots = [
    { cx: "20%", cy: "45%" }, // North America
    { cx: "30%", cy: "75%" }, // South America
    { cx: "50%", cy: "35%" }, // Europe
    { cx: "60%", cy: "50%" }, // Africa
    { cx: "75%", cy: "40%" }, // Asia (North/Central)
    { cx: "70%", cy: "70%" }, // Oceania / SE Asia
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 400"
      className="w-full h-full"
      aria-labelledby="worldMapTitle worldMapDesc"
    >
      <title id="worldMapTitle">Stylized World Map</title>
      <desc id="worldMapDesc">An abstract representation of the world map with glowing dots indicating global presence.</desc>
      <defs>
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.75 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      {/* Simplified landmasses - more abstract shapes */}
      <path
        fill="currentColor"
        d="M150,50 Q200,20 250,50 T350,50 Q400,20 450,50 T550,50 Q600,20 650,50 L650,150 Q600,180 550,150 T450,150 Q400,180 350,150 T250,150 Q200,180 150,150 Z
           M100,200 Q150,170 200,200 T300,200 Q350,170 400,200 T500,200 Q550,170 600,200 L600,300 Q550,330 500,300 T400,300 Q350,330 300,300 T200,300 Q150,330 100,300 Z
           M50,120 C 20,150 20,250 50,280 L 80,270 C 60,250 60,150 80,130 Z
           M750,120 C 780,150 780,250 750,280 L 720,270 C 740,250 740,150 720,130 Z"
        opacity="0.1"
      />
       {/* More defined continents with subtle texture/gradient if desired */}
      <path 
        d="M100 250 C50 200, 50 100, 150 80 S 250 50, 300 100 S 280 200, 200 220 Z"
        fill="currentColor" className="opacity-20"
      />
      <path 
        d="M350 150 C300 100, 350 50, 450 80 S 550 100, 500 180 S 450 220, 380 200 Z"
        fill="currentColor" className="opacity-20"
      />
      <path 
        d="M400 320 C350 280, 400 220, 500 250 S 600 300, 550 350 S 450 360, 400 320 Z"
        fill="currentColor" className="opacity-20"
      />
       <path 
        d="M600 120 C580 80, 650 40, 720 80 S 750 150, 700 180 S 650 200, 600 120 Z"
        fill="currentColor" className="opacity-20"
      />
      <path
        d="M650 300 C600 250, 700 200, 750 250 S 700 350, 650 300Z"
        fill="currentColor" className="opacity-20"
      />

      {/* Pulsing dots for cities/activity */}
      {cityDots.map((dot, index) => (
        <g key={index}>
          <circle cx={dot.cx} cy={dot.cy} r="10" fill="url(#glowGradient)" className="animate-pulse-dot-glow" />
          <circle cx={dot.cx} cy={dot.cy} r="3" fill="hsl(var(--accent-foreground))" className="animate-pulse-dot" />
        </g>
      ))}
    </svg>
  );
};


export default function GlobalTrustSection() {
  return (
    <section className="py-20 bg-muted/30 animate-fade-in overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Globe className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Safe and Efficient for Everyone, Worldwide
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
          Nedzo AI is built on a secure and scalable infrastructure, trusted by businesses globally to handle sensitive communications with utmost care and efficiency.
        </p>
        <div 
          className="relative mb-12 h-64 md:h-96 text-primary opacity-75"
          data-ai-hint="interactive world map"
        >
          <InteractiveWorldMap />
        </div>
        <Button size="lg" asChild>
          <Link href="#pricing">Build My FREE AI Voice Agent</Link>
        </Button>
      </div>
    </section>
  );
}
