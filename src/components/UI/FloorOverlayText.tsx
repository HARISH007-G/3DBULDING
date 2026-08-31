import { useExperienceStore, FLOOR_DATA } from '../../store/useExperienceStore';
import { Sparkles } from 'lucide-react';

export function FloorOverlayText() {
  const activeFloor = useExperienceStore((state) => state.activeFloor);
  const isHero = useExperienceStore((state) => state.isHero);
  const isFinalReveal = useExperienceStore((state) => state.isFinalReveal);

  const floorInfo = FLOOR_DATA[activeFloor];

  return (
    <div className="fixed left-6 bottom-12 z-40 max-w-sm md:max-w-md pointer-events-none transition-all duration-500">
      {/* Floor 6 Hero Homepage Overlay */}
      {isHero && (
        <div className="bg-slate-950/85 backdrop-blur-xl p-6 rounded-2xl border border-amber-500/40 shadow-2xl shadow-black/80 animate-fade-in pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEXUS CORPORATE HEADQUARTERS</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-1">
            Executive Suite
          </h1>
          <div className="text-xs font-mono text-amber-400/90 mb-3 font-semibold">
            Leadership & Global Strategy • Floor 06
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
            Bespoke C-suite office featuring polished black marble inlays, panoramic glass walls, and executive sky lounge. Scroll down to descend through all 6 floors and grand reception.
          </p>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800">
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">Capacity</div>
              <div className="text-xs font-mono font-bold text-white">25 Executives</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">View</div>
              <div className="text-xs font-mono font-bold text-amber-400">360° Skyline</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase">Status</div>
              <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live HQ
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mid-Floor Active Overlays (Floors 5 down to Ground) */}
      {!isHero && !isFinalReveal && floorInfo && (
        <div className="bg-slate-950/85 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-2xl shadow-black/80 transition-all duration-500 pointer-events-auto">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-mono font-bold tracking-widest ${floorInfo.accentColor}`}>
              FLOOR {floorInfo.numberStr} • {floorInfo.tagline}
            </span>
          </div>

          <h2 className="text-xl md:text-3xl font-extrabold text-white tracking-tight mb-1">
            {floorInfo.name}
          </h2>
          <div className="text-xs font-mono text-slate-400 mb-3">
            {floorInfo.subtitle}
          </div>

          <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
            {floorInfo.description}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800">
            {floorInfo.stats.map((stat, idx) => (
              <div key={`stat-${idx}`}>
                <div className="text-[10px] font-mono text-slate-500 uppercase">{stat.label}</div>
                <div className="text-xs font-mono font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Reveal Conclusion Overlay */}
      {isFinalReveal && (
        <div className="bg-slate-950/90 backdrop-blur-xl p-6 rounded-2xl border border-amber-500/40 shadow-2xl shadow-amber-500/10 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold mb-3">
            ARCHITECTURAL REVEAL
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
            NEXUS HEADQUARTERS
          </h2>
          <p className="text-xs text-slate-300 mb-4">
            You have completed the vertical journey from Floor 6 down to the grand entrance plaza. Scroll up to reverse the walkthrough.
          </p>
        </div>
      )}
    </div>
  );
}
