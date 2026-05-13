import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "motion/react";
import { useEffect, useState } from "react";

export function BackgroundLogo({ theme }: { theme: 'light' | 'dark' }) {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(1000); // Default fallback

  useEffect(() => {
    setVh(Math.max(window.innerHeight, 800)); // Ensure it's not too small on mobile
  }, []);

  const smoothScroll = useSpring(scrollY, { mass: 0.1, stiffness: 100, damping: 20 });

  // 1: Left part slides from left-top
  const leftX = useTransform(smoothScroll, [0, vh * 0.6], ["-15vw", "0vw"]);
  const leftY = useTransform(smoothScroll, [0, vh * 0.6], ["-10vh", "0vh"]);
  
  // 2: Right part slides from right-top
  const rightX = useTransform(smoothScroll, [0, vh * 0.6], ["15vw", "0vw"]);
  const rightY = useTransform(smoothScroll, [0, vh * 0.6], ["-10vh", "0vh"]);

  // 3: Bottom part slides from bottom
  const bottomY = useTransform(smoothScroll, [0, vh * 0.6], ["15vh", "0vh"]);
  
  // From 0 to appear from the fog, then brightens, then fades to act as background.
  const opacity = useTransform(smoothScroll, [0, vh * 0.2, vh * 0.6, vh * 1], [0, 0.2, 0.5, 0.03]);
  const blurValue = useTransform(smoothScroll, [0, vh * 0.4, vh * 0.6], ["20px", "5px", "0px"]);
  
  // Initially at scale 2, slightly scales down to 1 then scales back up to cover background.
  const scale = useTransform(smoothScroll, [0, vh * 0.65, vh * 1.5], [1.5, 1.2, 1.8]);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden transform-gpu"
      style={{ opacity, scale, filter: useMotionTemplate`blur(${blurValue})`, WebkitBackfaceVisibility: "hidden" }}
    >
      <div className="relative w-full max-w-[80vh] aspect-square">
         {/* Part 1 (Left) */}
         <motion.div
           className="absolute inset-0 z-10"
           style={{ x: leftX, y: leftY }}
         >
           <img src="/1.png" alt="" fetchPriority="high" className={`w-full h-full object-contain transform-gpu transition-[filter] duration-[1500ms] ease-out ${theme === 'dark' ? 'invert' : ''}`} style={{ WebkitBackfaceVisibility: "hidden" }} />
         </motion.div>
         
         {/* Part 2 (Right) */}
         <motion.div
           className="absolute inset-0 z-0"
           style={{ x: rightX, y: rightY }}
         >
           <img src="/2.png" alt="" fetchPriority="high" className={`w-full h-full object-contain transform-gpu transition-[filter] duration-[1500ms] ease-out ${theme === 'dark' ? 'invert' : ''}`} style={{ WebkitBackfaceVisibility: "hidden" }} />
         </motion.div>

         {/* Part 3 (Bottom) */}
         <motion.div
           className="absolute inset-0 z-20"
           style={{ y: bottomY }}
         >
           <img src="/3.png" alt="" fetchPriority="high" className={`w-full h-full object-contain transform-gpu transition-[filter] duration-[1500ms] ease-out ${theme === 'dark' ? 'invert' : ''}`} style={{ WebkitBackfaceVisibility: "hidden" }} />
         </motion.div>
      </div>
    </motion.div>
  );
}
