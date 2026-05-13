import { motion } from "motion/react";
import { Instagram } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { RollText } from "./RollText";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer id="contact" className="bg-[#EBEBEA] dark:bg-[#111111] text-[#111111] dark:text-[#F9F9F8] py-12 px-8 flex flex-col items-center transition-colors duration-[1500ms] ease-out">
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest font-semibold opacity-40">
        
        <Magnetic className="mb-8 md:mb-0 w-32 md:justify-start justify-center order-2 md:order-1">
          <a 
            href="https://www.instagram.com/mirage.customs.dxb/" 
            target="_blank" 
            rel="noopener noreferrer"
            data-cursor="true"
            data-cursor-text="Connect"
            className="hover:opacity-100 transition-opacity flex items-center gap-2 p-2"
          >
            <Instagram size={18} />
            <RollText text="Instagram" />
          </a>
        </Magnetic>

        <div className="flex flex-col items-center gap-6 flex-1 order-1 md:order-2 mb-16 md:mb-0">
          <img src="/Logotip.png" alt="Mirage Customs" className="w-16 h-16 object-contain dark:invert invert-0" />
          <div className="flex flex-col items-center gap-2">
            <p className="tracking-[0.3em] font-bold">MIRAGE CUSTOMS</p>
          </div>
        </div>

        <Magnetic className="w-32 md:justify-end justify-center order-3 flex">
          <a 
            href="https://wa.me/971527265505" 
            target="_blank" 
            rel="noopener noreferrer"
            data-cursor="true"
            data-cursor-text="Message"
            className="hover:opacity-100 transition-opacity flex items-center gap-2 p-2"
          >
            <WhatsAppIcon className="w-[18px] h-[18px]" />
            <RollText text="WhatsApp" />
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
