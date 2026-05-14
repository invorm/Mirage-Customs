import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import emailjs from '@emailjs/browser';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from "../lib/emailjs";
import { DrawLine } from "./DrawLine";
import { WhatsAppIcon } from "./WhatsAppIcon";

const OptionPills = ({ label, options, selected, onChange }: { label: string, options: string[], selected: string, onChange: (val: string) => void }) => (
  <div className="flex flex-col gap-3 h-full">
    <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-40 font-medium">{label}</label>
    <div className="flex flex-col gap-2 flex-grow">
      {options.map((opt: string) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`w-full text-center px-4 py-3 md:py-4 text-[9px] md:text-[10px] uppercase tracking-[0.15em] border transition-all duration-300 font-medium h-full ${
            selected.toLowerCase() === opt.toLowerCase() 
              ? "border-[#111111] dark:border-white bg-[#111111] dark:bg-white text-white dark:text-[#111111] shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
              : "border-[#111111]/20 dark:border-white/20 text-[#111111]/50 dark:text-white/50 hover:border-[#111111]/60 dark:hover:border-white/60 hover:text-[#111111] dark:hover:text-white bg-transparent"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

interface CommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
}

export function CommissionModal({ isOpen, onClose, initialInterest = "PROJECT: OBSIDIAN" }: CommissionModalProps) {
  const [phone, setPhone] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState(initialInterest);
  const [gpuTier, setGpuTier] = useState("High-End Compute (RTX 5070 / 4080S Tier)");
  const [cpuTier, setCpuTier] = useState("Balanced High-End (Ryzen 9 / Core i7)");
  const [memoryTier, setMemoryTier] = useState("32GB Titanium");
  const [storageTier, setStorageTier] = useState("4TB NVMe Gen4/5");
  const [customRequests, setCustomRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // Sync interest and reset configurations when modal opens
  useEffect(() => {
    if (isOpen) {
      if (initialInterest) setInterest(initialInterest);
      setGpuTier("High-End Compute (RTX 5070 / 4080S Tier)");
      setCpuTier("Balanced High-End (Ryzen 9 / Core i7)");
      setMemoryTier("32GB Titanium");
      setStorageTier("4TB NVMe Gen4/5");
      setEmail("");
      setName("");
      setPhone("");
      setCustomRequests("");
      setSubmitStatus("idle");
      setErrors({});
    }
  }, [isOpen, initialInterest]);
  
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      (window as any).lenis?.stop();
    } else {
      document.body.style.overflow = "";
      (window as any).lenis?.start();
      const t = setTimeout(() => {
        setSubmitStatus("idle");
        setErrors({});
      }, 500);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
      (window as any).lenis?.start();
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = true;
    if (!phone) newErrors.phone = true;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors({}), 600); // clear shake animation after it plays
      return;
    }
    
    setIsSubmitting(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          email: email,
          phone_number: phone,
          interest: interest,
          gpu_tier: gpuTier,
          cpu_tier: cpuTier,
          memory_tier: memoryTier,
          storage_tier: storageTier,
          custom_requests: customRequests,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSubmitStatus("success");
      setTimeout(() => {
         onClose();
      }, 5000); // Close after 5 seconds of seeing success message
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else if (typeof error === 'object' && error !== null && 'text' in error) {
        setErrorMessage((error as Record<string, any>).text || "There was an error sending your request.");
      } else {
        setErrorMessage(String(error) || "There was an error sending your request.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hello, I would like to inquire about ${interest}...`;
  const whatsappUrl = `https://wa.me/971527265505?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent="true" style={{ overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch' }} className="fixed inset-0 z-[100] text-[#111111] dark:text-[#F9F9F8] overflow-y-auto overflow-x-hidden pt-12 md:pt-0 -webkit-overflow-scrolling-touch">
          {/* Glass Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#EBEBEA]/95 dark:bg-[#050505]/95 backdrop-blur-3xl"
            aria-hidden="true"
          />
          
          <div className="relative w-full max-w-[1920px] mx-auto min-h-[100dvh] flex flex-col lg:flex-row z-10 pointer-events-auto">
            {/* Close Button */}
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 p-4 z-50 text-[#111111]/50 dark:text-white/50 hover:text-[#111111] dark:hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              <X size={28} strokeWidth={1} />
            </motion.button>

             {/* Left Text Col */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -50 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
               className="w-full lg:w-[40%] flex flex-col justify-start lg:sticky lg:top-0 px-8 lg:px-16 xl:px-24 pt-32 lg:pt-48 pb-12 lg:pb-24 lg:h-[100dvh]"
             >
                <div className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-semibold mb-12">Protocol // INITIATION</div>
                <h2 className="font-serif text-5xl xl:text-7xl tracking-tight mb-8 leading-none">
                  Begin <br className="hidden lg:block" />Commission.
                </h2>
                <DrawLine className="h-[1px] w-24 bg-[#111111]/20 dark:bg-white/20 mb-8" />
                <p className="max-w-md text-sm md:text-base opacity-60 font-light leading-relaxed">
                  You are taking the first step towards securing a bespoke masterpiece. <br/><br/>
                  Only fully authenticated inquiries are processed by our team. Provide your details, and a specialist will contact you to discuss allocations.
                </p>
             </motion.div>

             {/* Right Form Col */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: 50 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
               className="w-full lg:w-[60%] flex items-start justify-center p-8 lg:px-16 xl:px-24 lg:pt-32 pb-32"
             >
                <div className="w-full max-w-3xl bg-white/[0.03] p-8 md:p-12 lg:p-16 rounded-[2rem] border border-[#111111]/5 dark:border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
                 {/* Success View */}
                 <AnimatePresence mode="wait">
                 {submitStatus === "success" ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-24 md:py-32 text-center"
                    >
                       <div className="w-16 h-16 border border-[#111111]/20 dark:border-white/20 rounded-full flex items-center justify-center mb-8">
                         <div className="w-2 h-2 bg-[#111111] dark:bg-white rounded-full animate-pulse" />
                       </div>
                       <div className="text-2xl md:text-3xl font-serif tracking-widest uppercase mb-4 text-[#111111] dark:text-white">Directive Received</div>
                       <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-50 leading-relaxed max-w-sm">
                         Your inquiry for {interest} has been confirmed. Our team will contact you shortly.
                       </div>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col gap-10" 
                      onSubmit={handleSubmit}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                        <div className="col-span-1 md:col-span-2">
                          <OptionPills 
                            label="Allocation Request"
                            options={[
                              "PROJECT: OBSIDIAN",
                              "PROJECT: JOKER",
                              "CUSTOM BUILD"
                            ]}
                            selected={interest}
                            onChange={setInterest}
                          />
                        </div>

                        <OptionPills 
                          label="Compute Engine (GPU)"
                          options={[
                            "Flagship Compute (RTX 5090 Tier)",
                            "Enthusiast Compute (RTX 5080 / 4090 Tier)",
                            "High-End Compute (RTX 5070 / 4080S Tier)"
                          ]}
                          selected={gpuTier}
                          onChange={setGpuTier}
                        />

                        <OptionPills 
                          label="Processing Core (CPU)"
                          options={[
                            "Ultimate Gaming (Ryzen X3D Class)",
                            "Ultimate Creator (Core i9 14900KS Class)",
                            "Balanced High-End (Ryzen 9 / Core i7)"
                          ]}
                          selected={cpuTier}
                          onChange={setCpuTier}
                        />

                        <OptionPills 
                          label="Memory Matrix"
                          options={[
                            "32GB Titanium",
                            "64GB Titanium",
                            "96GB Titanium"
                          ]}
                          selected={memoryTier}
                          onChange={setMemoryTier}
                        />

                        <OptionPills 
                          label="Storage Matrix"
                          options={[
                            "4TB NVMe Gen4/5",
                            "8TB Dual NVMe Matrix"
                          ]}
                          selected={storageTier}
                          onChange={setStorageTier}
                        />
                      </div>

                      <div className="flex flex-col gap-6 mt-4 pt-8 border-t border-[#111111]/10 dark:border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className={`flex flex-col gap-3 transition-transform ${errors.name ? 'animate-shake' : ''}`}>
                            <label className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${errors.name ? 'text-red-500 opacity-100' : 'opacity-40'}`}>Client Identity *</label>
                            <input 
                              type="text" 
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors({...errors, name: false});
                              }}
                              className={`bg-transparent border-b pb-3 text-sm md:text-base focus:outline-none transition-colors uppercase tracking-[0.1em] font-light placeholder:opacity-20 text-[#111111] dark:text-white ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-[#111111]/20 dark:border-white/20 focus:border-[#111111] dark:focus:border-white'}`}
                              placeholder="FULL NAME"
                            />
                          </div>

                          <div className={`flex flex-col gap-3 transition-transform ${errors.email ? 'animate-shake' : ''}`}>
                            <label className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${errors.email ? 'text-red-500 opacity-100' : 'opacity-40'}`}>Digital Address *</label>
                            <input 
                              type="email" 
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors({...errors, email: false});
                              }}
                              className={`bg-transparent border-b pb-3 text-sm md:text-base focus:outline-none transition-colors uppercase tracking-[0.1em] font-light placeholder:opacity-20 text-[#111111] dark:text-white ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-[#111111]/20 dark:border-white/20 focus:border-[#111111] dark:focus:border-white'}`}
                              placeholder="EMAIL@DOMAIN.COM"
                            />
                          </div>
                        </div>

                        <div className={`flex flex-col gap-3 custom-phone-wrapper transition-transform w-full ${errors.phone ? 'animate-shake' : ''}`}>
                          <label className={`text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium transition-colors ${errors.phone ? 'text-red-500 opacity-100' : 'opacity-40'}`}>Contact Protocol (Phone) *</label>
                          <style>{`
                            .custom-phone-wrapper .PhoneInputInput {
                              background: transparent;
                              border: none;
                              outline: none;
                              text-transform: uppercase;
                              letter-spacing: 0.1em;
                              font-weight: 300;
                              font-size: 0.875rem;
                            }
                            @media (min-width: 768px) {
                              .custom-phone-wrapper .PhoneInputInput { font-size: 1rem; }
                            }
                            .dark .custom-phone-wrapper .PhoneInputInput { color: white; }
                            .custom-phone-wrapper .PhoneInputInput { color: #111111; }
                            .custom-phone-wrapper .PhoneInputCountry { margin-right: 1rem; }
                          `}</style>
                          <PhoneInput
                            international
                            defaultCountry="AE"
                            value={phone}
                            onChange={(val) => {
                              setPhone(val?.toString() || "");
                              if (errors.phone) setErrors({...errors, phone: false});
                            }}
                            className={`border-b pb-3 transition-colors ${errors.phone ? 'border-red-500' : 'border-[#111111]/20 dark:border-white/20 focus-within:border-[#111111] dark:focus-within:border-white'}`}
                          />
                        </div>

                        <div className="flex flex-col gap-3 mt-4">
                          <label className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] opacity-40 font-medium">Any specific component requests or directives? (Optional)</label>
                          <textarea
                            rows={2}
                            value={customRequests}
                            onChange={(e) => setCustomRequests(e.target.value)}
                            className="bg-transparent border-b border-[#111111]/20 dark:border-white/20 pb-3 text-sm md:text-base focus:outline-none focus:border-[#111111] dark:focus:border-white transition-colors uppercase tracking-[0.1em] font-light placeholder:opacity-20 text-[#111111] dark:text-white resize-none"
                            placeholder="E.G., 'I REQUIRE CORSAIR DOMINATOR PLATINUM' OR 'I NEED EXTENDED STORAGE...'"
                          />
                        </div>
                      </div>

                      {submitStatus === "error" && (
                        <p className="text-red-500 text-[10px] uppercase tracking-wider mt-[-1rem]">{errorMessage}</p>
                      )}

                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 bg-[#111111] dark:bg-white text-white dark:text-[#111111] px-8 py-5 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold hover:opacity-90 transition-opacity w-full flex items-center justify-center disabled:opacity-50 blur-0 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] rounded-lg"
                      >
                        {isSubmitting ? "INITIALIZING PROTOCOL..." : "Initiate Inquiry"}
                      </button>

                      <div className="flex items-center gap-4 my-2 opacity-40">
                        <div className="flex-1 h-[1px] bg-[#111111] dark:bg-white"></div>
                        <div className="text-[9px] uppercase tracking-widest font-semibold">Or</div>
                        <div className="flex-1 h-[1px] bg-[#111111] dark:bg-white"></div>
                      </div>

                      <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border border-[#111111]/20 dark:border-white/20 text-[#111111] dark:text-white px-8 py-5 text-[10px] md:text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#111111] hover:text-white dark:hover:bg-white dark:hover:text-[#111111] transition-colors w-full flex items-center justify-center gap-3 rounded-lg"
                      >
                        <WhatsAppIcon className="w-4 h-4" />
                        Continue with WhatsApp
                      </a>
                    </motion.form>
                  )}
                 </AnimatePresence>
                </div>
             </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
