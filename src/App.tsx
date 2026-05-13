/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "motion/react";
import Lenis from 'lenis';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Philosophy } from "./components/Philosophy";
import { SeriesShowcase } from "./components/SeriesShowcase";
import { Footer } from "./components/Footer";
import { Texture } from "./components/Texture";
import { BackgroundLogo } from "./components/BackgroundLogo";
import { CustomCursor } from "./components/CustomCursor";
import { Preloader } from "./components/Preloader";
import { ScrollProgress } from "./components/ScrollProgress";
import { useTheme } from "./hooks/useTheme";

import { Craftsmanship } from "./components/Craftsmanship";

const CommissionModal = React.lazy(() => import("./components/CommissionModal").then(m => ({ default: m.CommissionModal })));

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInterest, setModalInterest] = useState("PROJECT: OBSIDIAN");
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const { theme, setForcedTheme } = useTheme();

  const handleOpenModal = (interest?: string) => {
    if (interest) setModalInterest(interest);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Cinematic buttery smooth scroll with Lenis
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      wheelMultiplier: 1,
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    (window as any).lenis = lenis;
    return () => {
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  useEffect(() => {
    if (!isPreloaderDone) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isPreloaderDone]);

  return (
    <div className="bg-[#F9F9F8] dark:bg-[#050505] min-h-screen text-[#111111] dark:text-[#F9F9F8] selection:bg-[#111111] selection:text-[#F9F9F8] dark:selection:bg-[#F9F9F8] dark:selection:text-[#050505] relative transition-colors duration-[1500ms] ease-out">
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      <ScrollProgress />
      <CustomCursor />
      
      <Texture theme={theme} />
      {isPreloaderDone && <BackgroundLogo theme={theme} />}
      <Suspense fallback={null}>
        <CommissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialInterest={modalInterest} />
      </Suspense>
      
      <Header onOpenModal={() => handleOpenModal()} theme={theme} isReady={isPreloaderDone} />

      <main>
        <Hero isReady={isPreloaderDone} />
        <Philosophy />
        <Craftsmanship />
        <SeriesShowcase onOpenModal={(interest) => handleOpenModal(interest)} setForcedTheme={setForcedTheme} />
      </main>
      <Footer />
    </div>
  );
}
