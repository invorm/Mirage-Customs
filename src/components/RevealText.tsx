import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { cn } from "../lib/utils";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function RevealText({ text, className, delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: () => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1] as any, duration: 1 } },
    hidden: { opacity: 0, y: 40 },
  };

  return (
    <motion.p
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("flex flex-wrap", className)}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden inline-flex mr-[0.25em] mb-[-0.2em] pb-[0.2em]">
          <motion.span variants={child} dangerouslySetInnerHTML={{ __html: word }} />
        </span>
      ))}
    </motion.p>
  );
}
