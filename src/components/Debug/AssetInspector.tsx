import { useState, useMemo } from 'react';
import { useExperienceStore } from '../../store/useExperienceStore';
import { ASSET_REGISTRY } from '../../utils/assetRegistry';
import { validateAsset } from '../../utils/assetValidator';

export function AssetInspector() {
  const debugMode = useExperienceStore((state) => state.debugMode);
  const [selectedAssetId, setSelectedAssetId] = useState<string>('f6_exec_desk');

  const assetList = useMemo(() => Object.values(ASSET_REGISTRY), []);
  const selectedEntry = ASSET_REGISTRY[selectedAssetId] || assetList[0];

  const validation = useMemo(() => {
    if (!selectedEntry) return null;
    return validateAsset(selectedEntry);
  }, [selectedEntry]);

  if (!debugMode || !selectedEntry || !validation) return null;

  return (
    <div className="fixed top-20 left-6 z-50 w-96 p-4 rounded-xl bg-slate-950/95 border border-cyan-500/50 text-slate-200 font-mono text-xs shadow-2xl backdrop-blur-md pointer-events-auto">
      {/* Inspector Header */}
      <div className="flex justify-between items-center pb-2 mb-3 border-b border-cyan-500/30 font-bold text-cyan-400">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          3D ASSET INSPECTOR
        </span>
        <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">DEV MODE</span>
      </div>

      {/* Asset Selection Dropdown */}
      <div className="mb-3">
        <label className="text-[10px] text-slate-400 block mb-1 font-bold">SELECT ACTIVE GLB ASSET:</label>
        <select
          value={selectedAssetId}
          onChange={(e) => setSelectedAssetId(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 text-cyan-300 px-2.5 py-1.5 rounded text-xs focus:outline-none focus:border-cyan-500 cursor-pointer"
        >
          {assetList.map((asset) => (
            <option key={asset.id} value={asset.id}>
              [{asset.floor === 0 ? 'F0' : `F${asset.floor}`}] {asset.name} ({asset.room})
            </option>
          ))}
        </select>
      </div>

      {/* Asset Details Grid */}
      <div className="space-y-1.5 text-[11px] mb-3 bg-slate-900/60 p-2.5 rounded border border-slate-800">
        <div className="flex justify-between">
          <span className="text-slate-500">ASSET ID:</span>
          <span className="text-white font-bold">{selectedEntry.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">FILE PATH:</span>
          <span className="text-slate-300 text-[10px]">{selectedEntry.file}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">LOCATION:</span>
          <span className="text-amber-400 font-bold">Floor {selectedEntry.floor} — {selectedEntry.room}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">CATEGORY / ANCHOR:</span>
          <span className="text-cyan-400 font-bold">{selectedEntry.category} ({selectedEntry.placementType.toUpperCase()})</span>
        </div>
      </div>

      {/* Real-World Bounding Box Measurement */}
      <div className="mb-3 bg-slate-900/80 p-2.5 rounded border border-slate-800">
        <div className="text-[10px] text-slate-400 font-bold mb-1.5 flex justify-between">
          <span>MEASURED REAL-WORLD BOUNDS (3D BOX):</span>
          <span className={validation.scaleStatus === 'PASS' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
            [{validation.scaleStatus}]
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
          <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
            <span className="text-slate-500 text-[9px] block">WIDTH (X)</span>
            <span className="text-white font-bold">{validation.measuredWidth.toFixed(2)}m</span>
          </div>
          <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
            <span className="text-slate-500 text-[9px] block">HEIGHT (Y)</span>
            <span className="text-emerald-400 font-bold">{validation.measuredHeight.toFixed(2)}m</span>
          </div>
          <div className="bg-slate-950 p-1.5 rounded border border-slate-800">
            <span className="text-slate-500 text-[9px] block">DEPTH (Z)</span>
            <span className="text-white font-bold">{validation.measuredDepth.toFixed(2)}m</span>
          </div>
        </div>
        <div className="text-[9px] text-slate-500 mt-1.5">
          Expected Target Range: Height [{selectedEntry.targetDimensions.height[0]}m - {selectedEntry.targetDimensions.height[1]}m]
        </div>
      </div>

      {/* Validation Badges */}
      <div className="mb-3 space-y-1 text-[10px]">
        <div className="flex justify-between items-center bg-slate-900/40 px-2 py-1 rounded">
          <span className="text-slate-400">SURFACE ALIGNMENT:</span>
          <span className={validation.surfaceStatus === 'PASS' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            ✓ {validation.surfaceStatus} (Y = {selectedEntry.position[1].toFixed(3)}m)
          </span>
        </div>
        <div className="flex justify-between items-center bg-slate-900/40 px-2 py-1 rounded">
          <span className="text-slate-400">ROOM BOUNDS:</span>
          <span className={validation.roomBoundsStatus === 'PASS' ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
            ✓ {validation.roomBoundsStatus}
          </span>
        </div>
        <div className="flex justify-between items-center bg-slate-900/40 px-2 py-1 rounded">
          <span className="text-slate-400">CAMERA PATH CLEARANCE:</span>
          <span className={validation.cameraClearanceStatus === 'PASS' ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
            ✓ {validation.cameraClearanceStatus}
          </span>
        </div>
      </div>

      {/* Position Coordinates Display */}
      <div className="pt-2 border-t border-slate-800">
        <div className="text-[10px] text-slate-400 font-bold mb-1.5">TRANSFORM POSITION [X, Y, Z]:</div>
        <div className="grid grid-cols-3 gap-1.5 text-[10px] text-center font-bold">
          <div className="bg-slate-900 p-1.5 rounded text-cyan-300">X: {selectedEntry.position[0].toFixed(2)}m</div>
          <div className="bg-slate-900 p-1.5 rounded text-emerald-300">Y: {selectedEntry.position[1].toFixed(2)}m</div>
          <div className="bg-slate-900 p-1.5 rounded text-amber-300">Z: {selectedEntry.position[2].toFixed(2)}m</div>
        </div>
      </div>
    </div>
  );
}
