import { motion } from "motion/react";
import React from "react";

interface DrawLineProps {
  className?: string;
  horizontal?: boolean;
  delay?: number;
  duration?: number;
}

export function DrawLine({ className = "", horizontal = true, delay = 0, duration = 1.5 }: DrawLineProps) {
  return (
    <motion.div
      initial={{ 
        scaleX: horizontal ? 0 : 1, 
        scaleY: horizontal ? 1 : 0, 
        transformOrigin: horizontal ? "left" : "top" 
      }}
      whileInView={{ 
        scaleX: 1, 
        scaleY: 1 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
      className={`bg-[#111111]/15 dark:bg-white/15 ${className}`}
    />
  );
}
