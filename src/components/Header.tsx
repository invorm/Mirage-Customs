import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Magnetic } from "./Magnetic";
import { useState } from "react";
import { RollText } from "./RollText";

interface HeaderProps {
  onOpenModal: () => void;
  theme: "light" | "dark";
  isReady?: boolean;
}

export function Header({ onOpenModal, theme, isReady = true }: HeaderProps) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
        initial: { y: -20, opacity: 0 }
      }}
      initial="initial"
      animate={!isReady ? "initial" : hidden ? "hidden" : "visible"}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 text-[#111111] dark:text-white transition-colors duration-[1500ms] pb-[60px] pointer-events-none"
    >
      {/* Progressive Blur Background */}
      <div 
        className="absolute inset-0 bg-[#F9F9F8]/90 dark:bg-[#050505]/90 md:bg-[#F9F9F8]/80 md:dark:bg-[#050505]/80 md:backdrop-blur-2xl transition-colors duration-[1500ms]"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      />
      
      <div className="relative z-10 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 pointer-events-auto">
        <Magnetic>
          <button onClick={scrollToTop} aria-label="Scroll to top" className="flex items-center gap-4 hover:opacity-80 transition-opacity p-2">
            <img 
              src="/Logotip.png" 
              alt="Mirage Customs" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain dark:invert invert-0 transition-all duration-[1500ms]" 
            />
            <div className="font-serif tracking-[0.2em] uppercase text-sm font-semibold hidden sm:block">
              Mirage Customs
            </div>
          </button>
        </Magnetic>
        
        <nav className="hidden md:flex gap-12 text-xs font-medium tracking-widest uppercase opacity-80">
          <Magnetic><a href="#series" className="pb-1 block p-2"><RollText text="Series" /></a></Magnetic>
          <Magnetic><a href="#studio" className="pb-1 block p-2"><RollText text="Studio" /></a></Magnetic>
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <Magnetic>
            <button 
              onClick={() => onOpenModal()}
              data-cursor="true"
              data-cursor-text="Inquire"
              className="bg-[#111111] text-[#F9F9F8] dark:bg-white dark:text-black px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs uppercase tracking-widest font-semibold hover:bg-opacity-80 dark:hover:bg-opacity-90 transition-all active:scale-95 cursor-pointer whitespace-nowrap block"
            >
              <RollText text="Reserve" />
            </button>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}
