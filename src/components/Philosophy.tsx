import { motion } from "motion/react";
import { SplitText } from "./SplitText";
import { RevealText } from "./RevealText";
import { DrawLine } from "./DrawLine";

export function Philosophy() {
  return (
    <section id="philosophy" className="py-32 md:py-56 px-6 text-[#111111] dark:text-[#F9F9F8] overflow-hidden transition-colors duration-[1500ms] ease-out bg-[#EBEBEA] dark:bg-[#111111]">
      <div className="max-w-5xl mx-auto flex flex-col gap-32 md:gap-40">
        
        {/* Block 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-10 flex items-center gap-4">
            <DrawLine className="w-8 h-[1px]" />
            The Vision
          </h3>
          <div className="font-serif text-3xl md:text-5xl leading-[1.3] md:leading-[1.2] tracking-tight">
            <RevealText text="No assembly lines. No mass production. Mirage Customs is a boutique studio driven by a singular vision of technological perfection." />
          </div>
          <div className="font-sans text-lg md:text-xl leading-[1.8] opacity-80 mt-12 max-w-3xl font-light">
             <RevealText text="Every machine is meticulously conceptualized, hand-built, and stress-tested by a single master builder. We don't just assemble components; we construct kinetic sculptures. This is why every edition is strictly limited to 5 units worldwide." />
          </div>
        </motion.div>

        {/* Block 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="md:pl-24"
        >
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-10 flex items-center gap-4">
            <DrawLine className="w-8 h-[1px]" />
            The Art of Cooling
          </h3>
          <div className="font-serif text-3xl md:text-5xl leading-[1.3] md:leading-[1.2] tracking-tight">
            <RevealText text="The Architecture of Cold Power." />
          </div>
          <div className="font-sans text-lg md:text-xl leading-[1.8] opacity-80 mt-12 max-w-3xl font-light">
             <RevealText text="While conventional cooling systems serve their functional purpose, our bespoke hard-line water loops exist for a different reason: Unapologetic aesthetics. The mesmerizing flow of liquid through perfectly angled acrylic geometry turns raw computing power into a visual theater. It is a bold statement of luxury that cannot be bought off the shelf." />
          </div>
        </motion.div>

        {/* Block 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 mb-10 flex items-center gap-4">
            <DrawLine className="w-8 h-[1px]" />
            Mirage Care
          </h3>
          <div className="font-serif text-3xl md:text-5xl leading-[1.3] md:leading-[1.2] tracking-tight">
            <RevealText text="White-Glove Concierge & Delivery." />
          </div>
          <div className="font-sans text-lg md:text-xl leading-[1.8] opacity-80 mt-12 max-w-3xl font-light">
            <RevealText text="Your masterpiece arrives in a custom matte-black wooden transit crate, delivered and set up personally at your location anywhere in the UAE." />
            <div className="mt-8"></div>
            <RevealText text="And our relationship doesn't end there. The Mirage Care concierge service means if a hardware anomaly ever occurs, we handle the logistics, the teardown, the manufacturer RMA processes, and the bespoke rebuilding of your fluid loop. Zero headache. Total peace of mind." />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
