import { useExperienceStore } from '../../store/useExperienceStore';

export function EnvironmentLighting() {
  const activeFloor = useExperienceStore((state) => state.activeFloor);

  // Dynamic active floor height Y
  const floorHeightY = activeFloor * 4.0;

  return (
    <group name="EnvironmentLighting">
      {/* 1. Soft Ambient Architectural Fill Light */}
      <ambientLight intensity={0.7} color="#E2E8F0" />

      {/* 2. Main Sun Directional Light (Crisp Architectural Sunlight) */}
      <directionalLight
        position={[25, 45, 30]}
        intensity={1.25}
        color="#FFFFFF"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      >
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20, 0.5, 100]} />
      </directionalLight>

      {/* 3. Sky & Ground Hemisphere Light for Rich Spatial Depth */}
      <hemisphereLight args={['#334155', '#0F172A', 0.75]} />

      {/* 4. Subtle Cool Rim / Edge Light for Glass Facade Definition */}
      <directionalLight
        position={[-22, 38, -25]}
        intensity={0.4}
        color="#93C5FD"
      />

      {/* 5. Dynamic Active Floor Spotlight */}
      <spotLight
        position={[0, floorHeightY + 3.8, 4.0]}
        target-position={[0, floorHeightY + 0.5, 0.0]}
        color="#FFFFFF"
        intensity={1.8}
        angle={0.8}
        penumbra={0.5}
        distance={14}
      />
    </group>
  );
}
