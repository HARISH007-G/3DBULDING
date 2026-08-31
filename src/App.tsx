import { useEffect } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useLenisScroll } from './hooks/useLenisScroll';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';
import { useExperienceStore } from './store/useExperienceStore';
import { CameraController } from './components/Camera/CameraController';
import { BuildingShell } from './components/3d/BuildingShell';
import { FloorSlabs } from './components/3d/FloorSlabs';
import { CentralElevator } from './components/3d/CentralElevator';
import { CorridorsAndDoors } from './components/3d/CorridorsAndDoors';
import { FloorLODManager } from './components/3d/FloorLODManager';
import { EnvironmentLighting } from './components/Effects/EnvironmentLighting';
import { PostProcessing } from './components/Effects/PostProcessing';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { HeaderNav } from './components/UI/HeaderNav';
import { FloorIndicator } from './components/UI/FloorIndicator';
import { FloorOverlayText } from './components/UI/FloorOverlayText';
import { ScrollHint } from './components/UI/ScrollHint';
import { CameraDebug } from './components/Debug/CameraDebug';
import { AssetInspector } from './components/Debug/AssetInspector';
import { QADashboard } from './components/Debug/QADashboard';

export default function App() {
  // Initialize Lenis Smooth Scroll & GSAP ScrollTrigger timeline
  useLenisScroll();

  // Monitor frame rate & automatically scale performance tier
  usePerformanceMonitor();

  // Keyboard navigation & accessibility detection
  useEffect(() => {
    // 1. Accessibility: Detect prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches && !useExperienceStore.getState().reducedMotion) {
      useExperienceStore.getState().toggleReducedMotion();
    }
    const handleMotionChange = (e: MediaQueryListEvent) => {
      const isReduced = useExperienceStore.getState().reducedMotion;
      if (e.matches !== isReduced) {
        useExperienceStore.getState().toggleReducedMotion();
      }
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // 2. Keyboard Navigation: ArrowDown/ArrowUp moves smoothly between floors
    const floorProgresses = [0.05, 0.26, 0.43, 0.60, 0.76, 0.89, 0.945, 1.0];
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const currentProgress = useExperienceStore.getState().scrollProgress;
        const next = floorProgresses.find((p) => p > currentProgress + 0.02) ?? 1.0;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: next * totalHeight, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const currentProgress = useExperienceStore.getState().scrollProgress;
        const prev = [...floorProgresses].reverse().find((p) => p < currentProgress - 0.02) ?? 0.0;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: prev * totalHeight, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-slate-950 text-white selection:bg-amber-500 selection:text-black">
      {/* 1. Full-Screen Fixed 3D Canvas (pointer-events-none guarantees mouse wheel scroll passes through) */}
      <div className="fixed inset-0 z-0 w-screen h-screen overflow-hidden pointer-events-none">
        <Canvas
          style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0, 25.5, 4.5], fov: 42, near: 0.1, far: 300 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05
          }}
        >
          {/* Rich Dark Studio Background */}
          <color attach="background" args={["#0a0e1a"]} />

          {/* R3F Camera Spline Controller */}
          <CameraController />

          {/* Environmental Studio Lighting */}
          <EnvironmentLighting />

          {/* Architectural 3D Headquarters Structure */}
          <group name="HeadquartersScene">
            <BuildingShell />
            <FloorSlabs />
            <CentralElevator />
            <CorridorsAndDoors />
            <FloorLODManager />
          </group>

          {/* Post-Processing Stack */}
          <PostProcessing />
        </Canvas>
      </div>

      {/* 2. UI Overlay Components (Z-index 40) */}
      <LoadingScreen />
      <HeaderNav />
      <FloorIndicator />
      <FloorOverlayText />
      <ScrollHint />
      <CameraDebug />
      <AssetInspector />
      <QADashboard />

      {/* 3. Virtual Scroll Track (Provides 7000px scrollable height for Lenis & ScrollTrigger) */}
      <div id="experience-track" className="relative w-full pointer-events-none" style={{ height: '7000px' }} />
    </div>
  );
}
