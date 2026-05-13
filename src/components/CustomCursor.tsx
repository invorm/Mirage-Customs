import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Use pixel values. Start off-screen
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Do not show custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Elements that should trigger the hover state
      const interactiveEl = target.closest('a, button, input, select, textarea, [data-cursor="true"]');
      
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        setCursorText(text || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    // Hide default cursor when our custom cursor is active
    document.documentElement.classList.add('hide-cursor');

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove('hide-cursor');
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* The main solid dot that follows exactly */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 0.3 : 1,
        }}
      />
      {/* The expanding outer ring/text container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        initial={false}
        animate={{
          width: isHovered ? (cursorText ? 80 : 48) : 0,
          height: isHovered ? (cursorText ? 80 : 48) : 0,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="absolute inset-0 border-[1.5px] border-white rounded-full opacity-50" />
        {cursorText && (
           <motion.span 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-[8px] uppercase tracking-[0.2em] font-bold text-white absolute whitespace-nowrap"
           >
             {cursorText}
           </motion.span>
        )}
      </motion.div>
    </>
  );
}
