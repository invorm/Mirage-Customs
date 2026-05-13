import { motion } from "motion/react";
import React from "react";

export function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.div
      className={`relative overflow-hidden inline-flex items-center justify-center group ${className}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.span
        variants={{
          rest: { y: 0 },
          hover: { y: "-100%" },
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center"
      >
        {text}
      </motion.span>
      <motion.span
        variants={{
          rest: { y: "100%" },
          hover: { y: 0 },
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </motion.div>
  );
}
