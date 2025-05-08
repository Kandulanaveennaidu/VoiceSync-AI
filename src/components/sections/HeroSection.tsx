
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
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 wave-bg text-foreground" // Changed text color to foreground
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-purple-500/15 dark:from-primary/20 dark:to-purple-600/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div variants={slideUp(0.1)}>
            <Badge variant="outline" className="mb-6 py-2 px-4 border-primary/50 text-primary bg-primary/10">
              <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" /> 5-Star Rated AI Solution
            </Badge>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400"
            variants={slideUp(0.2)}
          >
            AI Calls, Made Simple
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto" // Removed text-foreground, inherits from section
            variants={slideUp(0.3)}
          >
            The Future of Communication. Empower your agency with intelligent voice agents that qualify leads, book meetings, and scale your business 24/7.
          </motion.p>
          <motion.div 
            className="flex justify-center items-center space-x-4 mb-12"
            variants={slideUp(0.4)}
          >
             <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="animate-bounce-gentle"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-4 bg-gradient-to-br from-primary to-purple-600 dark:from-blue-500 dark:to-purple-700 rounded-full shadow-2xl w-auto h-auto hover:bg-gradient-to-br hover:from-primary/90 hover:to-purple-600/90 dark:hover:from-blue-500/90 dark:hover:to-purple-700/90 transition-all duration-300 ease-in-out"
                  onClick={() => setIsVoiceModalOpen(true)}
                  aria-label="Open Voice Tools"
                >
                  <Mic className="w-20 h-20 md:w-24 md:h-24 text-white" />
                </Button>
              </motion.div>
          </motion.div>
          <motion.div variants={slideUp(0.5)}>
            <Button size="lg" asChild>
              <Link href="#pricing">Try Free</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
      <VoiceToolsModal isOpen={isVoiceModalOpen} onClose={() => setIsVoiceModalOpen(false)} />
    </>
  );
}
