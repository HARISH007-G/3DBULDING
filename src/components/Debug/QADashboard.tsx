import { useState, useMemo } from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { generateMasterQAReport } from '../../utils/assetValidator';

export function QADashboard() {
  const debugMode = useExperienceStore((state) => state.debugMode);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const report = useMemo(() => generateMasterQAReport(), []);

  if (!debugMode) return null;

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 px-3.5 py-2 rounded-lg bg-slate-950/90 border border-emerald-500/60 text-emerald-400 text-xs font-mono font-bold shadow-xl backdrop-blur-md hover:bg-emerald-500/20 transition-all cursor-pointer pointer-events-auto flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        {isOpen ? 'CLOSE QA DASHBOARD' : `QA DASHBOARD (${report.totalPass}/${report.totalAssets} PASS)`}
      </button>

      {/* Full Modal QA Report Panel */}
      {isOpen && (
        <div className="fixed inset-x-6 bottom-20 z-50 max-w-4xl mx-auto p-5 rounded-2xl bg-slate-950/98 border border-emerald-500/40 text-slate-200 font-mono text-xs shadow-2xl backdrop-blur-xl pointer-events-auto max-h-[70vh] overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-800">
            <div>
              <h2 className="text-emerald-400 font-bold text-sm tracking-wide flex items-center gap-2">
                <span>=================================================</span>
              </h2>
              <h1 className="text-white text-base font-bold tracking-wider">3D HEADQUARTERS ASSET QA REPORT</h1>
              <p className="text-slate-400 text-[11px]">Architectural Dimension & Placement Verification Matrix</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded border border-slate-700 text-xs"
            >
              ESC ✕
            </button>
          </div>

          {/* Master Summary Cards */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <div className="text-slate-500 text-[10px] uppercase font-bold">TOTAL REGISTERED GLBS</div>
              <div className="text-2xl font-bold text-white mt-1">{report.totalAssets}</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-emerald-500/30">
              <div className="text-emerald-400 text-[10px] uppercase font-bold">DIMENSION PASS</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{report.totalPass}</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-amber-500/30">
              <div className="text-amber-400 text-[10px] uppercase font-bold">WARNINGS</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">{report.totalWarning}</div>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-rose-500/30">
              <div className="text-rose-400 text-[10px] uppercase font-bold">CRITICAL FAILS</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{report.totalFail}</div>
            </div>
          </div>

          {/* Floor-by-Floor Audit Breakdown */}
          <div className="space-y-4">
            {report.floors.map((floorReport) => (
              <div key={`floor-report-${floorReport.floor}`} className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/80">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800">
                  <span className="font-bold text-amber-300 text-xs">{floorReport.floorName}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    {floorReport.passCount} / {floorReport.results.length} PASS
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  {floorReport.results.map((res) => (
                    <div key={res.assetId} className="flex justify-between items-center bg-slate-950/60 px-3 py-1.5 rounded border border-slate-900">
                      <div className="flex items-center gap-2">
                        <span className={res.overallStatus === 'PASS' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                          {res.overallStatus === 'PASS' ? '✓' : '⚠️'}
                        </span>
                        <span className="text-white font-bold">{res.name}</span>
                        <span className="text-slate-500 text-[10px]">({res.room})</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px]">
                        <span className="text-slate-400">
                          Size: {res.measuredWidth.toFixed(2)}m × {res.measuredHeight.toFixed(2)}m × {res.measuredDepth.toFixed(2)}m
                        </span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          STATUS: {res.overallStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
