import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function SplitText({ text, className = "", delay = 0, as: Tag = "div" }: { text: string, className?: string, delay?: number, as?: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex mr-[0.25em] pb-[0.2em] mt-[-0.2em]">
          <motion.span
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.04 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
