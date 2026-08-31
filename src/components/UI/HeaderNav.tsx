import { useExperienceStore } from '../../store/useExperienceStore';
import { Volume2, VolumeX, Eye, EyeOff, Wrench } from 'lucide-react';

export function HeaderNav() {
  const audioEnabled = useExperienceStore((state) => state.audioEnabled);
  const toggleAudio = useExperienceStore((state) => state.toggleAudio);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const toggleReducedMotion = useExperienceStore((state) => state.toggleReducedMotion);
  const debugMode = useExperienceStore((state) => state.debugMode);
  const toggleDebugMode = useExperienceStore((state) => state.toggleDebugMode);
  const fps = useExperienceStore((state) => state.fps);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-5 flex items-center justify-between pointer-events-none">
      {/* Brand Identification */}
      <div className="pointer-events-auto flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-slate-900/80 border border-amber-500/40 backdrop-blur-md flex items-center justify-center text-amber-400 font-extrabold text-sm font-mono shadow-lg shadow-black/40">
          NX
        </div>
        <div>
          <div className="text-white font-extrabold text-sm tracking-wider font-mono uppercase">
            NEXUS <span className="text-amber-400">HQ</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
            GLOBAL HEADQUARTERS
          </div>
        </div>
      </div>

      {/* Utility Controls */}
      <div className="pointer-events-auto flex items-center gap-3">
        {/* Performance Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 backdrop-blur-md text-[11px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{fps} FPS</span>
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleAudio}
          className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 backdrop-blur-md transition-all cursor-pointer"
          title={audioEnabled ? 'Mute Audio' : 'Enable Audio'}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Reduced Motion Toggle */}
        <button
          onClick={toggleReducedMotion}
          className={`p-2.5 rounded-lg bg-slate-900/80 border backdrop-blur-md transition-all cursor-pointer ${
            reducedMotion ? 'border-amber-500 text-amber-400' : 'border-slate-800 text-slate-300 hover:text-amber-400'
          }`}
          title={reducedMotion ? 'Disable Reduced Motion' : 'Enable Reduced Motion'}
        >
          {reducedMotion ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>

        {/* Camera Debug Toggle */}
        <button
          onClick={toggleDebugMode}
          className={`p-2.5 rounded-lg bg-slate-900/80 border backdrop-blur-md transition-all cursor-pointer ${
            debugMode ? 'border-amber-500 text-amber-400' : 'border-slate-800 text-slate-300 hover:text-amber-400'
          }`}
          title="Toggle Camera Debug Overlay"
        >
          <Wrench className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
