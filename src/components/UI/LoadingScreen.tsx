import { useState, useEffect } from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { Building2, ArrowRight } from 'lucide-react';

export function LoadingScreen() {
  const isReady = useExperienceStore((state) => state.isReady);
  const setIsReady = useExperienceStore((state) => state.setIsReady);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate initial procedural asset creation progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // Also dismiss loading screen on first scroll if progress reached 100
  useEffect(() => {
    const handleScroll = () => {
      if (progress >= 100 && !isReady) {
        setIsReady(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress, isReady, setIsReady]);

  if (isReady) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white font-sans transition-opacity duration-700 pointer-events-auto">
      {/* Background Subtle Gradient & Mesh */}
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-black pointer-events-none" />

      {/* Brand Icon & Heading */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="w-16 h-16 mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-500/10">
          <Building2 className="w-8 h-8 animate-pulse" />
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 font-mono">
          NEXUS <span className="text-amber-400">HQ</span>
        </h1>
        <p className="text-xs md:text-sm font-medium tracking-widest text-slate-400 uppercase mb-10">
          Corporate Headquarters 3D WebGL Scroll Experience
        </p>

        {/* Progress Bar & Status */}
        <div className="w-64 md:w-80 mb-8">
          <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
            <span>INITIALIZING 3D ENVIRONMENT</span>
            <span className="text-amber-400">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Enter Trigger CTA */}
        {progress >= 100 && (
          <button
            onClick={() => setIsReady(true)}
            className="group relative px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-xl shadow-amber-500/20 flex items-center gap-3 cursor-pointer"
          >
            <span>Enter Experience</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

      <div className="absolute bottom-6 text-[10px] font-mono text-slate-600">
        POWERED BY THREE.JS • GSAP • REACT THREE FIBER
      </div>
    </div>
  );
}
