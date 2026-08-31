import { useExperienceStore } from '../../store/useExperienceStore';

export function FloorIndicator() {
  const activeFloor = useExperienceStore((state) => state.activeFloor);
  const scrollProgress = useExperienceStore((state) => state.scrollProgress);
  const setScrollProgress = useExperienceStore((state) => state.setScrollProgress);

  const floors = [
    { id: 6, label: '06', progress: 0.05 },
    { id: 5, label: '05', progress: 0.26 },
    { id: 4, label: '04', progress: 0.43 },
    { id: 3, label: '03', progress: 0.60 },
    { id: 2, label: '02', progress: 0.76 },
    { id: 1, label: '01', progress: 0.89 },
    { id: 0, label: 'G',  progress: 0.945 }
  ];

  const handleFloorClick = (targetProgress: number) => {
    setScrollProgress(targetProgress);
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      window.scrollTo({
        top: targetProgress * totalHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 pointer-events-auto">
      {/* Vertical Progress Line */}
      <div className="relative w-0.5 h-48 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bg-amber-500 rounded-full transition-all duration-150"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Floor Badges Stack */}
      <div className="flex flex-col items-center gap-2">
        {floors.map((item) => {
          const isActive = activeFloor === item.id;
          return (
            <button
              key={`indicator-${item.id}`}
              onClick={() => handleFloorClick(item.progress)}
              className={`relative w-7 h-7 rounded-full flex items-center justify-center font-mono text-[11px] font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-slate-950 scale-110 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400/50'
                  : 'bg-slate-900/80 text-slate-500 border border-slate-800 hover:text-white hover:border-amber-500/40'
              }`}
              title={`Jump to Floor ${item.label}`}
              aria-label={`Jump to Floor ${item.label}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
