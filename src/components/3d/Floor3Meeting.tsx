import { CHROME_MATERIAL, TEXTURES, ROUGHNESS_MAPS } from '../../utils/materials';

export function Floor3Meeting({ isActive = true }: { isActive?: boolean }) {
  const y = 12.0; // Floor 3 height Y = 12m

  return (
    <group name="Floor3Meeting" position={[0, y, 0]}>
      {/* 1. Acoustic Boardroom Carpet Floor */}
      <mesh position={[0, 0.185, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18.0, 11.0]} />
        <meshStandardMaterial map={TEXTURES.floorCarpet} roughnessMap={ROUGHNESS_MAPS.floorCarpet} roughness={0.7} metalness={0.05} />
      </mesh>

      {/* 2. Boardroom Wall with PBR White Plaster */}
      <mesh position={[0, 1.9, -5.2]}>
        <boxGeometry args={[17.8, 3.4, 0.12]} />
        <meshStandardMaterial map={TEXTURES.wallWhitePlaster} roughnessMap={ROUGHNESS_MAPS.wallWhitePlaster} roughness={0.7} />
      </mesh>

      {/* 3. Glass Boardroom Presentation Screen Frame */}
      <group position={[0.0, 0.2, -4.6]}>
        {/* Wall Video Screen Display */}
        <mesh position={[0, 1.8, 0]} material={CHROME_MATERIAL}>
          <boxGeometry args={[4.2, 2.0, 0.08]} />
        </mesh>
        <mesh position={[0, 1.8, 0.05]}>
          <planeGeometry args={[4.0, 1.8]} />
          <meshStandardMaterial map={TEXTURES.chartScreen} emissive="#00F0FF" emissiveIntensity={1.5} roughness={0.2} />
        </mesh>
      </group>

      {/* 4. Floor Spotlight Rigs */}
      <spotLight position={[0.0, 3.6, 0.5]} target-position={[0.0, 0.2, 0.5]} color="#F8FAFC" intensity={2.5} angle={0.7} penumbra={0.4} castShadow={isActive} />
      <pointLight position={[0.0, 3.0, 0.0]} color="#BAE6FD" intensity={1.5} distance={8} />
    </group>
  );
}
