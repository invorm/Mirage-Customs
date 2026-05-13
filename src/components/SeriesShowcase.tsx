import { motion, useScroll, useTransform, useMotionTemplate, useSpring, useVelocity, useMotionValue } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { cn } from "../lib/utils";
import { SplitText } from "./SplitText";
import { DrawLine } from "./DrawLine";

const seriesData = [

  {
    id: "01",
    name: "PROJECT: OBSIDIAN",
    basePrice: "STARTING AT 49,000 AED",
    description: "Ahead of its time. This build is our defiance against uninspired, assembly-line solutions. The centerpiece is the filigree routing of the bespoke liquid cooling system. Perfect tube geometry, hypnotic fluid aesthetics, and premium EKWB components create a unique visual rhythm. Cold, powerful, and absolutely exclusive. Only 5 individuals worldwide will be able to call it their own.",
    specs: {
      "Visual Signature": "Stealth White & Chrome",
      "Acoustic Profile": "Dead-Silent Operation",
      "Thermal Architecture": "Precision Liquid Topography",
      "Performance Caliber": "Uncompromised Flagship Tier"
    },
    status: "[DELIVERED]",
    images: [
      "/5_post.png",
      "/2_post.png",
      "/3_post.png",
      "/4_post.png",
      "/6_post.png"
    ],
    comingSoon: false,
    availability: {
      total: 5,
      claimed: 4,
      active: 5
    }
  },
  {
    id: "02",
    name: "PROJECT: JOKER",
    status: "[CLASSIFIED - ALLOCATIONS OPEN SOON]",
    description: "An homage to chaos and precision. Project: Joker is currently under strict confidentiality. Await the revelation of its asymmetric liquid cooling architecture.",
    image: "/Joker.png",
    comingSoon: true,
  }
];

