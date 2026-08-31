import { useEffect, useRef } from 'react';
import { useExperienceStore } from '../store/useExperienceStore';
import type { PostProcessingTier } from '../store/useExperienceStore';

export function usePerformanceMonitor() {
  const setPerformanceMetrics = useExperienceStore((state) => state.setPerformanceMetrics);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animId: number;

    const tick = () => {
      frameCount.current++;
      const now = performance.now();
      const delta = now - lastTime.current;

      if (delta >= 1000) {
        const fps = Math.round((frameCount.current * 1000) / delta);
        frameCount.current = 0;
        lastTime.current = now;

        // Dynamic Post-Processing Tiering
        let tier: PostProcessingTier = 'high';
        if (fps < 35) {
          tier = 'low';
        } else if (fps < 50) {
          tier = 'medium';
        }

        setPerformanceMetrics(fps, tier);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [setPerformanceMetrics]);
}
