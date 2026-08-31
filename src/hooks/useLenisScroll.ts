import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useExperienceStore } from '../store/useExperienceStore';

gsap.registerPlugin(ScrollTrigger);

/**
 * CANONICAL LENIS + GSAP SCROLLTRIGGER MASTER ENGINE
 * 
 * Pipeline:
 * Mouse Wheel / Trackpad
 *   ↓
 * Lenis (Smooth Momentum Physics)
 *   ↓
 * gsap.ticker.add (Synchronized RAF)
 *   ↓
 * ScrollTrigger.update
 *   ↓
 * ScrollTrigger.create onUpdate(self.progress)
 *   ↓
 * useExperienceStore.getState().setScrollProgress(progress)
 *   ↓
 * CameraController (Smooth Cubic Spline Interpolation)
 *   ↓
 * Floor 06 → 05 → 04 → 03 → 02 → 01 → 00 → Final Reveal
 */
export function useLenisScroll() {
  useEffect(() => {
    // 1. Initialize Single Authoritative Lenis Smooth Scroll Instance (snappy, responsive 0.5s duration)
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5
    });

    // 2. Synchronize Lenis Scroll with GSAP ScrollTrigger & Experience Store directly
    lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      if (typeof e.progress === 'number' && isFinite(e.progress)) {
        useExperienceStore.getState().setScrollProgress(e.progress);
      }
    });

    // 3. Drive Lenis via GSAP's Internal High-Precision RAF Ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // 4. Master ScrollTrigger tied to the 7000px Virtual Scroll Track
    const trigger = ScrollTrigger.create({
      trigger: '#experience-track',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        useExperienceStore.getState().setScrollProgress(self.progress);
      }
    });

    // Refresh ScrollTrigger to compute exact DOM track height
    ScrollTrigger.refresh();

    // 5. Cleanup on unmount
    return () => {
      trigger.kill();
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
    };
  }, []);
}
