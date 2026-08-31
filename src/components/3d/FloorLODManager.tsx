import { useExperienceStore } from '../../store/useExperienceStore';
import { Floor6Executive } from './Floor6Executive';
import { Floor5Technology } from './Floor5Technology';
import { Floor4Creative } from './Floor4Creative';
import { Floor3Meeting } from './Floor3Meeting';
import { Floor2Workspace } from './Floor2Workspace';
import { Floor1Wellness } from './Floor1Wellness';
import { GroundReception } from './GroundReception';
import { GLBAssetManager } from './GLBFurnitureLoader';

export function FloorLODManager() {
  const activeFloor = useExperienceStore((state) => state.activeFloor);
  const isFinalReveal = useExperienceStore((state) => state.isFinalReveal);

  return (
    <group name="FloorLODManager">
      {/* 1. Procedural Architectural Floors with Gated Active Spotlight Shadows */}
      <Floor6Executive isActive={!isFinalReveal && activeFloor === 6} />
      <Floor5Technology isActive={!isFinalReveal && activeFloor === 5} />
      <Floor4Creative isActive={!isFinalReveal && activeFloor === 4} />
      <Floor3Meeting isActive={!isFinalReveal && activeFloor === 3} />
      <Floor2Workspace isActive={!isFinalReveal && activeFloor === 2} />
      <Floor1Wellness isActive={!isFinalReveal && activeFloor === 1} />
      <GroundReception isActive={!isFinalReveal && activeFloor === 0} />

      {/* 2. Centralized Real GLB Model Integration Layer */}
      <GLBAssetManager />
    </group>
  );
}
