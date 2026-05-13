import { motion, useScroll, useTransform } from "motion/react";
import { RevealText } from "./RevealText";

export function Hero({ isReady = true }: { isReady?: boolean }) {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.95 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center z-10"
      >
        <div className="overflow-hidden mb-4">
          <motion.div 
            initial={{ y: "150%", rotate: 5, opacity: 0 }}
            animate={isReady ? { y: 0, rotate: 0, opacity: 1 } : { y: "150%", rotate: 5, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-serif text-5xl md:text-8xl tracking-widest uppercase text-[#111111] dark:text-[#F9F9F8]"
            style={{ transformOrigin: "bottom left" }}
          >
            Mirage
          </motion.div>
        </div>
        
        <div className="overflow-hidden mb-20">
          <motion.div 
            initial={{ y: "150%", rotate: -5, opacity: 0 }}
            animate={isReady ? { y: 0, rotate: 0, opacity: 0.6 } : { y: "150%", rotate: -5, opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-sans text-[10px] md:text-xs tracking-[0.8em] uppercase font-bold text-[#111111] dark:text-[#F9F9F8]"
            style={{ transformOrigin: "bottom right" }}
          >
            Customs
          </motion.div>
        </div>

        {isReady && (
          <div className="font-serif text-2xl md:text-4xl italic opacity-80 max-w-2xl leading-relaxed text-[#111111] dark:text-[#F9F9F8] flex justify-center">
            <RevealText delay={0.8} text='"The Architecture of Cold Power."' />
          </div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 1 : 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 flex flex-col items-center gap-6 text-[#111111] dark:text-[#F9F9F8]"
      >
         <span className="text-[10px] uppercase tracking-[0.3em] font-semibold opacity-40">Begin the journey</span>
         <motion.div 
           initial={{ height: 0 }}
           animate={{ height: isReady ? "4rem" : 0 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
           className="w-[1px] bg-[#111111]/20 dark:bg-white/20 origin-top" 
         />
      </motion.div>
    </section>
  );
}
