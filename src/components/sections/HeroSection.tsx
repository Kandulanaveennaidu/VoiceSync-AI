
'use client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SoundwaveCanvas from '@/components/effects/SoundwaveCanvas';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});


export default function HeroSection() {

  return (
    <>
      <motion.section
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-foreground bg-gradient-to-br from-primary via-purple-500 to-pink-500 overflow-hidden"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <SoundwaveCanvas />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div variants={slideUp(0.1)}>
            <Badge variant="outline" className="mb-6 py-2 px-4 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 shadow-md backdrop-blur-sm bg-opacity-50">
              <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" /> 5-Star Rated AI Solution
            </Badge>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-400 leading-tight"
            variants={slideUp(0.2)}
          >
            AI Calls, Made Simple
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/90 dark:text-gray-200/90 mb-10 max-w-3xl mx-auto"
            variants={slideUp(0.3)}
          >
            The Future of Communication. Empower your agency with intelligent voice agents that qualify leads, book meetings, and scale your business 24/7.
          </motion.p>
          <motion.div
            className="flex justify-center items-center space-x-4 mb-12"
            variants={slideUp(0.4)}
          >
             <motion.div
                className="animate-pulse-glow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-4 bg-gradient-to-br from-primary/70 to-purple-600/70 dark:from-blue-500/70 dark:to-purple-700/70 rounded-full shadow-2xl w-auto h-auto hover:bg-gradient-to-br hover:from-primary/80 hover:to-purple-600/80 dark:hover:from-blue-500/80 dark:hover:to-purple-700/80 transition-all duration-300 ease-in-out backdrop-blur-sm bg-white/10"
                  aria-label="Voice Icon"
                >
                  <Mic className="w-48 h-48 md:w-56 md:h-56 text-primary" />
                </Button>
              </motion.div>
          </motion.div>
          <motion.div variants={slideUp(0.5)}>
            <Button size="lg" asChild className="text-lg px-10 py-6 bg-white text-primary hover:bg-slate-200">
              <Link href="#pricing">Try Free</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
