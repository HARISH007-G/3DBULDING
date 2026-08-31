import { useExperienceStore } from '../../store/useExperienceStore';
import { getCameraStateAtProgress } from '../Camera/waypoints';

export function CameraDebug() {
  const debugMode = useExperienceStore((state) => state.debugMode);
  const scrollProgress = useExperienceStore((state) => state.scrollProgress);
  const activeFloor = useExperienceStore((state) => state.activeFloor);
  const fps = useExperienceStore((state) => state.fps);
  const tier = useExperienceStore((state) => state.tier);

  // Enable debug overlay by default in dev or when debugMode is toggled
  const { position, target, fov } = getCameraStateAtProgress(scrollProgress);

  const testFloors = [
    { label: 'FLOOR 6', progress: 0.00 },
    { label: 'FLOOR 5', progress: 0.23 },
    { label: 'FLOOR 4', progress: 0.43 },
    { label: 'FLOOR 3', progress: 0.63 },
    { label: 'FLOOR 2', progress: 0.79 },
    { label: 'FLOOR 1', progress: 0.89 },
    { label: 'GROUND',  progress: 0.95 },
    { label: 'REVEAL',  progress: 1.00 }
  ];

  const jumpToProgress = (p: number) => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: p * totalScroll,
      behavior: 'smooth'
    });
  };

  if (!debugMode) return null;

  return (
    <div className="fixed top-20 right-6 z-50 w-80 p-4 rounded-xl bg-slate-950/95 border border-amber-500/50 text-slate-200 font-mono text-xs shadow-2xl backdrop-blur-md pointer-events-auto">
      <div className="flex justify-between items-center pb-2 mb-3 border-b border-amber-500/30 font-bold text-amber-400">
        <span>SCROLL & CAMERA DEBUG</span>
        <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300">LIVE</span>
      </div>

      <div className="space-y-1.5 text-[11px] mb-3">
        <div className="flex justify-between">
          <span className="text-slate-500">SCROLL PROGRESS:</span>
          <span className="text-amber-400 font-bold">{(scrollProgress * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">ACTIVE FLOOR:</span>
          <span className="text-emerald-400 font-bold">Floor {activeFloor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">PERFORMANCE:</span>
          <span className="text-cyan-400 font-bold">{fps} FPS ({tier.toUpperCase()})</span>
        </div>
        <div className="pt-2 border-t border-slate-800">
          <div className="text-slate-500 mb-1">CAMERA POSITION (X, Y, Z):</div>
          <div className="text-white bg-slate-900 px-2 py-1 rounded">
            [{position.x.toFixed(2)}, {position.y.toFixed(2)}, {position.z.toFixed(2)}]
          </div>
        </div>
        <div className="pt-1">
          <div className="text-slate-500 mb-1">LOOK-AT TARGET (X, Y, Z):</div>
          <div className="text-white bg-slate-900 px-2 py-1 rounded">
            [{target.x.toFixed(2)}, {target.y.toFixed(2)}, {target.z.toFixed(2)}]
          </div>
        </div>
        <div className="flex justify-between pt-1">
          <span className="text-slate-500">DYNAMIC FOV:</span>
          <span className="text-white">{fov.toFixed(1)}°</span>
        </div>
      </div>

      {/* Test Buttons Panel */}
      <div className="pt-2 border-t border-slate-800">
        <div className="text-[10px] text-slate-400 font-bold mb-2">QUICK TEST FLOOR JUMP:</div>
        <div className="grid grid-cols-2 gap-1.5">
          {testFloors.map((tf) => (
            <button
              key={tf.label}
              onClick={() => jumpToProgress(tf.progress)}
              className="px-2 py-1 bg-slate-900 hover:bg-amber-500/20 border border-slate-800 hover:border-amber-500/40 text-amber-300 rounded text-[10px] transition-all cursor-pointer text-left"
            >
              [ TEST {tf.label} ]
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
