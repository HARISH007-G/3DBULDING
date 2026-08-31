import { useExperienceStore } from '../../store/useExperienceStore';

export function ScrollHint() {
  const isFinalReveal = useExperienceStore((state) => state.isFinalReveal);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono tracking-widest uppercase backdrop-blur-md shadow-lg shadow-black/50">
        <span>{isFinalReveal ? 'SCROLL UP TO REVISIT ↑' : 'SCROLL TO EXPLORE ↓'}</span>
      </div>
    </div>
  );
}
