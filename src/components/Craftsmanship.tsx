import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import { SplitText } from "./SplitText";

export function Craftsmanship() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  
  return (
    <section ref={ref} className="py-24 md:py-40 relative overflow-hidden bg-[#EBEBEA] dark:bg-[#050505] text-[#111111] dark:text-[#F9F9F8] transition-colors duration-[1500ms] ease-out">
       {/* Background Parallax watermarks */}
       <motion.div style={{ y: y1 }} className="absolute opacity-[0.03] dark:opacity-[0.02] text-[15vw] font-serif whitespace-nowrap left-1/2 -translate-x-1/2 top-[10%] pointer-events-none uppercase">
          Obsessive Details
       </motion.div>

       <div className="container mx-auto px-6 relative z-10">
         <div className="max-w-5xl mx-auto">
            <SplitText as="h2" text="The Anatomy of Perfection" className="text-3xl md:text-5xl font-serif uppercase tracking-widest mb-16 md:mb-28 text-center justify-center" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
               <StatBox delay={0.1} num="120" unit="Hours" text="Of meticulous manual assembly & rigid tube routing" />
               <StatBox delay={0.2} num="3" unit="Stages" text="Of brutal thermal & acoustic stress-testing" />
               <StatBox delay={0.3} num="1" unit="Master" text="Dedicated visionary per system. Zero compromises." />
            </div>
         </div>
       </div>
    </section>
  );
}

const StatBox = React.memo(function StatBox({ num, unit, text, delay }: { num: string, unit: string, text: string, delay: number }) {
   return (
     <div className="flex flex-col items-center text-center group cursor-default">
       <div className="flex items-baseline gap-2 mb-6 md:mb-8">
          <div className="overflow-hidden pb-2">
            <motion.span 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
              className="text-7xl md:text-8xl font-serif block group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {num}
            </motion.span>
          </div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 1, delay: delay + 0.4 }}
            className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-mono opacity-50 block"
          >
            {unit}
          </motion.span>
       </div>
       <motion.p 
         initial={{ opacity: 0, y: 10 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-5%" }}
         transition={{ duration: 0.8, delay: delay + 0.2 }}
         className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-60 leading-relaxed max-w-[220px]"
       >
         {text}
       </motion.p>
     </div>
   );
});
