import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Smooth random increments
      currentProgress += Math.floor(Math.random() * 8) + 2; 
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) setTimeout(onComplete, 1000);
        }, 500); // Hold at 100% briefly
      }
      setProgress(currentProgress);
    }, 40);
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#F9F9F8] dark:bg-[#050505] text-[#111111] dark:text-[#F9F9F8] overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100vh" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center justify-center relative overflow-hidden h-32">
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl md:text-5xl tracking-widest uppercase mb-4 opacity-80"
            >
              Mirage Customs
            </motion.div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold opacity-40 flex items-center gap-4"
            >
              <span>Clinical Precision</span>
              <span className="w-8 border-b-2 border-current"></span>
              <span className="w-8 text-right">{progress}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