const UnitAvailability = React.memo(function UnitAvailability({ total = 5, claimed = 2, active = 3, onInquire }: { total?: number, claimed?: number, active?: number, onInquire: () => void }) {
  return (
    <div className="w-full mt-24 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col gap-2"
        >
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80 font-medium">Experimental Craftsmanship. Uncompromised Performance.</span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-80 font-medium">Only 0{total} Units Worldwide.</span>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          onClick={() => onInquire()}
          data-cursor="true"
          data-cursor-text="Apply"
          className="px-6 py-3 border border-cyan-500/30 bg-cyan-900/10 hover:bg-cyan-900/30 text-[10px] tracking-[0.2em] uppercase font-bold transition-all shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] whitespace-nowrap cursor-pointer"
        >
          Inquire for Unit 0{active}
        </motion.button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 w-full gap-x-2 md:gap-x-4 gap-y-6 pb-4">
        {Array.from({ length: total }).map((_, i) => {
          const unitNum = i + 1;
          const isClaimed = unitNum <= claimed;
          const isActive = unitNum === active;

          return (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
              className="w-full flex flex-col gap-3"
            >
              <div 
                className={cn(
                  "h-[4px] md:h-[6px] w-full rounded-full transition-all duration-1000 relative overflow-hidden",
                  isClaimed 
                    ? "bg-[#111111] dark:bg-[#8FE3F9] shadow-[0_0_15px_rgba(0,0,0,0.2)] dark:shadow-[0_0_15px_rgba(143,227,249,0.5)] border border-[#111111] dark:border-[#8FE3F9]" 
                    : isActive 
                      ? "bg-transparent border border-[#111111]/30 dark:border-[#8FE3F9]/30" 
                      : "bg-transparent border border-[#111111]/10 dark:border-white/10"
                )} 
              >
                  {isClaimed && (
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                      className="absolute inset-y-0 w-12 bg-white/50 dark:bg-white blur-md opacity-80" 
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      animate={{ opacity: [0.1, 0.4, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-[#111111] dark:bg-[#8FE3F9]" 
                    />
                  )}
              </div>
              <span className={cn(
                "text-[8px] md:text-[10px] uppercase tracking-widest font-semibold whitespace-nowrap",
                isClaimed ? "text-[#111111] dark:text-[#8FE3F9] opacity-90 dark:drop-shadow-[0_0_10px_rgba(143,227,249,0.3)]" : isActive ? "text-[#111111] dark:text-white opacity-90" : "text-[#111111]/30 dark:text-white/30"
              )}>
                Unit 0{unitNum}: {isClaimed ? 'Claimed' : 'Available'}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

const ComingSoonBlock = React.memo(function ComingSoonBlock({ data, index }: { data: any, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  // Shutter reveal: revealing from center vertically -> opening up
  const clipPath = useTransform(scrollYProgress, [0.1, 0.5], ["inset(50% 0 50% 0)", "inset(0% 0 0% 0)"]);
  
  return (
      <div ref={containerRef} className="min-h-[80vh] md:min-h-screen bg-[#F9F9F8] dark:bg-[#050505] flex flex-col items-center justify-center text-[#111111] dark:text-[#F9F9F8] relative py-32 px-6 overflow-hidden transition-colors duration-[1500ms] ease-out">
        <DrawLine className="absolute top-0 left-0 right-0 h-[1px] bg-[#111111]/5 dark:bg-white/5 z-20" horizontal={true} />
        
        {/* Mysterious Silhouette Background */}
        {data.image && (
          <motion.div style={{ y: yImage, clipPath }} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
               <img 
                 src={data.image} 
                 alt="Silhouette" 
                 className="w-full h-[120%] object-cover object-center transform-gpu scale-110 opacity-[0.3] dark:opacity-[0.15] invert dark:invert-0"
                 style={{ WebkitBackfaceVisibility: "hidden" }}
               />
               {/* Gradient Overlays for Mystery */}
               <div className="absolute inset-0 bg-gradient-to-t from-[#F9F9F8] dark:from-[#050505] via-transparent to-[#F9F9F8] dark:to-[#050505]" />
               <div className="absolute inset-0 bg-gradient-to-l from-[#F9F9F8] dark:from-[#050505] via-transparent to-[#F9F9F8] dark:to-[#050505]" />
               <div className="absolute inset-0 bg-[#F9F9F8]/60 dark:bg-black/30 md:backdrop-blur-[2px]" />
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center text-center w-full"
        >
          <span className="font-serif text-2xl uppercase tracking-widest opacity-30 mb-8 block font-light">0{index + 1}</span>
          <h2 className="font-serif text-4xl md:text-8xl mb-12 uppercase tracking-[0.2em] drop-shadow-[0_0_80px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_80px_rgba(255,255,255,0.2)] text-transparent bg-clip-text bg-gradient-to-b from-[#111111] to-[#111111]/40 dark:from-white dark:to-white/40">{data.name}</h2>
          <DrawLine className="h-[1px] w-24 mb-12 bg-[#111111]/30 dark:bg-white/30" />
          <div className="flex flex-col items-center gap-4">
            <p className="text-[10px] md:text-sm uppercase tracking-[0.6em] opacity-60 font-semibold text-[#111111]/90 dark:text-white/90">{data.status}</p>
            {data.basePrice && (
              <p className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium text-[#111111] dark:text-white px-4 py-2 border border-[#111111]/20 dark:border-white/20 rounded-full">{data.basePrice}</p>
            )}
          </div>
          {data.description && (
            <p className="text-[10px] md:text-xs max-w-md mx-auto uppercase tracking-[0.2em] opacity-40 mt-8 font-semibold leading-relaxed text-[#111111]/90 dark:text-white/90">{data.description}</p>
          )}
        </motion.div>
     </div>
  );
});

const GalleryImage = React.memo(function GalleryImage({ src, i, totalSlides, scrollYProgress, dataName }: { src: string, i: number, totalSlides: number, scrollYProgress: any, dataName: string }) {
  // Desktop timeline calculation
  const start = i / totalSlides;
  const center = (i + 1) / totalSlides;
  const end = (i + 2) / totalSlides;

  const imgX = useTransform(scrollYProgress, [start, center, end], ["-8%", "0%", "8%"]);
  
  const safeClipPath = useTransform(scrollYProgress, (v: number) => {
    if (v < start) return "inset(0 100% 0 0)";
    if (v > start + 0.1) return "inset(0 0% 0 0)";
    return `inset(0 ${100 - ((v - start) / 0.1) * 100}% 0 0)`;
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { damping: 30, stiffness: 200, mass: 0.5 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { damping: 30, stiffness: 200, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center shrink-0 relative p-6 md:p-16">
      <motion.div 
        style={{ clipPath: safeClipPath, perspective: 1500 }}
        className="w-full md:max-w-4xl h-[60vh] md:h-[80vh] relative flex items-center justify-center group rounded-2xl md:rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.7)] transition-colors duration-[1500ms] ease-out z-10"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
           style={{ rotateX, rotateY }}
           className="w-full h-full relative overflow-hidden rounded-2xl md:rounded-[2rem]"
        >
          <motion.div style={{ x: imgX }} className="absolute left-[-15%] w-[130%] h-full max-w-none transition-transform duration-[3s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105">
              <img 
                src={src} 
                alt={`${dataName} detail ${i + 1}`}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="w-full h-full object-cover transform-gpu"
                style={{ WebkitBackfaceVisibility: "hidden" }}
              />
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-12 left-12 md:left-24 font-serif text-6xl opacity-20 z-20">0{i + 1}</div>
    </div>
  );
});

const CompletedBuildBlock = React.memo(function CompletedBuildBlock({ data, onOpenModal }: { data: any, onOpenModal: (interest?: string) => void }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end end"] });
  
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    let timeoutId: number;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    checkMobile(); // initial check
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const totalSlides = data.images.length + 1; // Title slide + images

  // On desktop, we want to slide to the end, then freeze for 1 "screen" of scroll.
  // The progress calculation: The scroll range is (totalSlides + 1) * 100vh.
  // The horizontal stop point is when we've processed totalSlides screens of scroll.
  const endProgress = (totalSlides - 1) / totalSlides;
  const x = useTransform(smoothProgress, [0, endProgress, 1], ["0%", `-${(totalSlides - 1) * 100}vw`, `-${(totalSlides - 1) * 100}vw`]);

  if (isMobile) {
    return (
      <section className="bg-[#EBEBEA] dark:bg-[#050505] text-[#111111] dark:text-[#F9F9F8] relative z-10 transition-colors duration-[1500ms] ease-out">
        <div className="min-h-screen flex flex-col justify-center px-6 py-24 max-w-7xl mx-auto relative">
           <DrawLine className="absolute top-0 left-0 right-0 h-[1px] bg-[#111111]/5 dark:bg-white/5" horizontal={true} />
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           >
             <span className="text-[10px] tracking-[0.4em] font-semibold uppercase opacity-40 mb-8 block">Series {data.id}/05</span>
             <h2 className="font-serif text-5xl mb-6 uppercase leading-tight">{data.name}</h2>
             
             {data.basePrice && (
               <div className="mb-8">
                 <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#111111] dark:text-white px-4 py-2 border border-[#111111]/20 dark:border-white/20 rounded-full inline-block">
                   {data.basePrice}
                 </span>
               </div>
             )}

             <p className="text-lg leading-relaxed opacity-70 mb-12">{data.description}</p>
             
             <div className="flex flex-col gap-8">
               {Object.entries(data.specs).map(([key, val], idx) => (
                 <div key={key} className="flex flex-col relative pt-4">
                   <DrawLine delay={idx * 0.1} className="absolute top-0 left-0 right-0 h-[1px] bg-[#111111]/10 dark:bg-white/10" horizontal={true} />
                   <span className="text-[10px] uppercase tracking-widest opacity-40 mb-2">{key}</span>
                   <span className="text-sm font-medium">{val as string}</span>
                 </div>
               ))}
             </div>
             
             {data.availability && (
                 <UnitAvailability 
                   total={data.availability.total} 
                   claimed={data.availability.claimed} 
                   active={data.availability.active} 
                   onInquire={() => onOpenModal(data.name)}
                 />
             )}
           </motion.div>
        </div>

        <div className="w-full bg-[#EBEBEA] dark:bg-[#050505] pb-24 px-6 flex flex-col gap-8">
           {data.images.map((src: string, i: number) => (
             <div key={i} className="w-full relative rounded-2xl overflow-hidden shadow-2xl bg-[#111111]/5 dark:bg-white/5">
                <img 
                  src={src} 
                  alt={`${data.name} detail ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-4 left-4 font-serif text-3xl opacity-30 text-white mix-blend-difference">0{i + 1}</div>
             </div>
           ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#EBEBEA] dark:bg-[#050505] text-[#111111] dark:text-[#F9F9F8] relative z-10 transition-colors duration-[1500ms] ease-out">
      {/* Intro specs block */}
      <div className="min-h-screen flex flex-col justify-center px-6 md:px-24 py-32 max-w-7xl mx-auto relative">
         <DrawLine className="absolute top-0 left-0 right-0 h-[1px] bg-[#111111]/5 dark:bg-white/5" horizontal={true} />
         <DrawLine className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#111111]/5 dark:bg-white/5" horizontal={true} />
         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
           className="max-w-4xl"
         >
           <span className="text-[10px] tracking-[0.4em] font-semibold uppercase opacity-40 mb-8 block">Series {data.id}/05</span>
           <h2 className="font-serif text-5xl md:text-8xl mb-6 uppercase">{data.name}</h2>
           
           {data.basePrice && (
             <div className="mb-12">
               <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[#111111] dark:text-white px-5 py-2.5 border border-[#111111]/20 dark:border-white/20 rounded-full inline-block backdrop-blur-sm">
                 {data.basePrice}
               </span>
             </div>
           )}

           <p className="text-lg md:text-xl leading-relaxed opacity-70 mb-16">{data.description}</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
             {Object.entries(data.specs).map(([key, val], idx) => (
               <div key={key} className="flex flex-col relative pt-4">
                 <DrawLine delay={idx * 0.1} className="absolute top-0 left-0 right-0 h-[1px] bg-[#111111]/10 dark:bg-white/10" horizontal={true} />
                 <span className="text-[10px] uppercase tracking-widest opacity-40 mb-2">{key}</span>
                 <span className="text-sm font-medium">{val as string}</span>
               </div>
             ))}
           </div>
           
           {data.availability && (
               <UnitAvailability 
                 total={data.availability.total} 
                 claimed={data.availability.claimed} 
                 active={data.availability.active} 
                 onInquire={() => onOpenModal(data.name)}
               />
           )}
         </motion.div>
      </div>



      {/* Desktop Horizontal Sticky Gallery */}
      <div 
        ref={targetRef} 
        style={{ height: `${(totalSlides + 1) * 100}vh` }} 
        className="relative bg-[#EBEBEA] dark:bg-[#050505] text-[#111111] dark:text-[#F9F9F8] transition-colors duration-[1500ms] ease-out hidden md:block"
      >
        <div className="w-full bg-[#EBEBEA] dark:bg-[#050505] transition-colors duration-[1500ms] ease-out sticky top-0 overflow-hidden flex items-center h-screen">
           <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 flex gap-4 items-center opacity-40">
               <DrawLine className="h-[1px] w-8 bg-[#111111] dark:bg-white" />
               <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to inspect</span>
               <DrawLine className="h-[1px] w-8 bg-[#111111] dark:bg-white" delay={0.2} />
           </div>

           <motion.div 
              style={{ x }} 
              className="flex h-screen items-center z-10 w-max will-change-transform"
           >
             {/* Text Reveal Title Slide */}
             <div className="w-screen h-screen flex flex-col items-center justify-center p-6 shrink-0 relative">
               <SplitText as="h3" delay={0.2} text="The Archives" className="font-serif text-4xl md:text-7xl uppercase tracking-[0.1em] text-[#111111] dark:text-white text-center justify-center" />
               <p className="uppercase tracking-[0.4em] text-xs opacity-40 mt-8 text-[#111111] dark:text-white">Scroll to reveal details</p>
             </div>

              {/* Images */}
              {data.images.map((src: string, i: number) => (
                 <GalleryImage 
                    key={i} 
                    src={src} 
                    i={i} 
                    totalSlides={totalSlides} 
                    scrollYProgress={smoothProgress} 
                    dataName={data.name} 
                 />
              ))}
           </motion.div>
        </div>
      </div>
    </section>
  )
});

export function SeriesShowcase({ onOpenModal, setForcedTheme }: { onOpenModal: (interest?: string) => void, setForcedTheme: (val: "light" | "dark" | null) => void }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0 && v < 1) {
        setForcedTheme("dark");
      } else {
        setForcedTheme(null);
      }
    });
  }, [scrollYProgress, setForcedTheme]);

  return (
    <section id="series" ref={containerRef} className="relative z-10 w-full transition-colors duration-[1500ms] ease-out">
      {seriesData.map((data, i) => (
         data.comingSoon 
           ? <ComingSoonBlock key={data.id} data={data} index={i} />
           : <CompletedBuildBlock key={data.id} data={data} onOpenModal={onOpenModal} />
      ))}
    </section>
  );
}
