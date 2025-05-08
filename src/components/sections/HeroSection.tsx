
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, Star } from 'lucide-react';
import Link from 'next/link';
import VoiceToolsModal from '@/components/modals/VoiceToolsModal';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
};

const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay } },
});


export default function HeroSection() {
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  return (
    <>
      <motion.section
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 wave-bg text-foreground"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20 dark:from-primary/30 dark:to-purple-600/30 opacity-70"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div variants={slideUp(0.1)}>
            <Badge variant="outline" className="mb-6 py-2 px-4 border-primary/50 text-primary bg-primary/10 shadow-md">
              <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" /> 5-Star Rated AI Solution
            </Badge>
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 leading-tight"
            variants={slideUp(0.2)}
          >
            AI Calls, Made Simple
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-foreground/90 dark:text-foreground/80 mb-10 max-w-3xl mx-auto"
            variants={slideUp(0.3)}
          >
            The Future of Communication. Empower your agency with intelligent voice agents that qualify leads, book meetings, and scale your business 24/7.
          </motion.p>
          <motion.div
            className="flex justify-center items-center space-x-4 mb-12"
            variants={slideUp(0.4)}
          >
             <motion.div
                className="animate-pulse-glow" // This applies the pulse-glow animation
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  size="icon" // This size prop might be overridden by w-auto h-auto and padding
                  className="p-4 bg-gradient-to-br from-primary to-purple-600 dark:from-blue-500 dark:to-purple-700 rounded-full shadow-2xl w-auto h-auto hover:bg-gradient-to-br hover:from-primary/90 hover:to-purple-600/90 dark:hover:from-blue-500/90 dark:hover:to-purple-700/90 transition-all duration-300 ease-in-out"
                  onClick={() => setIsVoiceModalOpen(true)}
                  aria-label="Open Voice Tools"
                >
                  {/* Increased icon size */}
                  <Mic className="w-48 h-48 md:w-56 md:h-56 text-white" />
                </Button>
              </motion.div>
          </motion.div>
          <motion.div variants={slideUp(0.5)}>
            <Button size="lg" asChild className="text-lg px-10 py-6">
              <Link href="#pricing">Try Free</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
      <VoiceToolsModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
    </>
  );
}
